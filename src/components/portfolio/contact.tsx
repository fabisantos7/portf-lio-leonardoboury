"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Send,
  XCircle,
} from "lucide-react";
import { profile } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const contactCards = [
  {
    title: "E-mail",
    href: `mailto:${profile.email}`,
    label: profile.email,
    icon: <Mail size={20} />,
  },
  {
    title: "GitHub",
    href: profile.github,
    label: profile.githubLabel,
    icon: <Github size={20} />,
  },
  {
    title: "LinkedIn",
    href: profile.linkedin,
    label: profile.linkedinLabel,
    icon: <Linkedin size={20} />,
  },
  {
    title: "Currículo",
    href: profile.cv,
    label: "Baixar CV em PDF",
    icon: <FileText size={20} />,
    download: true,
  },
];

type Feedback = { ok: boolean; text: string } | null;

export function ContactPage() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const maxMessage = 2000;
  const nameValid = form.name.trim().length >= 2;
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const messageValid = form.message.trim().length >= 10;
  const formValid = nameValid && emailValid && messageValid;

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const showValidation = (field: keyof typeof form) =>
    touched[field] &&
    ((field === "name" && !nameValid) ||
      (field === "email" && !emailValid) ||
      (field === "message" && !messageValid));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    if (!formValid || submitting) return;
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setFeedback({ ok: true, text: data.message });
        toast({
          title: "Mensagem enviada!",
          description: "Obrigado pelo contato, responderei em breve.",
        });
        setForm({ name: "", email: "", message: "" });
        setTouched({});
      } else {
        setFeedback({ ok: false, text: data.error || "Erro ao enviar." });
        toast({
          title: "Ops, algo deu errado",
          description: data.error || "Tente novamente.",
          variant: "destructive",
        });
      }
    } catch {
      setFeedback({
        ok: false,
        text: "Falha de conexão. Verifique sua internet e tente novamente.",
      });
      toast({
        title: "Falha de conexão",
        description: "Não foi possível falar com o servidor.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
      // Esconde a mensagem inline após 5s (como no site original)
      setTimeout(() => setFeedback(null), 5000);
    }
  }

  const inputBase =
    "w-full bg-[#0a0a0c] border rounded-md px-3.5 py-3 text-foreground placeholder:text-[#5c5c63] outline-none transition-all duration-300 focus:border-[#00ff66] focus:shadow-[0_0_8px_var(--accent-green-glow)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-extrabold mb-2">
        Vamos <span className="text-neon">Conversar?</span>
      </h2>
      <p className="text-[#a1a1aa] mt-2 mb-10">
        Preencha o formulário abaixo ou envie uma mensagem direta pelas minhas
        redes.
      </p>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-10">
        {/* ===== Cards de contato direto ===== */}
        <div className="flex flex-col gap-5">
          {contactCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              download={
                card.download ? "CV - Leonardo Boury.pdf" : undefined
              }
              target={
                card.download || card.href.startsWith("mailto:")
                  ? undefined
                  : "_blank"
              }
              rel={
                card.download || card.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="group bg-[#12141a] border border-border rounded-[10px] p-5 transition-all duration-300 hover:border-[#00ff66] hover:translate-x-1.5 hover:shadow-[0_6px_18px_var(--accent-green-glow)]"
            >
              <h4 className="flex items-center gap-2.5 text-[#00ff66] font-semibold mb-1">
                <span className="group-hover:scale-110 transition-transform">
                  {card.icon}
                </span>
                {card.title}
              </h4>
              <p className="text-[#a1a1aa] group-hover:text-foreground transition-colors break-all">
                {card.label}
              </p>
            </a>
          ))}

          {/* Card extra de disponibilidade */}
          <div className="bg-[rgba(0,255,102,0.05)] border border-[rgba(0,255,102,0.3)] rounded-[10px] p-5">
            <h4 className="flex items-center gap-2.5 text-[#00ff66] font-semibold mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] pulse-dot" />
              Resposta rápida
            </h4>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              Costumo responder em até 48h. Para propostas e colaborações, o
              formulário ao lado é o melhor caminho.
            </p>
          </div>
        </div>

        {/* ===== Formulário ===== */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-[#12141a] border border-border rounded-xl p-6 sm:p-8 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="nome" className="text-sm text-[#a1a1aa]">
              Seu Nome:
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Digite seu nome"
              value={form.name}
              onChange={update("name")}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              aria-invalid={!!showValidation("name")}
              className={`${inputBase} ${
                showValidation("name") ? "border-[#ff4d4d]" : "border-border"
              }`}
              required
            />
            {showValidation("name") && (
              <span className="text-xs text-[#ff4d4d]">
                Informe ao menos 2 caracteres.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-[#a1a1aa]">
              Seu E-mail:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seunome@email.com"
              value={form.email}
              onChange={update("email")}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              aria-invalid={!!showValidation("email")}
              className={`${inputBase} ${
                showValidation("email") ? "border-[#ff4d4d]" : "border-border"
              }`}
              required
            />
            {showValidation("email") && (
              <span className="text-xs text-[#ff4d4d]">
                Informe um e-mail válido.
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="mensagem" className="text-sm text-[#a1a1aa]">
                Sua Mensagem:
              </label>
              <span
                className={`font-mono text-xs ${
                  form.message.length > maxMessage
                    ? "text-[#ff4d4d]"
                    : "text-[#5c5c63]"
                }`}
              >
                {form.message.length}/{maxMessage}
              </span>
            </div>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={5}
              maxLength={maxMessage}
              placeholder="Escreva sua mensagem aqui..."
              value={form.message}
              onChange={update("message")}
              onBlur={() => setTouched((t) => ({ ...t, message: true }))}
              aria-invalid={!!showValidation("message")}
              className={`${inputBase} resize-y min-h-[120px] ${
                showValidation("message")
                  ? "border-[#ff4d4d]"
                  : "border-border"
              }`}
              required
            />
            {showValidation("message") && (
              <span className="text-xs text-[#ff4d4d]">
                Escreva pelo menos 10 caracteres.
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 bg-[#00ff66] text-[#0a0a0c] font-bold py-3 rounded-md text-base cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_var(--accent-green-glow)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send size={17} />
                Enviar Mensagem
              </>
            )}
          </button>

          {/* Feedback animado (equivalente ao #form-feedback do jQuery) */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
                role="status"
              >
                <div
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-md border font-semibold text-sm ${
                    feedback.ok
                      ? "bg-[rgba(0,255,102,0.15)] text-[#00ff66] border-[#00ff66]"
                      : "bg-[rgba(255,77,77,0.12)] text-[#ff6b6b] border-[#ff4d4d]"
                  }`}
                >
                  {feedback.ok ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <XCircle size={17} />
                  )}
                  {feedback.text}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
}
