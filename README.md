# Lógica e Linguagem de Programação — Semanas 24, 25 e 26

Site didático estático para GitHub Pages, com laboratórios Python executáveis no navegador.

## Conteúdo

### Semana 24
- programa interativo;
- `input()`;
- `if / elif / else`;
- `for`;
- `while`;
- listas e índices;
- pontuação;
- Registro: **Quiz temático de ciências**.

### Semana 25
- listas;
- funções;
- modularização;
- menu;
- validação;
- arquivos CSV;
- Registro: **Registrando e corrigindo vendas — Papelaria Ponto Certo**.

### Semana 26
- legibilidade;
- funções com responsabilidade clara;
- repetição;
- reutilização;
- refatoração;
- manutenção;
- testes;
- Registro: **Deixando o código pronto para a próxima manutenção**.

## Python no navegador

A execução utiliza Pyodide em um `Web Worker`.

Arquivo:

```text
python-worker.mjs
```

Versão fixada no CDN:

```text
Pyodide 0.29.5
```

A execução em Worker impede que um código Python comum bloqueie a interface principal. O botão **Parar** encerra o Worker atual e permite recriar o ambiente.

### input()

Para evitar dependência de `SharedArrayBuffer` ou configurações especiais de servidor, cada laboratório possui:

```text
Entradas do programa — uma por linha
```

Cada linha alimenta um `input()` na ordem em que ele for chamado.

Exemplo:

```text
Pedro
18
```

para:

```python
nome = input("Nome: ")
idade = input("Idade: ")
```

A saída mostra os prompts e os valores consumidos.

## Sistema de arquivos virtual

O laboratório da Semana 25 permite trabalhar com:

```text
.csv
.txt
```

Os arquivos retornados pelo Worker são armazenados no estado da atividade e restaurados na execução seguinte.

Assim, `vendas.csv` pode continuar disponível entre execuções do laboratório mesmo que o Worker precise ser recriado.

## Estado salvo

O site utiliza `localStorage` com proteção `try/catch` para salvar:

- nome;
- turma;
- respostas;
- checklist;
- quiz;
- código das três semanas;
- entradas dos laboratórios;
- última saída;
- arquivos virtuais;
- status de execução.

## PDF

O relatório é liberado somente quando:

- nome e turma estão preenchidos;
- Registro da Semana 24 está completo;
- laboratório da Semana 24 foi executado;
- Registro/checklist da Semana 25 está completo;
- laboratório da Semana 25 foi executado;
- Registro da Semana 26 está completo;
- laboratório da Semana 26 foi executado;
- quiz está em 15/15.

A função de impressão revalida tudo no clique. O PDF inclui os códigos finais, últimas saídas, respostas, quiz e `vendas.csv` quando disponível.

## Materiais

Os 15 arquivos originais enviados estão organizados em:

```text
materiais/
├── semana24/
├── semana25/
└── semana26/
```

## GitHub Pages

1. Envie todo o conteúdo desta pasta para o repositório.
2. Não remova `python-worker.mjs`.
3. Preserve a estrutura da pasta `materiais`.
4. Em **Settings > Pages**, publique a branch desejada pela raiz.
5. O navegador precisa ter acesso à internet para baixar o runtime Pyodide do CDN na primeira preparação do Python.

Se o runtime Python não puder ser carregado, o conteúdo teórico, registros e quiz continuam funcionando e o site oferece um link alternativo para Python online.

## Arquivos principais

```text
index.html
styles.css
script.js
python-worker.mjs
README.md
RELATORIO_VALIDACAO.md
```
