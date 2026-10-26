const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const STORAGE_KEY = "llp_s24_s26_state_v1";
const THEME_KEY = "llp_theme";

const safeStorage = {
  get(key) { try { return localStorage.getItem(key); } catch (_) { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); return true; } catch (_) { return false; } },
  remove(key) { try { localStorage.removeItem(key); return true; } catch (_) { return false; } }
};

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

const starterCodes = {
  s24: `# Exemplo didático adaptado: quiz de ciências com 5 perguntas
perguntas = [
    "Qual planeta é conhecido como planeta vermelho?",
    "Qual é o maior planeta do Sistema Solar?",
    "Quantas câmaras possui o coração humano?",
    "Qual gás as plantas absorvem principalmente na fotossíntese?",
    "Qual é a fórmula química da água?"
]

respostas = [
    "marte",
    "júpiter",
    "4",
    "dióxido de carbono",
    "h2o"
]

pontos = 0

for i in range(5):
    resposta = input(perguntas[i] + " ")

    if resposta.strip().lower() == respostas[i].lower():
        print("Correto!")
        pontos += 1
    else:
        print("Errado!")

print("Pontuação final:", pontos)

if pontos == 5:
    print("Perfeito! Você é um expert em ciências!")
elif pontos >= 3:
    print("Bom trabalho! Você mandou bem.")
elif pontos >= 1:
    print("Foi por pouco! Continue tentando.")
else:
    print("Que tal estudar mais um pouco?")
`,
  s25: `import csv
import os

produtos = [
    ["Caderno", 20.0],
    ["Caneta", 3.5],
    ["Lápis", 2.0]
]

def buscar_produto(produtos, nome):
    for produto in produtos:
        if produto[0].lower() == nome.lower():
            return produto
    return None

def salvar_vendas(vendas):
    with open("vendas.csv", "w", newline="", encoding="utf-8") as arquivo:
        escritor = csv.writer(arquivo)
        escritor.writerow(["produto", "quantidade", "data"])
        escritor.writerows(vendas)

def carregar_vendas():
    if not os.path.exists("vendas.csv"):
        return []

    vendas = []
    with open("vendas.csv", "r", encoding="utf-8") as arquivo:
        leitor = csv.reader(arquivo)
        next(leitor, None)
        for linha in leitor:
            if linha:
                vendas.append([linha[0], int(linha[1]), linha[2]])
    return vendas

def registrar_venda(produtos, vendas):
    nome = input("Produto: ")
    produto = buscar_produto(produtos, nome)

    if produto is None:
        print("Produto não encontrado.")
        return

    try:
        quantidade = int(input("Quantidade: "))
    except ValueError:
        print("Quantidade inválida.")
        return

    if quantidade <= 0:
        print("A quantidade precisa ser positiva.")
        return

    data = input("Data: ")
    vendas.append([produto[0], quantidade, data])
    salvar_vendas(vendas)
    print("Venda registrada.")

def cancelar_venda(vendas):
    if not vendas:
        print("Não há vendas para cancelar.")
        return

    for i, venda in enumerate(vendas, start=1):
        print(i, "-", venda)

    try:
        indice = int(input("Número da venda para cancelar: ")) - 1
    except ValueError:
        print("Escolha inválida.")
        return

    if indice < 0 or indice >= len(vendas):
        print("Registro inexistente.")
        return

    removida = vendas.pop(indice)
    salvar_vendas(vendas)
    print("Venda cancelada:", removida)

def listar_vendas(vendas):
    if not vendas:
        print("Nenhuma venda registrada.")
        return

    for i, venda in enumerate(vendas, start=1):
        print(i, "-", venda)

vendas = carregar_vendas()

while True:
    print("\\n1 - Registrar venda")
    print("2 - Listar vendas")
    print("3 - Cancelar venda")
    print("0 - Sair")

    opcao = input("Escolha: ")

    if opcao == "1":
        registrar_venda(produtos, vendas)
    elif opcao == "2":
        listar_vendas(vendas)
    elif opcao == "3":
        cancelar_venda(vendas)
    elif opcao == "0":
        print("Encerrando.")
        break
    else:
        print("Opção inválida.")
`,
  s26: `produtos = [
    ["Caderno", 20.0],
    ["Caneta", 3.5],
    ["Lápis", 2.0]
]

def listar_produtos(produtos):
    # Há uma regra de formatação repetida aqui.
    for produto in produtos:
        print(produto[0] + " - R$ " + format(produto[1], ".2f"))

def consultar_produto(produtos):
    nome = input("Produto para consultar: ")

    # Há uma busca repetida aqui.
    for produto in produtos:
        if produto[0].lower() == nome.lower():
            print(produto[0] + " - R$ " + format(produto[1], ".2f"))
            return

    print("Produto não encontrado.")

def produto_existe(produtos, nome):
    # A mesma ideia de busca aparece novamente.
    for produto in produtos:
        if produto[0].lower() == nome.lower():
            return True
    return False

listar_produtos(produtos)
consultar_produto(produtos)

# DESAFIO:
# 1) crie formatar_produto(nome, preco)
# 2) crie buscar_produto(produtos, nome)
# 3) substitua as repetições pelas novas funções
# 4) execute antes/depois e confira se o comportamento esperado foi mantido
`
};

