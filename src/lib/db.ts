import fs from "fs";
import path from "path";

// Apenas o TIPO do PrismaClient (apagado no build — nenhum import em runtime).
type PrismaClientType = import("@prisma/client").PrismaClient;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
};

/**
 * Resolve a URL do banco SQLite de acordo com o ambiente:
 * - DATABASE_URL definido (.env local ou Vercel) tem prioridade;
 * - Na Vercel (serverless) o filesystem é somente-leitura exceto /tmp,
 *   então usamos um banco em /tmp (persistência efêmera por instância);
 * - Localmente, usa db/custom.db do projeto (a pasta db/ é criada se
 *   não existir — repositórios clonados não vêm com o arquivo do banco).
 */
function resolveDatabaseUrl(): string {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  if (process.env.VERCEL) {
    return "file:/tmp/portfolio.db";
  }

  const dbDir = path.join(process.cwd(), "db");
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  return `file:${path.join(dbDir, "custom.db")}`;
}

let clientPromise: Promise<PrismaClientType> | undefined;

/**
 * Cliente Prisma carregado sob demanda (import dinâmico).
 * O build de produção funciona mesmo se o `prisma generate` não rodou
 * (ex.: prisma/schema.prisma ausente no repositório): o site é publicado
 * normalmente e a API de contato responde com erro amigável, em vez de
 * derrubar o deploy inteiro.
 */
export function getDb(): Promise<PrismaClientType> {
  if (process.env.NODE_ENV !== "production" && globalForPrisma.prisma) {
    return Promise.resolve(globalForPrisma.prisma);
  }

  if (!clientPromise) {
    clientPromise = import("@prisma/client").then((m) => {
      const client = new m.PrismaClient({
        log: ["query"],
        datasources: {
          db: { url: resolveDatabaseUrl() },
        },
      });

      // Evita que hot-reloads criem múltiplos clientes em desenvolvimento
      if (process.env.NODE_ENV !== "production") {
        globalForPrisma.prisma = client;
      }

      return client;
    });
  }

  return clientPromise;
}

// Garante a tabela em bancos novos (ex.: /tmp na Vercel ou clone sem banco)
export async function ensureSchema(db: PrismaClientType) {
  await db.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ContactMessage" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "message" TEXT NOT NULL,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
