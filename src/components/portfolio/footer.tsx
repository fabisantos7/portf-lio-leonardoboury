"use client";

import { useSyncExternalStore } from "react";
import { footerTech, profile } from "@/lib/data";
import { Github, Linkedin, Mail } from "lucide-react";

// Mesma ideia do site original: mês/ano dinâmico no rodapé.
// useSyncExternalStore evita mismatch de hidratação com valores do cliente.
let cachedDate: string | null = null;

function getClientSnapshot(): string {
  if (cachedDate === null) {
    const now = new Date();
    const mes = now
      .toLocaleString("pt-BR", { month: "long" })
      .replace(/^\w/, (c) => c.toUpperCase());
    cachedDate = `${mes} de ${now.getFullYear()}`;
  }
  return cachedDate;
}

const emptySubscribe = () => () => {};
const getServerSnapshot = () => "";

export function Footer() {
  const createdAt = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  return (
    <footer className="mt-auto bg-[#12141a] border-t border-border">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-6 text-center">
        <div className="flex items-center justify-center gap-5 mb-3">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Enviar e-mail"
            className="text-[#a1a1aa] hover:text-[#00ff66] transition-colors p-1"
          >
            <Mail size={18} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#a1a1aa] hover:text-[#00ff66] transition-colors p-1"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#a1a1aa] hover:text-[#00ff66] transition-colors p-1"
          >
            <Linkedin size={18} />
          </a>
        </div>
        <p className="text-[#a1a1aa] text-sm">{footerTech}</p>
        <p className="text-[#a1a1aa] text-sm">
          © {createdAt ? createdAt.replace(/^\w+ de /, "") : "…"}{" "}
          <strong className="text-[#00ff66] font-semibold">
            Leonardo Boury
          </strong>{" "}
          — Dev.Portfolio
        </p>
        <p className="text-[#a1a1aa] text-xs mt-1">
          Criado em:{" "}
          <strong className="text-[#00ff66] font-semibold">
            {createdAt || "…"}
          </strong>
        </p>
      </div>
    </footer>
  );
}
