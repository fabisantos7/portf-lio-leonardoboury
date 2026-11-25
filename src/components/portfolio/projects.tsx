"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Braces,
  ChevronDown,
  ExternalLink,
  Globe,
  GraduationCap,
  Puzzle,
  Ticket,
  TrendingUp,
  UtensilsCrossed,
  Star,
} from "lucide-react";
import { projects, type Project } from "@/lib/data";

const projectIcons: Record<string, React.ReactNode> = {
  Puzzle: <Puzzle size={38} strokeWidth={1.5} />,
  BookOpen: <BookOpen size={38} strokeWidth={1.5} />,
  UtensilsCrossed: <UtensilsCrossed size={38} strokeWidth={1.5} />,
  Ticket: <Ticket size={38} strokeWidth={1.5} />,
  TrendingUp: <TrendingUp size={38} strokeWidth={1.5} />,
  Globe: <Globe size={38} strokeWidth={1.5} />,
  Braces: <Braces size={38} strokeWidth={1.5} />,
};

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "web", label: "Web" },
  { id: "ferramenta", label: "Interativos" },
  { id: "landing", label: "Landing Pages" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      layout
      className="project-card group bg-[#12141a] border border-border rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:border-[#00ff66] hover:shadow-[0_10px_20px_var(--accent-green-glow)]"
    >
      {/* Visual do projeto: screenshot real ou placeholder com ícone */}
      <div
        className={`project-img-placeholder ${
          project.image ? "!h-auto aspect-[2/1]" : ""
        }`}
      >
        {/* Destaque (ex.: 1º projeto por conta própria) */}
        {project.highlight && (
          <span className="absolute top-3 left-3 z-20 inline-flex items-center gap-1 bg-[#00ff66] text-[#0a0a0c] text-[11px] font-bold rounded-full px-2.5 py-1 shadow-[0_0_14px_var(--accent-green-glow)]">
            <Star size={11} fill="currentColor" />
            {project.highlight}
          </span>
        )}

        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={`Print do projeto ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            />
            {/* Gradiente + chips de tecnologias sobre a imagem */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-center justify-center gap-1.5 bg-gradient-to-t from-[rgba(10,10,12,0.92)] via-[rgba(10,10,12,0.55)] to-transparent px-3 pb-2.5 pt-10">
              {project.techs.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] tracking-wide text-[#00ff66] bg-[#0a0a0c]/85 border border-[rgba(0,255,102,0.3)] rounded-full px-2 py-0.5 backdrop-blur-[2px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="relative z-10 flex flex-col items-center gap-2 text-[#00ff66]/70">
            {projectIcons[project.icon] ?? (
              <Braces size={38} strokeWidth={1.5} />
            )}
            <span className="font-mono text-[11px] text-[#a1a1aa] tracking-wide">
              {project.techs.join(" · ")}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold leading-snug">{project.title}</h3>
          <span className="flex-shrink-0 font-mono text-[10px] uppercase tracking-wider text-[#00ff66] bg-[rgba(0,255,102,0.08)] border border-[rgba(0,255,102,0.25)] rounded-full px-2.5 py-0.5 mt-0.5">
            {CATEGORIES.find((c) => c.id === project.category)?.label}
          </span>
        </div>

        <p className="text-[#a1a1aa] text-[0.95rem] mb-4">
          {project.description}
        </p>

        {/* Botão de detalhes (substitui o slideToggle do jQuery) */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="flex items-center gap-1 text-sm text-[#00ff66] underline underline-offset-2 mb-3 w-fit cursor-pointer hover:brightness-110 transition"
        >
          <GraduationCap size={15} />
          {expanded ? "Ocultar Detalhes" : "Ver Detalhes"}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="bg-[rgba(0,255,102,0.05)] border-l-[3px] border-[#00ff66] rounded-md p-3 mb-4 text-sm text-[#a1a1aa]">
                <strong className="text-foreground">Aprendizados:</strong>{" "}
                {project.learnings}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-project mt-auto inline-flex items-center justify-center gap-1.5 text-center bg-transparent text-[#00ff66] border border-[#00ff66] px-4 py-2.5 rounded-md font-semibold no-underline transition-all duration-300 hover:bg-[#00ff66] hover:text-[#0a0a0c]"
        >
          Acessar Projeto
          <ExternalLink size={15} />
        </a>
      </div>
    </motion.article>
  );
}

export function ProjectsPage() {
  const [category, setCategory] = useState<CategoryId>("todos");

  const filtered = useMemo(
    () =>
      category === "todos"
        ? projects
        : projects.filter((p) => p.category === category),
    [category]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-3xl font-extrabold mb-2">
        Meus <span className="text-neon">Projetos</span>
      </h2>
      <p className="text-[#a1a1aa] mt-2 mb-8">
        Passe o mouse sobre os cards para interagir ou clique para expandir os
        detalhes.
      </p>

      {/* Filtros por categoria */}
      <div
        className="flex flex-wrap gap-2.5 mb-10"
        role="group"
        aria-label="Filtrar projetos por categoria"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            aria-pressed={category === cat.id}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
              category === cat.id
                ? "bg-[#00ff66] text-[#0a0a0c] shadow-[0_0_14px_var(--accent-green-glow)]"
                : "bg-[#12141a] text-[#a1a1aa] border border-border hover:text-[#00ff66] hover:border-[#00ff66]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div
        key={category}
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-[#a1a1aa] py-16">
          Nenhum projeto nesta categoria ainda — em breve novidades!
        </p>
      )}

      <p className="mt-10 text-sm text-[#a1a1aa] flex items-center gap-1.5">
        <ArrowUpRight size={15} className="text-[#00ff66]" />
        Quer ver mais? Me chame na aba Contato e trocamos ideias.
      </p>
    </motion.div>
  );
}
