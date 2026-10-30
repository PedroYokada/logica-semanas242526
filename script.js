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
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

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
  quiz: Array(quizData.length).fill(null)
};

function loadState() {
  const raw = safeStorage.get(STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.fields && typeof parsed.fields === "object") state.fields = parsed.fields;
    if (Array.isArray(parsed?.quiz) && parsed.quiz.length === quizData.length) state.quiz = parsed.quiz;
  } catch (_) {}
}

function saveState() {
  safeStorage.set(STORAGE_KEY, JSON.stringify(state));
  const status = $("#saveStatus");
  if (status) status.textContent = "Respostas salvas automaticamente neste navegador.";
}

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function applyTheme(theme, persist = false) {
  const normalized = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = normalized;
  const dark = normalized === "dark";
  $("#themeToggle")?.setAttribute("aria-pressed", String(dark));
  $("#themeToggle")?.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
  if ($("#themeIcon")) $("#themeIcon").textContent = dark ? "☀" : "☾";
  if (persist) safeStorage.set(THEME_KEY, normalized);
}
applyTheme(document.documentElement.dataset.theme || "light");
$("#themeToggle")?.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark", true);
});

const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");

function closeMenu() {
  mainNav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menu");
}
menuToggle?.addEventListener("click", () => {
  const open = mainNav?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(open)));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
