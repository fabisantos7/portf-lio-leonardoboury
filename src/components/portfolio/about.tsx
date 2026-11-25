"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import avatarImg from "../../../public/profile.jpg";
import {
  Atom,
  Braces,
  Code,
  Download,
  GitBranch,
  GraduationCap,
  MapPin,
  Palette,
  Zap,
} from "lucide-react";
import { Typewriter } from "./typewriter";
import { profile, skills, stats } from "@/lib/data";

const skillIcons: Record<string, React.ReactNode> = {
  Code: <Code size={15} />,
  Palette: <Palette size={15} />,
  Braces: <Braces size={15} />,
  Zap: <Zap size={15} />,
  Atom: <Atom size={15} />,
  GitBranch: <GitBranch size={15} />,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export function AboutPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-16"
    >
      {/* ===== Perfil ===== */}
      <section
        className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mt-4"
        aria-label="Apresentação"
      >
        {/* Avatar com anel neon giratório */}
        <motion.div variants={fadeUp} className="relative flex-shrink-0">
          <div className="avatar-ring absolute -inset-1.5 rounded-full" aria-hidden="true" />
          <div className="relative w-[220px] h-[220px] rounded-full overflow-hidden bg-[#12141a] border-[3px] border-[#00ff66] shadow-[0_0_20px_var(--accent-green-glow)]">
            <Image
              src={avatarImg}
              alt="Foto de perfil de Leonardo Boury"
              fill
              priority
              sizes="220px"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#0a0a0c] border border-border rounded-full px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] pulse-dot" aria-hidden="true" />
            <span className="text-xs text-[#a1a1aa]">Disponível</span>
          </div>
        </motion.div>

        {/* Texto */}
        <div className="flex-1 min-w-[280px] text-center md:text-left">
          <div className="mb-1 flex flex-wrap items-center gap-x-4 gap-y-1 justify-center md:justify-start text-sm text-[#a1a1aa]">
            <span className="inline-flex items-center gap-1.5">
              <GraduationCap size={15} className="text-[#00ff66]" />
              Estudante de Desenvolvimento Web
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={15} className="text-[#00ff66]" />
              Brasil
            </span>
          </div>

          <Typewriter />

          <motion.p
            variants={fadeUp}
            className="text-[#a1a1aa] text-lg leading-relaxed mt-4 mb-6"
          >
            {profile.bio}
          </motion.p>

          {/* Badges rápidos (como no original) */}
          <motion.div
            variants={fadeUp}
            className="flex gap-3 flex-wrap justify-center md:justify-start"
            aria-label="Principais tecnologias"
          >
            {["HTML", "CSS", "JavaScript", "jQuery", "React", "Git"].map(
              (tech) => (
                <span
                  key={tech}
                  className="bg-[#12141a] border border-border px-4 py-1.5 rounded-full text-sm font-semibold text-[#00ff66] transition-all duration-300 hover:-translate-y-1 hover:border-[#00ff66] hover:shadow-[0_4px_10px_var(--accent-green-glow)] cursor-default"
                >
                  {tech}
                </span>
              )
            )}
          </motion.div>

          {/* CTA: Baixar CV */}
          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-wrap gap-3 justify-center md:justify-start"
          >
            <a
              href={profile.cv}
              download="CV - Leonardo Boury.pdf"
              className="inline-flex items-center gap-2 bg-[#00ff66] text-[#0a0a0c] font-bold px-6 py-3 rounded-md no-underline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_var(--accent-green-glow)]"
              aria-label="Baixar currículo em PDF"
            >
              <Download size={18} />
              Baixar CV
            </a>
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent("open-tab", { detail: "contato" }));
              }}
              className="inline-flex items-center gap-2 bg-transparent text-[#00ff66] border border-[#00ff66] font-bold px-6 py-3 rounded-md no-underline transition-all duration-300 hover:bg-[rgba(0,255,102,0.08)] hover:-translate-y-0.5"
            >
              Fale Comigo
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <motion.section
        variants={fadeUp}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        aria-label="Estatísticas"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#12141a] border border-border rounded-xl px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#00ff66] hover:shadow-[0_6px_18px_var(--accent-green-glow)]"
          >
            <p className="text-3xl font-extrabold text-neon font-mono">
              {stat.value}
            </p>
            <p className="text-sm text-[#a1a1aa] mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.section>

      {/* ===== Habilidades com barras ===== */}
      <section aria-label="Nível de habilidades">
        <motion.h3
          variants={fadeUp}
          className="text-2xl font-bold mb-2"
        >
          Minhas <span className="text-neon">Habilidades</span>
        </motion.h3>
        <motion.p variants={fadeUp} className="text-[#a1a1aa] mb-8">
          Nível de experiência com cada tecnologia, em constante evolução.
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={fadeUp}
              className="group"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="flex items-center gap-2 font-semibold text-foreground">
                  <span className="text-[#00ff66]">
                    {skillIcons[skill.icon]}
                  </span>
                  {skill.name}
                </span>
                <span className="font-mono text-sm text-[#a1a1aa] group-hover:text-[#00ff66] transition-colors">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-[#1a1d26] border border-border overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#00cc52] to-[#00ff66] shadow-[0_0_10px_var(--accent-green-glow)]"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.1 + i * 0.08,
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
