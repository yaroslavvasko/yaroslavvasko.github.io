import React, { useState, useEffect, useRef } from "react";

const DEFAULT_SPECIALS = "#&*@!%$?~^+-=<>¡™£¢∞§¶•ªº–≠åß∂ƒ©˙∆˚¬…æ≈ç√∫˜µ≤≥÷/?░▒";
const getRandomCharacter = () =>
  DEFAULT_SPECIALS[Math.floor(Math.random() * DEFAULT_SPECIALS.length)];

export const Scramble: React.FC<{
  targetText: string;
  duration?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}> = ({
  targetText,
  duration = 1000,
  delay = 0,
  className = "",
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState(
    targetText.replace(/./g, () => getRandomCharacter()),
  );
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Gradually reveal correct characters
      const newText = targetText
        .split("")
        .map((char, index) => {
          const charProgress = (index + 1) / targetText.length;
          if (progress >= charProgress) {
            return char;
          }
          return char === " " ? " " : getRandomCharacter();
        })
        .join("");

      setDisplayedText(newText);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetText, duration, delay, onComplete]);

  return (
    <p className={className} aria-label={targetText ?? ""}>
      {displayedText.split("").map((char, index) =>
        DEFAULT_SPECIALS.includes(char) ? (
          <span
            key={`${char}-${index}`}
            className="text-primary"
            aria-hidden="true"
          >
            {char}
          </span>
        ) : (
          <span key={`${char}-${index}`}>{char}</span>
        ),
      )}
    </p>
  );
};
