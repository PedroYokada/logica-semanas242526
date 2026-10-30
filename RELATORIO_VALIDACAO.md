# RELATÓRIO DE VALIDAÇÃO

## Alteração aplicada

A versão anterior dependia de Pyodide carregado por CDN dentro de um Web Worker.

Embora esse padrão seja suportado pelo Pyodide, a execução estava apresentando problemas reais para os estudantes. Para evitar que uma dependência externa impeça a entrega da atividade, foi adotado o Plano B pedagógico: **análise de código + questão dissertativa**.

## Arquivos alterados

- `index.html`
- `script.js`
- `styles.css`
- `README.md`
- `RELATORIO_VALIDACAO.md`

Arquivo removido:

- `python-worker.mjs`

## O que foi removido

- botão Preparar Python;
- Web Worker;
- Pyodide;
- botões Executar e Parar;
- terminal;
- editor Python;
- entradas simuladas para `input()`;
- sistema de arquivos virtual.

## O que foi preservado

- conteúdos das Semanas 24, 25 e 26;
- trechos de código Python;
- registros;
- questões teóricas;
- quiz com 15 questões;
- `localStorage`;
- modo claro/escuro;
- menu mobile;
- progresso;
- geração de PDF;
- materiais originais.

## Nova estratégia pedagógica

### Semana 24

O código do quiz fica visível e o estudante precisa explicar o papel de:

- `for`;
- índice;
- listas;
- condicionais;
- pontuação.

### Semana 25

O código de vendas fica visível e o estudante precisa explicar:

- memória;
- persistência;
- salvar;
- carregar;
- arquivo CSV.

### Semana 26

O código com busca repetida fica visível e o estudante precisa:

- identificar repetição;
- propor `buscar_produto()`;
- explicar por que a refatoração melhora a manutenção.

## Validação estática realizada antes do commit

- JavaScript novo analisado pelo parser do V8: **OK**;
- IDs duplicados no HTML transformado: **0**;
- referências visuais a `Preparar Python`: **0**;
- botões `.run-code`: **0**;
- botões `.stop-code`: **0**;
- dependência de `python-worker.mjs` no HTML/JS: **removida**.

## Regra do PDF

O progresso agora depende somente de:

- identificação;
- respostas obrigatórias das três semanas;
- 15/15 no quiz.

Não existe mais requisito de “executar o laboratório”.

A função de geração continua chamando a validação novamente no clique, portanto o PDF permanece bloqueado se alguma resposta obrigatória estiver vazia.

## Limitação

A página publicada no GitHub Pages não pôde ser aberta pelo ambiente automatizado desta revisão. Por isso, não foi declarado um teste visual ao vivo da URL publicada.

A alteração foi escolhida justamente para eliminar a parte dependente de runtime externo e reduzir o risco de falha no ambiente escolar.
