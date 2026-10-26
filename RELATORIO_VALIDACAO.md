# RELATÓRIO DE VALIDAÇÃO

## Projeto

**Lógica e Linguagem de Programação — Semanas 24, 25 e 26**

## 1. Estrutura estática

Verificações executadas:

- `node --check script.js`: **OK**;
- `node --check python-worker.mjs`: **OK**;
- IDs duplicados: **0**;
- referências locais quebradas em `href`/`src`: **0**;
- chaves CSS: **215 abrindo / 215 fechando**;
- materiais originais encontrados: **15**.

## 2. Materiais

Foram preservados:

- 5 arquivos da Semana 24;
- 5 arquivos da Semana 25;
- 5 arquivos da Semana 26.

Total: **15 arquivos**.

## 3. Responsividade

Teste automatizado em Chromium headless usando o HTML/CSS/JavaScript reais do projeto.

| Viewport | scrollWidth | clientWidth | Overflow |
|---:|---:|---:|---:|
| 320 px | 320 | 320 | 0 px |
| 375 px | 375 | 375 | 0 px |
| 425 px | 425 | 425 | 0 px |
| 768 px | 768 | 768 | 0 px |
| 1024 px | 1024 | 1024 | 0 px |
| 1366 px | 1366 | 1366 | 0 px |
| 1920 px | 1920 | 1920 | 0 px |

Resultado: **nenhum overflow horizontal global detectado**.

Também foram feitas capturas visuais em 375 px e 1366 px para revisão de hierarquia, hero, cabeçalho e empilhamento mobile.

## 4. Menu

Testes:

- abrir menu mobile: **OK**;
- `aria-expanded=true`: **OK**;
- fechar com `Esc`: **OK**;
- `aria-expanded=false`: **OK**;
- abrir em mobile e aumentar para desktop: menu é normalizado/fechado: **OK**.

## 5. Tema

Teste de alternância claro/escuro: **OK**.

A estrutura usa variáveis CSS para editor, terminal, cards, formulários e componentes.

Persistência é feita por `localStorage`.

## 6. Quiz

Testes:

- resposta errada: pontuação permanece em 0: **OK**;
- corrigir a mesma questão: pontuação passa para 1: **OK**;
- pontuação usada no progresso: **OK**;
- regra final exige 15/15: **OK**.

## 7. Progresso e PDF

Cenários testados:

### Campos completos + quiz correto + laboratórios não executados
Resultado: **PDF bloqueado**.

### Todos os registros + checklists + 15/15 + três laboratórios marcados como executados
Resultado: **100% / PDF liberado**.

### Depois de 100%, apagar uma resposta obrigatória
Resultado: **PDF bloqueado novamente**.

### Preencher novamente
Resultado: **PDF liberado novamente**.

## 8. Validação por tipo de campo

Foi testado um campo técnico da Semana 26 com:

```html
data-min-length="2"
```

Resultado:

- 1 caractere: **bloqueia**;
- 2 caracteres: **aceita**.

Isso evita aplicar um mínimo fixo de 10 caracteres a respostas técnicas curtas.

## 9. Validação dupla do PDF

O teste substituiu `window.print()` por um contador.

### Estado completo
Clique em gerar PDF:

```text
print = 1
```

### Depois, resposta obrigatória apagada e botão visualmente forçado para enabled
Novo clique:

```text
print continua = 1
```

Resultado: a função de geração **revalida os dados** e não depende somente de `disabled`.

## 10. Modo de impressão

Em mídia `print`:

- `#printReport`: **display block**;
- `.topbar`: **display none**.

O relatório inclui:

- identificação;
- três registros;
- código final de cada laboratório;
- última saída;
- checklist da Semana 25;
- `vendas.csv` quando disponível;
- quiz;
- resposta escolhida;
- resposta correta;
- resultado final.

## 11. Persistência

