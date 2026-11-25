"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CubeLogo } from "./cube-logo";

export type TabId = "sobre" | "projetos" | "contato";

const NAV_ITEMS: { id: TabId; label: string }[] = [
  { id: "sobre", label: "Sobre Mim" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

export function Header({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (tab: TabId) => void;
}) {
  const [open, setOpen] = useState(false);

  // Fecha o menu mobile se a tela crescer
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleClick = (tab: TabId) => {
    onChange(tab);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-100 bg-[rgba(10,10,12,0.9)] backdrop-blur-[10px] border-b border-border">
      <nav className="max-w-[1100px] mx-auto flex justify-between items-center px-4 sm:px-8 py-4">
        <button
          type="button"
          onClick={() => handleClick("sobre")}
          className="logo group flex items-center gap-2.5 text-xl font-bold text-foreground cursor-pointer"
          aria-label="Ir para a página inicial (Sobre Mim)"
        >
          <CubeLogo />
          <span>Dev.Portfolio</span>
        </button>

        {/* Navegação desktop */}
        <ul className="hidden md:flex gap-4 list-none">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleClick(item.id)}
                aria-current={active === item.id ? "page" : undefined}
                className={`nav-btn text-base font-semibold px-4 py-2 rounded-md transition-all duration-300 cursor-pointer ${
                  active === item.id
                    ? "text-[#0a0a0c] bg-[#00ff66] shadow-[0_0_12px_var(--accent-green-glow)]"
                    : "text-[#a1a1aa] hover:text-[#00ff66] hover:bg-[rgba(0,255,102,0.05)]"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Botão hambúrguer (mobile) */}
        <button
          type="button"
          className="md:hidden text-foreground p-2 rounded-md hover:bg-secondary transition-colors cursor-pointer"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Navegação mobile (drawer animado) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-border bg-[#0c0d10]"
          >
            <ul className="flex flex-col gap-2 px-4 py-4 list-none">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleClick(item.id)}
                    aria-current={active === item.id ? "page" : undefined}
                    className={`w-full text-left text-base font-semibold px-4 py-3 rounded-md transition-all duration-300 cursor-pointer ${
                      active === item.id
                        ? "text-[#0a0a0c] bg-[#00ff66] shadow-[0_0_12px_var(--accent-green-glow)]"
                        : "text-[#a1a1aa] hover:text-[#00ff66] hover:bg-[rgba(0,255,102,0.05)]"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