const starterInputs = {
  s24: "marte\njúpiter\n4\ndióxido de carbono\nh2o",
  s25: "1\nCaderno\n2\n2026-10-25\n2\n0",
  s26: "caderno"
};

const quizData = [
  { q:"1. Qual função recebe uma entrada digitada pelo usuário?", options:["print()","input()","range()","len()"], answer:1, hint:"Pense na etapa 'receber' do programa interativo." },
  { q:"2. Qual estrutura é mais adequada quando sabemos previamente a quantidade de repetições?", options:["for","while apenas","if","def"], answer:0, hint:"O material contrasta quantidade conhecida com condição variável." },
  { q:"3. O que será impresso?", code:"for i in range(3):\n    print(i)", options:["1 2 3","0 1 2","0 1 2 3","3"], answer:1, hint:"range(3) começa em 0 e não inclui 3." },
  { q:"4. Quando o while é especialmente útil?", options:["Quando a repetição depende de uma condição que muda","Somente para imprimir listas","Apenas para criar funções","Nunca em quizzes"], answer:0, hint:"Pense em tentativas restantes." },
  { q:"5. Em duas listas paralelas de perguntas e respostas, o que liga os itens correspondentes?", options:["O mesmo índice","O nome da variável","O print()","O arquivo CSV"], answer:0, hint:"Perguntas[0] combina com respostas[0]." },
  { q:"6. Para que serve a variável pontos em um quiz?", options:["Acumular acertos","Guardar o nome do arquivo","Encerrar o Python","Criar funções"], answer:0, hint:"Ela muda quando uma resposta é correta." },
  { q:"7. Por que uma condição específica como pontos == 5 deve vir antes de pontos >= 1?", options:["Porque 5 também satisfaz >= 1","Porque elif não funciona","Porque range exige","Porque print precisa"], answer:0, hint:"A primeira condição verdadeira encerra a cadeia." },
  { q:"8. O que significa modularizar um programa?", options:["Dividir responsabilidades entre partes/funções","Colocar tudo no menu","Apagar as listas","Usar apenas while"], answer:0, hint:"Cada função recebe uma responsabilidade." },
  { q:"9. Qual é a diferença essencial entre uma lista em memória e um CSV no contexto da Papelaria?", options:["O CSV pode persistir dados entre execuções","A lista não aceita strings","O CSV só existe enquanto o programa roda","Não existe diferença"], answer:0, hint:"Pense em fechar e abrir o programa novamente." },
  { q:"10. O que salvar_vendas(vendas) deve fazer?", options:["Gravar o estado das vendas no arquivo","Somar pontos","Criar produtos automaticamente","Ler perguntas"], answer:0, hint:"Ela cuida da persistência." },
  { q:"11. O que carregar_vendas() deve fazer?", options:["Reconstruir a lista a partir do arquivo","Apagar vendas","Criar um loop infinito","Formatar produtos"], answer:0, hint:"É usada na abertura do programa." },
  { q:"12. Antes de registrar uma venda, qual validação aparece no roteiro?", options:["Produto existe e quantidade é positiva","Preço sempre é zero","Nome precisa ter 20 letras","Arquivo deve estar vazio"], answer:0, hint:"Evite alterar a lista com dados inválidos." },
  { q:"13. O que é refatoração?", options:["Melhorar a organização interna preservando o comportamento esperado","Adicionar sempre novas funcionalidades","Trocar Python por outra linguagem","Apagar funções"], answer:0, hint:"O usuário não deveria perceber mudança funcional." },
  { q:"14. Qual deve ser a responsabilidade de buscar_produto(produtos, nome)?", options:["Localizar e devolver o produto ou None","Salvar vendas.csv","Exibir o menu inteiro","Calcular a pontuação"], answer:0, hint:"Uma função, uma responsabilidade clara." },
  { q:"15. Todo código parecido deve virar uma função?", options:["Não; só quando concentrar a lógica realmente reduz repetição e facilita manutenção","Sim, sempre","Somente print()","Somente input()"], answer:0, hint:"O roteiro alerta que semelhança visual não basta." }
];