O ambiente de navegação do contêiner bloqueia `localStorage` em páginas `about:blank`, então foi usado um mock com a mesma API para testar a lógica de persistência.

Teste:

1. preencher nome;
2. alterar código da Semana 24;
3. salvar pelo fluxo normal;
4. limpar DOM/estado em memória;
5. chamar `loadState()` + `restoreUI()`.

Resultado restaurado:

```text
Nome: Persistente
Código: print(123)
```

Resultado da lógica de persistência: **OK**.

## 12. Códigos Python iniciais

Os códigos iniciais foram extraídos do JavaScript e executados em CPython local.

### Semana 24

Entradas de teste correspondentes às 5 perguntas.

Resultado:

```text
Pontuação final: 5
Perfeito! Você é um expert em ciências!
```

Exit code: **0**.

### Semana 25

Fluxo testado:

```text
registrar Caderno
quantidade 2
data
listar
sair
```

Resultado:

- venda registrada;
- venda listada;
- `vendas.csv` criado.

Conteúdo:

```csv
produto,quantidade,data
Caderno,2,2026-10-25
```

Exit code: **0**.

### Semana 26

Entrada:

```text
caderno
```

Resultado:

- produtos listados;
- consulta encontra Caderno.

Exit code: **0**.

## 13. Estratégia de input()

Foi executado localmente o mesmo modelo de fila utilizado pelo Worker.

Código de teste:

```python
nome = input("Nome: ")
idade = input("Idade: ")
print("Olá", nome, idade)
```

Entradas:

```text
Pedro
18
```

Saída:

```text
Nome: Pedro
Idade: 18
Olá Pedro 18
```

Resultado da lógica de entrada: **OK**.

## 14. Worker / interrupção

O Worker foi revisado para:

- executar fora da thread principal;
- restaurar arquivos do laboratório;
- capturar stdout/stderr;
- devolver arquivos `.csv`/`.txt`;
- permitir `terminate()` pelo botão Parar;
- recriar o ambiente após interrupção.

Durante a revisão foi encontrado e corrigido um problema de estado: a mensagem de “Python pronto” poderia reabilitar o botão Executar durante uma execução. O Worker agora notifica `ready` apenas na inicialização, evitando dupla execução acidental.

## 15. Limitação do teste Pyodide

O Chromium disponível neste ambiente bloqueia navegação para `localhost` por política administrativa e também bloqueou `fetch()` externo para o CDN do Pyodide.

Por isso, **não foi possível carregar o WebAssembly do Pyodide dentro deste ambiente de teste**.

O projeto utiliza API documentada do Pyodide:

- Web Worker;
- `loadPyodide()`;
- `pyodide.FS`;
- `runPythonAsync()`.

A integração foi validada por:

- sintaxe JavaScript;
- revisão do Worker;
- documentação oficial;
- execução local dos códigos Python;
- teste local da estratégia de `input()`;
- testes completos da UI sem o runtime externo.

Recomenda-se, antes da aula, abrir a versão publicada no GitHub Pages em uma máquina com internet e confirmar:

1. clicar **Preparar Python**;
2. aguardar **Python pronto ✓**;
3. executar `print("Olá")`;
4. testar uma entrada;
5. criar `vendas.csv`;
6. testar **Parar** com um loop infinito.

## 16. Resultado final da revisão

| Funcionalidade | Resultado |
|---|---|
| HTML / IDs / caminhos | OK |
| CSS / overflow | OK |
| Menu mobile | OK |
| Tema | OK |
| Editor e salvamento de código | OK |
| Quiz | OK |
| Progresso | OK |
| PDF incompleto bloqueado | OK |
| PDF completo liberado | OK |
| Validação dupla do PDF | OK |
| Impressão / relatório | OK |
| Códigos Python iniciais em CPython | OK |
| Lógica da fila de input | OK |
| Pyodide real no Chromium deste ambiente | LIMITAÇÃO DO AMBIENTE |
