import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.29.5/full/pyodide.mjs";

let pyodidePromise = null;
let pyodide = null;
const LAB_DIR = "/home/pyodide/lab";

async function ensurePyodide(notify = true) {
  if (!pyodidePromise) {
    if (notify) self.postMessage({ type: "status", status: "loading" });
    pyodidePromise = loadPyodide();
  }
  pyodide = await pyodidePromise;
  try { pyodide.FS.mkdirTree(LAB_DIR); } catch (_) {}
  if (notify) self.postMessage({ type: "status", status: "ready" });
  return pyodide;
}

function safeName(name) {
  return String(name || "")
    .replace(/\\/g, "/")
    .split("/")
    .pop()
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 120);
}

function clearLabFiles() {
  try {
    const names = pyodide.FS.readdir(LAB_DIR);
    for (const name of names) {
      if (name === "." || name === "..") continue;
      try { pyodide.FS.unlink(`${LAB_DIR}/${name}`); } catch (_) {}
    }
  } catch (_) {}
}

function restoreFiles(files = {}) {
  clearLabFiles();
  for (const [rawName, content] of Object.entries(files || {})) {
    const name = safeName(rawName);
    if (!name) continue;
    pyodide.FS.writeFile(`${LAB_DIR}/${name}`, String(content ?? ""), { encoding: "utf8" });
  }
}

function collectFiles() {
  const result = {};
  const names = pyodide.FS.readdir(LAB_DIR);
  for (const name of names) {
    if (name === "." || name === "..") continue;
    if (!/\.(csv|txt)$/i.test(name)) continue;
    try {
      const content = pyodide.FS.readFile(`${LAB_DIR}/${name}`, { encoding: "utf8" });
      if (content.length <= 150000) result[name] = content;
    } catch (_) {}
  }
  return result;
}

self.onmessage = async (event) => {
  const data = event.data || {};
  if (data.type === "init") {
    try {
      await ensurePyodide(true);
    } catch (error) {
      self.postMessage({ type: "status", status: "error", error: error?.message || String(error) });
    }
    return;
  }

  if (data.type !== "run") return;

  const id = data.id;
  try {
    await ensurePyodide(false);
    restoreFiles(data.files || {});
    pyodide.FS.chdir(LAB_DIR);

    pyodide.globals.set("__site_student_code", String(data.code || ""));
    pyodide.globals.set("__site_stdin_text", String(data.stdin || ""));

    await pyodide.runPythonAsync(`
import builtins, contextlib, io, os, traceback

__site_out = io.StringIO()
__site_lines = iter(__site_stdin_text.splitlines())
__site_original_input = builtins.input

def __site_input(prompt=""):
    print(prompt, end="")
    try:
        value = next(__site_lines)
    except StopIteration:
        raise EOFError(
            "Faltou uma entrada. Adicione outra linha em 'Entradas do programa' e execute novamente."
        )
    print(value)
    return value

__site_globals = {"__name__": "__main__"}
__site_success = True

with contextlib.redirect_stdout(__site_out), contextlib.redirect_stderr(__site_out):
    builtins.input = __site_input
    try:
        exec(compile(__site_student_code, "<codigo-do-estudante>", "exec"), __site_globals, __site_globals)
    except SystemExit as exc:
        if exc.code not in (None, 0):
            __site_success = False
        print(f"Programa encerrado: {exc}")
    except BaseException:
        __site_success = False
        traceback.print_exc()
    finally:
        builtins.input = __site_original_input

__site_output = __site_out.getvalue()
`);

    const outputProxy = pyodide.globals.get("__site_output");
    const output = String(outputProxy ?? "");
    if (outputProxy?.destroy) outputProxy.destroy();

    const success = pyodide.globals.get("__site_success") === true;
    const files = collectFiles();
    self.postMessage({ type: "result", id, output, files, success });
  } catch (error) {
    self.postMessage({ type: "result", id, output: `Erro do ambiente Python:\n${error?.message || String(error)}`, files: {}, success: false });
  }
};
