# 🚀 Portfólio Leonardo Boury — Guia de Deploy (GitHub + Vercel)

## ❗ O problema: "Not Found" / página em branco

Você sobe o projeto, a Vercel diz que o deploy terminou, mas o site
abre com **404 Not Found** ou uma tela vazia "como se não existisse".

**Causa confirmada (olhando o seu repositório `github.com/Leloo0/portfolio1`):**
o GitHub está recebendo **só arquivos soltos**, **sem as pastas**. Faltam:

- `src/` → todo o código do site (sem `src/app/page.tsx`, a Vercel não
  encontra nenhuma página e devolve 404 na URL raiz);
- `prisma/schema.prisma` → o `postinstall` falha ("Could not load schema");
- `public/` → as fotos, o favicon e o currículo em PDF.

**Por que isso acontece?** Quando você **arrasta arquivos pela tela do
GitHub no navegador**, o GitHub **não sobe pastas** — só arquivos avulsos.
Isso quebra o deploy inteiro. **Nunca use o upload por drag-and-drop do
site do GitHub para um projeto Next.js.**

> ⚠️ Agravante comum: o zip original extraía para uma pasta
> `Portfólio Leonardo Boury - 2026/` (com **espaço e acento**). Se você
> arrastou essa pasta inteira, o repositório ficou com tudo **aninhado um
> nível abaixo** — `package.json` deixa de estar na raiz e a Vercel não
> detecta o framework. Este pacote novo **já vem com os arquivos na raiz**
> e o nome da pasta limpo (`portfolio-leonardo-boury`).

---

## ✅ A solução (escolha UM método)

### Método 1 — Script automático (recomendado)

O pacote traz um script que envia **tudo** (pastas incluídas) e
**substitui o conteúdo antigo** do `Leloo0/portfolio1` de uma vez:

1. Extraia este zip em uma pasta no seu computador;
2. **Windows:** dê dois cliques em `SUBIR-PARA-GITHUB.bat`.
   **Mac/Linux:** abra o Terminal **dentro da pasta extraída** e rode
   `bash subir-para-github.sh`;
3. Se avisar que o Git não está instalado, instale em
   [git-scm.com](https://git-scm.com/downloads) e rode de novo;
4. Na primeira vez, uma janela do navegador abre para você **entrar na
   sua conta GitHub** (é o login normal do site). Confirme;
5. Espere aparecer **PRONTO!**.

O script faz: `git init → git add . → commit → push --force`. O
`--force` apaga o conteúdo incompleto antigo — o repositório fica
**idêntico** ao pacote. A Vercel detecta o push e **publica sozinha**.

### Método 2 — GitHub Desktop (gráfico, sem comandos)

1. Instale o [GitHub Desktop](https://desktop.github.com) e entre;
2. **File → Add Local Repository…** → aponte para a pasta extraída.
   Se disser que não é um repositório, clique em
   **Create a Repository Here** (nome: `portfolio1`, padrão);
3. Escreva um resumo (ex.: `deploy completo`) e clique em **Commit**;
4. **Repository → Push**. Se o botão disser "Fetch origin", clique nele
   e depois em **Force Push** para sobrescrever o conteúdo antigo.

---

## 🔎 ANTES de olhar a Vercel — confira o GitHub (30 segundos)

Abra `github.com/Leloo0/portfolio1` e verifique:

| O que você deve ver | Onde |
|---|---|
| 3 pastas: `src`, `public`, `prisma` | na raiz do repo |
| `page.tsx` | dentro de `src/app` |
| `schema.prisma` | dentro de `prisma` |
| `package.json` | **direto na raiz**, NÃO dentro de uma subpasta |
| ~42 itens no total | contador da home do repo |

**Só depois de ver as pastas no GitHub** o deploy funciona. Se você
abrir o repo e só ver arquivos soltos sem `src/`, o push falhou — rode o
script de novo.

---

## ▲ Na Vercel

1. Se o projeto **já existe** no dashboard da Vercel: o push novo dispara
   um redeploy automático. Acompanhe em `vercel.com/dashboard`.
2. Se **não existe** ainda: `vercel.com/new` → escolha `portfolio1`.
3. **Root Directory:** deixe **VAZIO** (não aponte para subpasta alguma).
4. **Framework Preset:** deve aparecer `Next.js` automaticamente. Se
   aparecer `Other` ou em branco, é sinal de que o `package.json` não
   está na raiz do repo — volte e confira o GitHub.
5. **Build Command / Install Command:** deixe os padrões da Vercel.

### Variável de ambiente (opcional)

| Variável | Valor |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://portfolio1.vercel.app` (ou seu domínio) |

> Não defina `DATABASE_URL`: o código já resolve o banco SQLite
> automaticamente (`/tmp` na Vercel, `db/custom.db` local).

---

## ⚠️ Sobre o formulário de contato (importante)

A Vercel é **serverless**: o disco é somente-leitura (exceto `/tmp`) e
cada instância é efêmera. Com SQLite, as mensagens do formulário são
salvas em `/tmp` e **podem sumir** quando a instância reinicia (o
formulário continua funcionando e respondendo "enviado com sucesso").

Para guardar as mensagens de forma permanente, migre para um banco
gratuito na nuvem:

1. Crie um banco em [turso.tech](https://turso.tech) (SQLite na nuvem) ou
   [neon.tech](https://neon.tech) (Postgres);
2. No `prisma/schema.prisma`, troque `provider = "sqlite"` por
   `"postgres"` (Neon) ou use Turso com `@libsql/client`;
3. Na Vercel, defina `DATABASE_URL` com a string de conexão do banco;
4. Faça um novo deploy.

---

## 💻 Rodando localmente (para testar antes de subir)

```bash
npm install     # instala dependências e roda prisma generate (postinstall)
npm run dev     # servidor em localhost:3000
npm run build   # build de produção (mesmo comando da Vercel)
npm run start   # serve o build de produção
```

> O `.env` é opcional localmente: sem ele, o site usa `db/custom.db`
> (a pasta `db/` é criada sozinha na primeira execução).

---

## 🧱 Stack técnica

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
shadcn/ui · Framer Motion · Prisma + SQLite · Lucide Icons.
