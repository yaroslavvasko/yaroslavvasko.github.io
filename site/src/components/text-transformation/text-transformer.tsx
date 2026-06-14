import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_SPECIALS = "#&*@!%$?~^+-=<>¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?";

export type TextTransformerProps = {
  sentences?: string[];
  specials?: string;
  speed?: number;
  pauseMs?: number;
  loop?: boolean;
  className?: string;
  glitchPercentage?: number; // 0 to 100, chance for each letter to glitch on each tick (default: 20)
};

/**
 * AnimatedText
 *
 * Props:
 *   sentences    string[]   — ordered list of sentences to cycle through
 *   specials     string     — pool of glitch characters (default: "#&*@!%$?~^+-=<>")
 *   speed        number     — ms between animation ticks (default: 60)
 *   pauseMs      number     — ms to hold a fully-resolved sentence (default: 1200)
 *   loop         boolean    — restart after the last sentence (default: true)
 *   className    string     — applied to the outer <span>
 */
export default function TextTransformer({
  sentences = [],
  specials = DEFAULT_SPECIALS,
  speed = 60,
  pauseMs = 2000,
  loop = true,
  className = "",
  glitchPercentage = 30,
}: TextTransformerProps) {
  const [chars, setChars] = useState<string[]>(
    () => sentences[0]?.split("") ?? [],
  );
  const [glitched, setGlitched] = useState<Set<number>>(new Set<number>());
  const [currentIndex, setCurrentIndex] = useState(0);

  const timerRef = useRef<number | null>(null);
  const pauseRef = useRef<number | null>(null);

  const randomSpecial = useCallback(() => {
    return specials[Math.floor(Math.random() * specials.length)];
  }, [specials]);

  const letterIndices = useCallback((sentence: string): number[] => {
    return sentence.split("").flatMap((character, index) => {
      const isVisibleLetter =
        character.trim().length > 0 &&
        ![",", ".", "!", "?"].includes(character);

      return isVisibleLetter ? [index] : [];
    });
  }, []);

  const startTransition = useCallback(
    function startTransition(fromIdx: number, toIdx: number) {
      const from = sentences[fromIdx] ?? "";
      const to = sentences[toIdx] ?? "";
      const maxLen = Math.max(from.length, to.length);

      const currentChars = [...from.padEnd(maxLen)];
      const fromLetters = letterIndices(from.padEnd(maxLen));
      const toLetters = letterIndices(to.padEnd(maxLen));
      const allLetters = [...new Set([...fromLetters, ...toLetters])];
      const shuffled = [...allLetters].sort(() => Math.random() - 0.5);

      let scrambleIdx = 0;
      let unscrambleIdx = 0;
      let phase: "scramble" | "resolve" = "scramble";
      const glitchedIndices = new Set<number>();

      setChars(currentChars);
      setGlitched(new Set<number>());

      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }

      timerRef.current = window.setInterval(() => {
        if (phase === "scramble") {
          if (scrambleIdx < shuffled.length * (glitchPercentage / 100)) {
            glitchedIndices.add(shuffled[scrambleIdx++]);
          } else {
            phase = "resolve";
          }
        }

        if (phase === "resolve") {
          if (unscrambleIdx < shuffled.length) {
            const idx = shuffled[unscrambleIdx++];
            glitchedIndices.delete(idx);
            currentChars[idx] = to[idx] ?? " ";
          } else {
            if (timerRef.current !== null) {
              window.clearInterval(timerRef.current);
              timerRef.current = null;
            }

            const finalChars = [...to];
            setChars(finalChars);
            setGlitched(new Set<number>());
            setCurrentIndex(toIdx);

            const nextIdx = (toIdx + 1) % sentences.length;
            const shouldContinue = loop || toIdx < sentences.length - 1;

            if (shouldContinue) {
              if (pauseRef.current !== null) {
                window.clearTimeout(pauseRef.current);
              }

              pauseRef.current = window.setTimeout(() => {
                setCurrentIndex(toIdx);
                startTransition(toIdx, nextIdx);
              }, pauseMs);
            }
            return;
          }
        }

        setChars([...currentChars]);
        setGlitched(new Set(glitchedIndices));
      }, speed);
    },
    [sentences, speed, pauseMs, loop, letterIndices],
  );

  useEffect(() => {
    if (sentences.length < 2) {
      return;
    }

    setCurrentIndex(0);
    setChars([...sentences[0]]);
    setGlitched(new Set<number>());

    if (pauseRef.current !== null) {
      window.clearTimeout(pauseRef.current);
    }

    pauseRef.current = window.setTimeout(() => {
      startTransition(0, 1);
    }, pauseMs);

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }

      if (pauseRef.current !== null) {
        window.clearTimeout(pauseRef.current);
        pauseRef.current = null;
      }
    };
  }, [pauseMs, sentences, startTransition]);

  return (
    <p className={className} aria-label={sentences[currentIndex] ?? ""}>
      {chars.map((char, index) =>
        glitched.has(index) ? (
          <span
            key={`${char}-${index}`}
            className="text-primary"
            aria-hidden="true"
          >
            {randomSpecial()}
          </span>
        ) : (
          <span key={`${char}-${index}`}>{char}</span>
        ),
      )}
    </p>
  );
}
