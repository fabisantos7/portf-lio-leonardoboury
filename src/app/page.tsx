"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Header, type TabId } from "@/components/portfolio/header";
import { Footer } from "@/components/portfolio/footer";
import { AboutPage } from "@/components/portfolio/about";
import { ProjectsPage } from "@/components/portfolio/projects";
import { ContactPage } from "@/components/portfolio/contact";

export default function Home() {
  const [tab, setTab] = useState<TabId>("sobre");
  const [showTop, setShowTop] = useState(false);

  // Botão "voltar ao topo" aparece após rolar
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 420);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Permite que componentes abram uma aba (ex.: CTA "Fale Comigo" na Sobre)
  useEffect(() => {
    const onOpenTab = (e: Event) => {
      const next = (e as CustomEvent).detail as TabId;
      if (next === "sobre" || next === "projetos" || next === "contato") {
        setTab(next);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("open-tab", onOpenTab);
    return () => window.removeEventListener("open-tab", onOpenTab);
  }, []);

  const goTo = (next: TabId) => {
    setTab(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header active={tab} onChange={goTo} />

      {/* Fundo decorativo (grid + glow neon) */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 neon-glow-top" />
        <div className="absolute inset-0 bg-tech-grid" />
      </div>

      <main className="page-content relative z-10 w-full max-w-[1100px] mx-auto px-4 sm:px-8 py-8 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {tab === "sobre" && <AboutPage />}
            {tab === "projetos" && <ProjectsPage />}
            {tab === "contato" && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Botão voltar ao topo */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Voltar ao topo"
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-[#00ff66] text-[#0a0a0c] flex items-center justify-center shadow-[0_0_18px_var(--accent-green-glow)] cursor-pointer transition-transform hover:-translate-y-1"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