let state = {
  fields: {},
  checks: {},
  quiz: Array(quizData.length).fill(null),
  labs: {
    s24:{code:"", stdin:"", attempted:false, output:"", files:{}},
    s25:{code:"", stdin:"", attempted:false, output:"", files:{}},
    s26:{code:"", stdin:"", attempted:false, output:"", files:{}}
  }
};

let pythonWorker = null;
let runtimeState = "idle";
let requestCounter = 0;
const pendingRuns = new Map();

function loadState() {
  const raw = safeStorage.get(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.fields) state.fields = parsed.fields;
    if (parsed?.checks) state.checks = parsed.checks;
    if (Array.isArray(parsed?.quiz) && parsed.quiz.length === quizData.length) state.quiz = parsed.quiz;
    for (const lab of ["s24","s25","s26"]) {
      if (parsed?.labs?.[lab]) state.labs[lab] = {...state.labs[lab], ...parsed.labs[lab]};
    }
  } catch (_) {}
}

function saveState() {
  safeStorage.set(STORAGE_KEY, JSON.stringify(state));
  const s = $("#saveStatus");
  if (s) s.textContent = "Respostas e códigos salvos automaticamente neste navegador.";
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

/* Tema */
function applyTheme(theme, persist=false) {
  const normalized = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = normalized;
  const dark = normalized === "dark";
  $("#themeToggle")?.setAttribute("aria-pressed", String(dark));
  $("#themeToggle")?.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
  if ($("#themeIcon")) $("#themeIcon").textContent = dark ? "☀" : "☾";
  if (persist) safeStorage.set(THEME_KEY, normalized);
}
applyTheme(document.documentElement.dataset.theme || "light");
$("#themeToggle")?.addEventListener("click",()=>applyTheme(document.documentElement.dataset.theme==="dark"?"light":"dark",true));

/* Menu */
const menuToggle=$("#menuToggle"), mainNav=$("#mainNav");
function closeMenu(){mainNav?.classList.remove("is-open");menuToggle?.setAttribute("aria-expanded","false");menuToggle?.setAttribute("aria-label","Abrir menu")}
menuToggle?.addEventListener("click",()=>{const open=mainNav?.classList.toggle("is-open");menuToggle.setAttribute("aria-expanded",String(Boolean(open)));menuToggle.setAttribute("aria-label",open?"Fechar menu":"Abrir menu")});
$$(".nav a").forEach(a=>a.addEventListener("click",closeMenu));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
document.addEventListener("click",e=>{if(mainNav?.classList.contains("is-open")&&!mainNav.contains(e.target)&&!menuToggle?.contains(e.target))closeMenu()});
let lastDesktop=innerWidth>1080;
addEventListener("resize",()=>{const d=innerWidth>1080;if(d!==lastDesktop){closeMenu();lastDesktop=d}updateReadingProgress()},{passive:true});
function updateReadingProgress(){const el=$("#readingProgress");if(!el)return;const max=document.documentElement.scrollHeight-innerHeight;el.style.width=`${max>0?Math.min(100,Math.max(0,scrollY/max*100)):0}%`}
addEventListener("scroll",updateReadingProgress,{passive:true});updateReadingProgress();

/* Worker / Pyodide */
function setRuntimeStatus(status, message="") {
  runtimeState=status;
  const box=$("#runtimeStatus");
  if(!box)return;
  box.classList.toggle("is-ready",status==="ready");
  box.classList.toggle("is-error",status==="error");
  const strong=$("strong",box);
  if(strong){
    if(status==="loading") strong.textContent="Preparando Python...";
    else if(status==="ready") strong.textContent="Python pronto ✓";
    else if(status==="error") strong.textContent=`Falha ao carregar Python${message?": "+message:""}`;
    else strong.textContent="Python ainda não carregado.";
  }
  document.querySelectorAll(".run-code").forEach(btn=>{btn.disabled=pendingRuns.size>0;btn.title=status==="error"?"Clique para tentar carregar o Python novamente.":"";});
  document.querySelectorAll(".stop-code").forEach(btn=>{btn.disabled=!Array.from(pendingRuns.values()).some(run=>run.lab===btn.dataset.lab);});
}

function createWorker() {
  if(pendingRuns.size){showToast("Interrompa o programa antes de reiniciar o Python.");return}
  if(pythonWorker) pythonWorker.terminate();
  pythonWorker = new Worker("./python-worker.mjs",{type:"module"});
  setRuntimeStatus("loading");
  pythonWorker.addEventListener("message",event=>{
    const data=event.data||{};
    if(data.type==="status"){
      setRuntimeStatus(data.status,data.error||"");
      if(data.status==="ready" && queuedLab && !pendingRuns.size){const next=queuedLab;queuedLab=null;runLab(next)}
      if(data.status==="error") queuedLab=null;
      return;
    }
    if(data.type==="result"){
      const run=pendingRuns.get(data.id);
      if(!run)return;
      pendingRuns.delete(data.id);
      finishRun(run.lab,data.output||"",data.files||{},data.success===true);
    }
  });
  pythonWorker.addEventListener("error",event=>{
    queuedLab=null;
    setRuntimeStatus("error",event.message||"Não foi possível iniciar o Python. Verifique a conexão.");
    for(const {lab} of pendingRuns.values()) setLabBusy(lab,false);
    pendingRuns.clear();
  });
  pythonWorker.postMessage({type:"init"});
}

$("#loadPython")?.addEventListener("click",createWorker);

async function ensureRuntime() {
  if(runtimeState==="ready"&&pythonWorker)return true;
  if(runtimeState!=="loading") createWorker();
  showToast("Preparando Python. O código será executado quando estiver pronto.");
  return false;
}

function setLabBusy(lab,busy){
  $(".run-code").forEach(btn=>btn.disabled=busy);
  $(`.stop-code[data-lab="${lab}"]`)?.toggleAttribute("disabled",!busy);
}

let queuedLab=null;
function runLab(lab){
  if(runtimeState!=="ready"||!pythonWorker){queuedLab=lab;ensureRuntime();return}
  if(pendingRuns.size){showToast("Já existe uma execução em andamento. Use Parar se necessário.");return}
  const code=$(`#${lab}Code`)?.value||"";
  const stdin=$(`#${lab}Input`)?.value||"";
  if(!code.trim()){showToast("Escreva algum código antes de executar.");return}
  state.labs[lab].code=code;state.labs[lab].stdin=stdin;saveState();
  const id=++requestCounter;
  pendingRuns.set(id,{lab});
  setLabBusy(lab,true);
  const output=$(`#${lab}Output`);
  if(output)output.textContent="Executando...";
  pythonWorker.postMessage({type:"run",id,code,stdin,files:state.labs[lab].files||{}});
}

function finishRun(lab,output,files,success){
  state.labs[lab].attempted=success;
  state.labs[lab].output=output;
  state.labs[lab].files=files||{};
  const out=$(`#${lab}Output`);if(out)out.textContent=output||"(sem saída)";
  const badge=$(`#${lab}LabState`);if(badge){badge.textContent=success?"Executado ✓":"Corrija o erro";badge.classList.toggle("is-done",success)}
  setLabBusy(lab,false);renderFiles(lab);saveState();updateProgress();
}

$$(".run-code").forEach(btn=>btn.addEventListener("click",()=>runLab(btn.dataset.lab)));
$$(".stop-code").forEach(btn=>btn.addEventListener("click",()=>{
  const lab=btn.dataset.lab;
  if(pythonWorker)pythonWorker.terminate();
  pythonWorker=null;pendingRuns.clear();
  setLabBusy(lab,false);
  const out=$(`#${lab}Output`);if(out)out.textContent+="\n\n[Execução interrompida pelo estudante.]";
  state.labs[lab].attempted=false;state.labs[lab].output=out?.textContent||"Execução interrompida.";
  saveState();updateProgress();showToast("Execução interrompida. O Python será recarregado na próxima execução.");
  queuedLab=null;
  setRuntimeStatus("idle");
  const badge=$(`#${lab}LabState`);if(badge){badge.textContent="Interrompido";badge.classList.remove("is-done")}
  createWorker();
}));

/* Editor */
function attachEditorKeys(editor){
  editor?.addEventListener("keydown",e=>{
    if(e.key==="Tab"){
      e.preventDefault();
      const start=editor.selectionStart,end=editor.selectionEnd;
      editor.setRangeText("    ",start,end,"end");
      editor.dispatchEvent(new Event("input",{bubbles:true}));
    }
  });
}
["s24","s25","s26"].forEach(lab=>attachEditorKeys($(`#${lab}Code`)));

$$(".reset-code").forEach(btn=>btn.addEventListener("click",()=>{
  const lab=btn.dataset.lab;
  if(!confirm("Isso substituirá o código atual desta atividade. Deseja continuar?"))return;
  const editor=$(`#${lab}Code`);if(editor)editor.value=starterCodes[lab];
  const stdin=$(`#${lab}Input`);if(stdin)stdin.value=starterInputs[lab];
  state.labs[lab]={...state.labs[lab],code:starterCodes[lab],stdin:starterInputs[lab],attempted:false,output:""};
  const out=$(`#${lab}Output`);if(out)out.textContent="Código restaurado. Execute para ver a saída.";
  const badge=$(`#${lab}LabState`);if(badge){badge.textContent="Não executado";badge.classList.remove("is-done")}
  saveState();updateProgress();
}));

$$(".clear-terminal").forEach(btn=>btn.addEventListener("click",()=>{
  const lab=btn.dataset.lab;const out=$(`#${lab}Output`);if(out)out.textContent="";
}));

async function copyText(text){
  try{await navigator.clipboard.writeText(text);return true}catch(_){}
  const area=document.createElement("textarea");area.value=text;area.style.position="fixed";area.style.opacity="0";document.body.appendChild(area);area.select();
  let ok=false;try{ok=document.execCommand("copy")}catch(_){}
  area.remove();return ok;
}
$$(".copy-code").forEach(btn=>btn.addEventListener("click",async()=>{
  const lab=btn.dataset.lab;const ok=await copyText($(`#${lab}Code`)?.value||"");showToast(ok?"Código copiado.":"Não foi possível copiar automaticamente.");
}));
function downloadText(filename,text,type="text/plain"){
  const blob=new Blob([text],{type:`${type};charset=utf-8`});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
}
$$(".download-code").forEach(btn=>btn.addEventListener("click",()=>downloadText(`atividade-${btn.dataset.lab}.py`,$(`#${btn.dataset.lab}Code`)?.value||"","text/x-python")));

/* Arquivos virtuais */
function renderFiles(lab){
  const root=$(`#${lab}Files`);if(!root)return;
  const files=state.labs[lab].files||{};const entries=Object.entries(files);
  if(!entries.length){root.innerHTML="<p>Nenhum arquivo criado.</p>";return}
  root.innerHTML=entries.map(([name,content],i)=>`
    <div class="file-row">
      <strong>📄 ${escapeHTML(name)}</strong>
      <div class="file-row__actions">
        <button type="button" data-view-file="${i}">Visualizar</button>
        <button type="button" data-download-file="${i}">Baixar</button>
      </div>
      <pre class="file-preview" id="${lab}FilePreview${i}" hidden>${escapeHTML(content)}</pre>
    </div>`).join("");
  entries.forEach(([name,content],i)=>{
    $(`[data-view-file="${i}"]`,root)?.addEventListener("click",()=>{
      const pre=$(`#${lab}FilePreview${i}`);if(pre)pre.hidden=!pre.hidden;
    });
    $(`[data-download-file="${i}"]`,root)?.addEventListener("click",()=>downloadText(name,content,"text/csv"));
  });
}
$$(".reset-files").forEach(btn=>btn.addEventListener("click",()=>{
  const lab=btn.dataset.lab;if(!confirm("Reiniciar os arquivos virtuais desta atividade?"))return;
  state.labs[lab].files={};saveState();renderFiles(lab);showToast("Arquivos da atividade reiniciados.");
}));

/* Quiz */
function renderQuiz(){
  const root=$("#quizList");if(!root)return;
  root.innerHTML=quizData.map((item,index)=>{
    const selected=state.quiz[index];
    return `<article class="quiz-question" data-q="${index}">
      <h3>${escapeHTML(item.q)}</h3>
      ${item.code?`<pre><code>${escapeHTML(item.code)}</code></pre>`:""}
      <div class="quiz-options">${item.options.map((opt,i)=>`<button type="button" class="quiz-option ${selected===i?(i===item.answer?"correct":"wrong"):""}" data-opt="${i}">${escapeHTML(opt)}</button>`).join("")}</div>
      <p class="quiz-feedback" aria-live="polite">${selected===null?"Escolha uma alternativa.":selected===item.answer?"✓ Correto.":`✗ Ainda não. ${escapeHTML(item.hint)}`}</p>
    </article>`;
  }).join("");
  $$(".quiz-question",root).forEach(card=>{
    const qi=Number(card.dataset.q);
    $$(".quiz-option",card).forEach(btn=>btn.addEventListener("click",()=>{
      const oi=Number(btn.dataset.opt);state.quiz[qi]=oi;saveState();renderQuiz();updateProgress();
    }));
  });
  updateQuizScore();
}
function quizScore(){return state.quiz.reduce((sum,sel,i)=>sum+(sel===quizData[i].answer?1:0),0)}
function updateQuizScore(){const score=quizScore();if($("#quizScore"))$("#quizScore").textContent=score;if($("#quizTotal"))$("#quizTotal").textContent=quizData.length}
$("#resetQuiz")?.addEventListener("click",()=>{if(!confirm("Reiniciar o quiz?"))return;state.quiz=Array(quizData.length).fill(null);saveState();renderQuiz();updateProgress()});

/* Campos e persistência */
function restoreUI(){
  $$("[data-answer]").forEach(el=>{if(Object.hasOwn(state.fields,el.id))el.value=state.fields[el.id]});
  const name=$("#studentName"),cls=$("#studentClass");
  if(name&&Object.hasOwn(state.fields,"studentName"))name.value=state.fields.studentName;
  if(cls&&Object.hasOwn(state.fields,"studentClass"))cls.value=state.fields.studentClass;
  $$("[data-check]").forEach(el=>el.checked=Boolean(state.checks[el.dataset.check]));
  ["s24","s25","s26"].forEach(lab=>{
    const saved=state.labs[lab];
    const editor=$(`#${lab}Code`),input=$(`#${lab}Input`),out=$(`#${lab}Output`),badge=$(`#${lab}LabState`);
    if(editor)editor.value=saved.code||starterCodes[lab];
    if(input)input.value=saved.stdin !== "" ? saved.stdin : (saved.code ? "" : starterInputs[lab]);
    if(out&&saved.output)out.textContent=saved.output;
    if(saved.attempted&&badge){badge.textContent="Executado ✓";badge.classList.add("is-done")}
    renderFiles(lab);
  });
}
function bindPersistence(){
  $$("[data-answer], #studentName, #studentClass").forEach(el=>el.addEventListener("input",()=>{state.fields[el.id]=el.value;saveState();updateProgress()}));
  $$("[data-check]").forEach(el=>el.addEventListener("change",()=>{state.checks[el.dataset.check]=el.checked;saveState();updateProgress()}));
  ["s24","s25","s26"].forEach(lab=>{
    $(`#${lab}Code`)?.addEventListener("input",e=>{state.labs[lab].code=e.target.value;saveState()});
    $(`#${lab}Input`)?.addEventListener("input",e=>{state.labs[lab].stdin=e.target.value;saveState()});
  });
}
function fieldValid(el){const min=Number(el.dataset.minLength||1);return el.value.trim().length>=min}
function weekData(prefix,lab,checkPrefix=null){
  const fields=$$("[data-answer]").filter(el=>el.id.startsWith(prefix));
  const fieldDone=fields.filter(fieldValid).length;
  const checks=checkPrefix?$$("[data-check]").filter(el=>el.dataset.check.startsWith(checkPrefix)):[];
  const checkDone=checks.filter(el=>el.checked).length;
  const labDone=state.labs[lab].attempted?1:0;
  return {fields,fieldDone,checks,checkDone,labDone,total:fields.length+checks.length+1,done:fieldDone+checkDone+labDone};
}
function validateAll(){
  const pending=[];
  const nameOk=($("#studentName")?.value||"").trim().length>=3;
  const classOk=($("#studentClass")?.value||"").trim().length>=2;
  if(!nameOk)pending.push("Preencha o nome.");
  if(!classOk)pending.push("Preencha a turma.");
  const configs=[["s24_","s24",null,"Semana 24"],["s25_","s25","s25_","Semana 25"],["s26_","s26",null,"Semana 26"]];
  const weeks={};
  for(const [prefix,lab,checkPrefix,label] of configs){
    const data=weekData(prefix,lab,checkPrefix);weeks[lab]=data;
    data.fields.forEach(el=>{const ok=fieldValid(el);el.classList.toggle("invalid",!ok&&el.value.trim().length>0);if(!ok)pending.push(`Responda: ${el.dataset.label}.`)});
    data.checks.forEach(el=>{if(!el.checked)pending.push(`${label}: marque o item "${el.parentElement.textContent.trim()}".`)});
    if(!state.labs[lab].attempted)pending.push(`${label}: execute o código pelo menos uma vez.`);
  }
  const score=quizScore();if(score<quizData.length)pending.push(`Quiz: conclua/corrija ${quizData.length-score} questão(ões).`);
  return {valid:nameOk&&classOk&&pending.length===0,pending,nameOk,classOk,weeks,score};
}
function updateProgress(){
  const v=validateAll();
  $("#progIdentity").textContent=v.nameOk&&v.classOk?"✓ Completa":"Pendente";
  $("#progS24").textContent=`${v.weeks.s24.done}/${v.weeks.s24.total}`;
  $("#progS25").textContent=`${v.weeks.s25.done}/${v.weeks.s25.total}`;
  $("#progS26").textContent=`${v.weeks.s26.done}/${v.weeks.s26.total}`;
  $("#progQuiz").textContent=`${v.score}/${quizData.length}`;
  const total=1+v.weeks.s24.total+v.weeks.s25.total+v.weeks.s26.total+quizData.length;
  const done=(v.nameOk&&v.classOk?1:0)+v.weeks.s24.done+v.weeks.s25.done+v.weeks.s26.done+v.score;
  const pct=Math.round(done/total*100);$("#progPercent").textContent=`${pct}%`;$("#progressBarFill").style.width=`${pct}%`;
  const list=$("#pendingList");if(list)list.innerHTML=v.pending.length?v.pending.map(x=>`<li>${escapeHTML(x)}</li>`).join(""):"<li>✓ Tudo concluído. O PDF está disponível.</li>";
  const btn=$("#generatePdf");if(btn){btn.disabled=!v.valid;btn.textContent=v.valid?"✓ Gerar / Salvar atividade em PDF":"🔒 Gerar / Salvar atividade em PDF"}
  updateQuizScore();return v;
}
$("#checkPending")?.addEventListener("click",()=>{const v=updateProgress();showToast(v.valid?"Tudo concluído. PDF liberado.":`Ainda há ${v.pending.length} pendência(s).`)});

/* Relatório */
const reportQuestions={
  s24:[
    ["s24_r1","1. Resultado com 5 acertos."],["s24_r2","2. Resultado com 3 acertos."],["s24_r3","3. Resultado com 0 acertos."],
    ["s24_r4","4. Efeito de colocar pontos >= 1 antes de pontos == 5."],["s24_r5","5. Por que a mensagem final fica depois do loop."]
  ],
  s25:[
    ["s25_r1","1. Por que salvar_vendas() é chamada após alteração."],["s25_r2","2. Por que carregar_vendas() é usada na abertura."],
    ["s25_r3","3. Produto inexistente."],["s25_r4","4. Lista em memória × arquivo CSV."],["s25_r5","5. Validação da quantidade."]
  ],
  s26:[
    ["s26_r1","1. Funções que precisavam localizar produto."],["s26_r2","2. Responsabilidade de formatar_produto()."],["s26_r3","3. Responsabilidade de buscar_produto()."],
    ["s26_r4","4. Terceira oportunidade de reorganização."],["s26_r5","5. Função proposta."],["s26_r6","6. O que ficou mais claro/menos repetido."],["s26_r7","7. Verificação do comportamento após refatoração."]
  ]
};
function fillReportAnswers(target,items){
  $(target).innerHTML=items.map(([id,q])=>`<article class="report-answer"><strong>${escapeHTML(q)}</strong><p>${escapeHTML(($("#"+id)?.value||"").trim())}</p></article>`).join("");
}
function buildReport(){
  const v=validateAll();if(!v.valid)return false;
  $("#reportName").textContent=$("#studentName").value.trim();$("#reportClass").textContent=$("#studentClass").value.trim();$("#reportDate").textContent=new Intl.DateTimeFormat("pt-BR").format(new Date());
  fillReportAnswers("#reportS24",reportQuestions.s24);fillReportAnswers("#reportS25",reportQuestions.s25);fillReportAnswers("#reportS26",reportQuestions.s26);
  const checklist25 = $$("[data-check]").filter(el=>el.dataset.check.startsWith("s25_")).map(el=>`<li>✓ ${escapeHTML(el.parentElement.textContent.trim())}</li>`).join("");
  $("#reportS25").insertAdjacentHTML("afterbegin", `<article class="report-answer"><strong>Checklist de testes</strong><ul>${checklist25}</ul></article>`);
  $("#reportCode24").textContent=$("#s24Code").value;$("#reportCode25").textContent=$("#s25Code").value;$("#reportCode26").textContent=$("#s26Code").value;
  $("#reportOut24").textContent=state.labs.s24.output||"(sem saída registrada)";$("#reportOut25").textContent=state.labs.s25.output||"(sem saída registrada)";$("#reportOut26").textContent=state.labs.s26.output||"(sem saída registrada)";
  $("#reportCsv25").textContent=state.labs.s25.files?.["vendas.csv"]||"(vendas.csv não disponível no último estado salvo)";
  $("#reportScore").textContent=`${quizData.length}/${quizData.length} — 100%`;
  $("#reportQuiz").innerHTML=quizData.map((item,i)=>`<article class="report-quiz-item"><strong>${escapeHTML(item.q)}</strong>${item.code?`<pre><code>${escapeHTML(item.code)}</code></pre>`:""}<p><b>Resposta do estudante:</b> ${escapeHTML(item.options[state.quiz[i]])}</p><p><b>Resposta correta:</b> ${escapeHTML(item.options[item.answer])}</p><p>✓ Correta</p></article>`).join("");
  return true;
}
$("#generatePdf")?.addEventListener("click",()=>{const v=updateProgress();if(!v.valid||!buildReport()){showToast("PDF bloqueado: verifique as pendências.");return}requestAnimationFrame(()=>window.print())});

/* Limpar */
$("#clearAnswers")?.addEventListener("click",()=>{
  if(!confirm("Apagar identificação, respostas, códigos, arquivos e quiz? O tema será preservado."))return;
  safeStorage.remove(STORAGE_KEY);
  state={fields:{},checks:{},quiz:Array(quizData.length).fill(null),labs:{s24:{code:"",stdin:"",attempted:false,output:"",files:{}},s25:{code:"",stdin:"",attempted:false,output:"",files:{}},s26:{code:"",stdin:"",attempted:false,output:"",files:{}}}};
  $$("[data-answer], #studentName, #studentClass").forEach(el=>el.value="");$$("[data-check]").forEach(el=>el.checked=false);
  ["s24","s25","s26"].forEach(lab=>{const e=$(`#${lab}Code`),i=$(`#${lab}Input`),o=$(`#${lab}Output`),b=$(`#${lab}LabState`);if(e)e.value=starterCodes[lab];if(i)i.value=starterInputs[lab];if(o)o.textContent="Execute o código para ver a saída.";if(b){b.textContent="Não executado";b.classList.remove("is-done")}renderFiles(lab)});
  renderQuiz();saveState();updateProgress();showToast("Dados da atividade apagados.");
});

/* Inicialização */
loadState();
restoreUI();
bindPersistence();
renderQuiz();
updateProgress();
setRuntimeStatus("idle");
createWorker();
