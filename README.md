# Lógica e Linguagem de Programação — Semanas 24, 25 e 26

Site didático estático publicado no GitHub Pages.

## Decisão técnica: modo de análise de código

A versão anterior utilizava Pyodide + Web Worker para executar Python no navegador. Como a execução apresentou instabilidade para os estudantes, o projeto foi simplificado para priorizar confiabilidade em sala de aula.

O executor Python foi removido.

Agora cada semana possui:

- um trecho de código Python somente para leitura;
- uma questão dissertativa obrigatória de análise;
- questões teóricas do registro;
- quiz objetivo;
- progresso;
- salvamento automático em `localStorage`;
- relatório final para PDF.

## Semana 24

O aluno analisa um quiz com:

- duas listas paralelas;
- `for`;
- índice;
- `input()`;
- condicionais;
- variável de pontuação;
- mensagem final.

## Semana 25

O aluno analisa funções relacionadas a:

- lista de vendas;
- `salvar_vendas()`;
- `carregar_vendas()`;
- arquivo `vendas.csv`;
- validação;
- persistência.

## Semana 26

O aluno identifica repetição e propõe refatoração com:

- `formatar_produto()`;
- `buscar_produto()`;
- responsabilidade de função;
- reutilização;
- manutenção.

## PDF

O PDF somente é liberado quando:

- nome e turma estiverem preenchidos;
- todas as questões dissertativas estiverem respondidas;
- todos os registros estiverem completos;
- quiz estiver em 15/15.

O relatório mostra o código analisado, a resposta do estudante e o gabarito das questões objetivas.

## Arquivos principais

- `index.html`
- `styles.css`
- `script.js`
- `README.md`
- `RELATORIO_VALIDACAO.md`

O arquivo `python-worker.mjs` não é mais necessário e foi removido.