$$(".nav a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
document.addEventListener("click", event => {
  if (mainNav?.classList.contains("is-open") && !mainNav.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
});

let lastDesktop = innerWidth > 1080;
addEventListener("resize", () => {
  const desktopNow = innerWidth > 1080;
  if (desktopNow !== lastDesktop) {
    closeMenu();
    lastDesktop = desktopNow;
  }
  updateReadingProgress();
}, { passive: true });

function updateReadingProgress() {
  const el = $("#readingProgress");
  if (!el) return;
  const max = document.documentElement.scrollHeight - innerHeight;
  el.style.width = `${max > 0 ? Math.min(100, Math.max(0, scrollY / max * 100)) : 0}%`;
}
addEventListener("scroll", updateReadingProgress, { passive: true });
updateReadingProgress();

function quizScore() {
  return state.quiz.reduce((sum, selected, index) => sum + (selected === quizData[index].answer ? 1 : 0), 0);
}

function updateQuizScore() {
  const score = quizScore();
  if ($("#quizScore")) $("#quizScore").textContent = score;
  if ($("#quizTotal")) $("#quizTotal").textContent = quizData.length;
}

function renderQuiz() {
  const root = $("#quizList");
  if (!root) return;

  root.innerHTML = quizData.map((item, index) => {
    const selected = state.quiz[index];
    return `<article class="quiz-question" data-q="${index}">
      <h3>${escapeHTML(item.q)}</h3>
      ${item.code ? `<pre><code>${escapeHTML(item.code)}</code></pre>` : ""}
      <div class="quiz-options">
        ${item.options.map((option, optionIndex) => `<button type="button" class="quiz-option ${selected === optionIndex ? (optionIndex === item.answer ? "correct" : "wrong") : ""}" data-opt="${optionIndex}">${escapeHTML(option)}</button>`).join("")}
      </div>
      <p class="quiz-feedback" aria-live="polite">${selected === null ? "Escolha uma alternativa." : selected === item.answer ? "✓ Correto." : `✗ Ainda não. ${escapeHTML(item.hint)}`}</p>
    </article>`;
  }).join("");

  $$(".quiz-question", root).forEach(card => {
    const questionIndex = Number(card.dataset.q);
    $$(".quiz-option", card).forEach(button => {
      button.addEventListener("click", () => {
        state.quiz[questionIndex] = Number(button.dataset.opt);
        saveState();
        renderQuiz();
        updateProgress();
      });
    });
  });

  updateQuizScore();
}

$("#resetQuiz")?.addEventListener("click", () => {
  if (!confirm("Reiniciar o quiz?")) return;
  state.quiz = Array(quizData.length).fill(null);
  saveState();
  renderQuiz();
  updateProgress();
});

function restoreUI() {
  $$("[data-answer], #studentName, #studentClass").forEach(field => {
    if (Object.hasOwn(state.fields, field.id)) field.value = state.fields[field.id];
  });
}

function bindPersistence() {
  $$("[data-answer], #studentName, #studentClass").forEach(field => {
    field.addEventListener("input", () => {
      state.fields[field.id] = field.value;
      saveState();
      updateProgress();
    });
  });
}

function fieldValid(field) {
  const min = Number(field.dataset.minLength || 1);
  return field.value.trim().length >= min;
}

function weekData(prefix) {
  const fields = $$("[data-answer]").filter(field => field.id.startsWith(prefix));
  const done = fields.filter(fieldValid).length;
  return { fields, done, total: fields.length };
}

function validateAll() {
  const pending = [];
  const nameOk = ($("#studentName")?.value || "").trim().length >= 3;
  const classOk = ($("#studentClass")?.value || "").trim().length >= 2;

  if (!nameOk) pending.push("Preencha o nome.");
  if (!classOk) pending.push("Preencha a turma.");

  const weeks = {
    s24: weekData("s24_"),
    s25: weekData("s25_"),
    s26: weekData("s26_")
  };

  for (const [label, data] of [["Semana 24", weeks.s24], ["Semana 25", weeks.s25], ["Semana 26", weeks.s26]]) {
    data.fields.forEach(field => {
      const ok = fieldValid(field);
      field.classList.toggle("invalid", !ok && field.value.trim().length > 0);
      if (!ok) pending.push(`${label}: responda "${field.dataset.label}".`);
    });
  }

  const score = quizScore();
  if (score < quizData.length) pending.push(`Quiz: conclua/corrija ${quizData.length - score} questão(ões).`);

  return {
    valid: nameOk && classOk && pending.length === 0,
    pending, nameOk, classOk, weeks, score
  };
}

function updateProgress() {
  const validation = validateAll();

  $("#progIdentity").textContent = validation.nameOk && validation.classOk ? "✓ Completa" : "Pendente";
  $("#progS24").textContent = `${validation.weeks.s24.done}/${validation.weeks.s24.total}`;
  $("#progS25").textContent = `${validation.weeks.s25.done}/${validation.weeks.s25.total}`;
  $("#progS26").textContent = `${validation.weeks.s26.done}/${validation.weeks.s26.total}`;
  $("#progQuiz").textContent = `${validation.score}/${quizData.length}`;

  const total = 1 + validation.weeks.s24.total + validation.weeks.s25.total + validation.weeks.s26.total + quizData.length;
  const done = (validation.nameOk && validation.classOk ? 1 : 0)
    + validation.weeks.s24.done + validation.weeks.s25.done + validation.weeks.s26.done + validation.score;
  const percent = Math.round((done / total) * 100);

  $("#progPercent").textContent = `${percent}%`;
  $("#progressBarFill").style.width = `${percent}%`;

  const list = $("#pendingList");
  if (list) {
    list.innerHTML = validation.pending.length
      ? validation.pending.map(item => `<li>${escapeHTML(item)}</li>`).join("")
      : "<li>✓ Tudo concluído. O PDF está disponível.</li>";
  }

  const button = $("#generatePdf");
  if (button) {
    button.disabled = !validation.valid;
    button.textContent = validation.valid
      ? "✓ Gerar / Salvar atividade em PDF"
      : "🔒 Gerar / Salvar atividade em PDF";
  }

  updateQuizScore();
  return validation;
}

$("#checkPending")?.addEventListener("click", () => {
  const validation = updateProgress();
  showToast(validation.valid ? "Tudo concluído. PDF liberado." : `Ainda há ${validation.pending.length} pendência(s).`);
});

const reportQuestions = {
  s24: [
    ["s24_analysis", "Análise do código do quiz."],
    ["s24_r1", "1. Previsão para 5 acertos."],
    ["s24_r2", "2. Previsão para 3 acertos."],
    ["s24_r3", "3. Previsão para 0 acertos."],
    ["s24_r4", "4. Ordem das condições de pontuação."],
    ["s24_r5", "5. Mensagem final depois do loop."]
  ],
  s25: [
    ["s25_analysis", "Análise do código de vendas e persistência."],
    ["s25_r1", "1. Por que salvar_vendas() é chamada após alteração."],
    ["s25_r2", "2. Por que carregar_vendas() é usada na abertura."],
    ["s25_r3", "3. Produto inexistente."],
    ["s25_r4", "4. Lista em memória × arquivo CSV."],
    ["s25_r5", "5. Validação da quantidade."]
  ],
  s26: [
    ["s26_analysis", "Análise da repetição e proposta de refatoração."],
    ["s26_r1", "1. Funções que precisam localizar produto."],
    ["s26_r2", "2. Responsabilidade de formatar_produto()."],
    ["s26_r3", "3. Responsabilidade de buscar_produto()."],
    ["s26_r4", "4. Terceira oportunidade de reorganização."],
    ["s26_r5", "5. Função proposta."],
    ["s26_r6", "6. O que fica mais claro/menos repetido."],
    ["s26_r7", "7. Como verificar a preservação do comportamento."]
  ]
};

function fillReportAnswers(target, items) {
  const root = $(target);
  if (!root) return;
  root.innerHTML = items.map(([id, question]) => `<article class="report-answer">
    <strong>${escapeHTML(question)}</strong>
    <p><b>Resposta do estudante:</b></p>
    <p>${escapeHTML(($("#" + id)?.value || "").trim())}</p>
  </article>`).join("");
}

function buildReport() {
  const validation = validateAll();
  if (!validation.valid) return false;

  $("#reportName").textContent = $("#studentName").value.trim();
  $("#reportClass").textContent = $("#studentClass").value.trim();
  $("#reportDate").textContent = new Intl.DateTimeFormat("pt-BR").format(new Date());

  fillReportAnswers("#reportS24", reportQuestions.s24);
  fillReportAnswers("#reportS25", reportQuestions.s25);
  fillReportAnswers("#reportS26", reportQuestions.s26);

  $("#reportCode24").textContent = $("#analysisCode24")?.textContent || "";
  $("#reportCode25").textContent = $("#analysisCode25")?.textContent || "";
  $("#reportCode26").textContent = $("#analysisCode26")?.textContent || "";

  $("#reportScore").textContent = `${quizData.length}/${quizData.length} — 100%`;
  $("#reportQuiz").innerHTML = quizData.map((item, index) => `<article class="report-quiz-item">
    <strong>${escapeHTML(item.q)}</strong>
    ${item.code ? `<pre><code>${escapeHTML(item.code)}</code></pre>` : ""}
    <p><b>Resposta do estudante:</b> ${escapeHTML(item.options[state.quiz[index]])}</p>
    <p><b>Resposta correta:</b> ${escapeHTML(item.options[item.answer])}</p>
    <p>✓ Correta</p>
  </article>`).join("");

  return true;
}

$("#generatePdf")?.addEventListener("click", () => {
  const validation = updateProgress();
  if (!validation.valid || !buildReport()) {
    showToast("PDF bloqueado: verifique as pendências.");
    return;
  }
  requestAnimationFrame(() => window.print());
});

$("#clearAnswers")?.addEventListener("click", () => {
  if (!confirm("Apagar identificação, respostas e quiz? O tema será preservado.")) return;

  safeStorage.remove(STORAGE_KEY);
  state = { fields: {}, quiz: Array(quizData.length).fill(null) };

  $$("[data-answer], #studentName, #studentClass").forEach(field => {
    field.value = "";
    field.classList.remove("invalid");
  });

  renderQuiz();
  saveState();
  updateProgress();
  showToast("Respostas apagadas.");
});

loadState();
restoreUI();
bindPersistence();
renderQuiz();
updateProgress();
