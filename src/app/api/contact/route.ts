import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb, ensureSchema } from "@/lib/db";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome deve ter pelo menos 2 caracteres.")
    .max(100, "O nome é muito longo."),
  email: z
    .email("Informe um e-mail válido.")
    .max(150, "O e-mail é muito longo."),
  message: z
    .string()
    .trim()
    .min(10, "A mensagem deve ter pelo menos 10 caracteres.")
    .max(2000, "A mensagem deve ter no máximo 2000 caracteres."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "Dados inválidos.";
      return NextResponse.json(
        { ok: false, error: firstError },
        { status: 400 }
      );
    }

    const { name, email, message } = parsed.data;

    // Cliente carregado sob demanda + garante a tabela mesmo em bancos novos
    const db = await getDb();
    await ensureSchema(db);

    await db.contactMessage.create({
      data: { name, email, message },
    });

    return NextResponse.json({
      ok: true,
      message: "Sua mensagem foi enviada com sucesso!",
    });
  } catch (error) {
    console.error("[CONTACT_POST]", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Não foi possível enviar sua mensagem agora. Tente novamente em instantes.",
      },
      { status: 500 }
    );
  }
}
