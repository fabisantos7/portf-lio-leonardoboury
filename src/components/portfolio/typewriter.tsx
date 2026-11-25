"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

/**
 * Efeito máquina de escrever:
 * 1) digita o nome ("Olá, eu sou Leonardo Boury")
 * 2) apaga e cicla pelos cargos em loop infinito
 */
const PHRASES = [profile.name, ...profile.rotatingRoles];
const NAME_HOLD = 2400; // pausa exibindo o nome completo
const ROLE_HOLD = 1800; // pausa exibindo cada cargo
const TYPE_NAME_MS = 95; // velocidade digitando o nome
const TYPE_ROLE_MS = 80; // velocidade digitando os cargos
const DELETE_MS = 38; // velocidade apagando

export function Typewriter() {
  const [text, setText] = useState("");
  const [showingName, setShowingName] = useState(true);

  useEffect(() => {
    let phraseIndex = 0; // 0 = nome; 1..n = cargos
    let charIndex = 0;
    let deleting = false;
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    const nextCargo = () => {
      phraseIndex =
        phraseIndex === 0
          ? 1
          : phraseIndex + 1 >= PHRASES.length
            ? 1
            : phraseIndex + 1;
    };

    const tick = () => {
      if (cancelled) return;
      const current = PHRASES[phraseIndex];

      if (!deleting) {
        charIndex++;
        setText(current.slice(0, charIndex)); // acumula letras (slice)

        if (charIndex < current.length) {
          timeout = setTimeout(
            tick,
            phraseIndex === 0 ? TYPE_NAME_MS : TYPE_ROLE_MS
          );
        } else {
          // Frase completa → pausa e depois apaga
          timeout = setTimeout(
            () => {
              if (cancelled) return;
              deleting = true;
              timeout = setTimeout(tick, DELETE_MS);
            },
            phraseIndex === 0 ? NAME_HOLD : ROLE_HOLD
          );
        }
      } else {
        charIndex--;
        setText(current.slice(0, charIndex));

        if (charIndex > 0) {
          timeout = setTimeout(tick, DELETE_MS);
        } else {
          // Frase apagada → avança para a próxima
          deleting = false;
          const wasName = phraseIndex === 0;
          nextCargo();
          if (wasName) setShowingName(false);
          timeout = setTimeout(tick, wasName ? 300 : 220);
        }
      }
    };

    timeout = setTimeout(tick, 400);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] font-extrabold leading-tight mb-2 text-foreground min-h-[1.2em]">
      {showingName ? (
        <span>
          Olá, eu sou{" "}
          <span id="typewriter" className="text-neon">
            {text}
          </span>
        </span>
      ) : (
        <span className="text-neon">{text}</span>
      )}
      <span className="cursor" aria-hidden="true">
        |
      </span>
    </h1>
  );
}
