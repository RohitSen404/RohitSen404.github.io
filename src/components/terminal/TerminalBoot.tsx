import { useEffect, useRef, useState } from "react";

interface TerminalBootProps {
  onComplete: () => void;
}

const BOOT_SEQUENCE = [
  { text: "RohitOS v1.0 — Secure Boot", delay: 400 },
  { text: "", delay: 200 },
  { text: "Initializing kernel modules...", delay: 600 },
  { text: "Loading security protocols...", delay: 400 },
  { text: "__PROGRESS__", delay: 0 },
  { text: "", delay: 200 },
  { text: "Establishing encrypted connection...", delay: 800 },
  { text: "Authenticating user...", delay: 600 },
  { text: "", delay: 300 },
  { text: "Access granted.", delay: 500 },
  { text: "", delay: 200 },
  { text: "Type 'help' for available commands.", delay: 400 },
];

const TerminalBoot = ({ onComplete }: TerminalBootProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [progressText, setProgressText] = useState<string | null>(null);
  const abortRef = useRef(false);

  useEffect(() => {
    abortRef.current = false;

    const typeText = (text: string): Promise<string> => {
      return new Promise((resolve) => {
        let current = "";
        let i = 0;
        const type = () => {
          if (abortRef.current) return;
          if (i < text.length) {
            current += text[i];
            i++;
            setLines((prev) => {
              const next = [...prev];
              next[next.length - 1] = current;
              return next;
            });
            setTimeout(type, 20 + Math.random() * 40);
          } else {
            resolve(current);
          }
        };
        // Add empty line to type into
        setLines((prev) => [...prev, ""]);
        type();
      });
    };

    const runProgress = (): Promise<void> => {
      return new Promise((resolve) => {
        const steps = [10, 25, 40, 55, 70, 85, 100];
        let idx = 0;

        const renderBar = (pct: number) => {
          const filled = Math.round(pct / 5);
          const empty = 20 - filled;
          return `  [${"█".repeat(filled)}${"░".repeat(empty)}] ${pct}%`;
        };

        setProgressText(renderBar(0));

        const next = () => {
          if (abortRef.current) return;
          if (idx < steps.length) {
            setProgressText(renderBar(steps[idx]));
            idx++;
            setTimeout(next, 150 + Math.random() * 200);
          } else {
            // Commit progress line to lines
            setLines((prev) => [...prev, renderBar(100)]);
            setProgressText(null);
            resolve();
          }
        };
        setTimeout(next, 200);
      });
    };

    const run = async () => {
      for (const step of BOOT_SEQUENCE) {
        if (abortRef.current) return;

        if (step.text === "__PROGRESS__") {
          await runProgress();
        } else {
          await typeText(step.text);
        }

        if (step.delay > 0) {
          await new Promise((r) => setTimeout(r, step.delay));
        }
      }

      if (!abortRef.current) {
        setTimeout(onComplete, 800);
      }
    };

    run();

    return () => {
      abortRef.current = true;
    };
  }, [onComplete]);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, progressText]);

  return (
    <div ref={containerRef} className="terminal-text p-5 md:p-8 overflow-y-auto h-full">
      {lines.map((line, i) => (
        <div key={i} className="terminal-line">
          {line || "\u00A0"}
        </div>
      ))}
      {progressText && (
        <div className="terminal-line">{progressText}</div>
      )}
    </div>
  );
};

export default TerminalBoot;
