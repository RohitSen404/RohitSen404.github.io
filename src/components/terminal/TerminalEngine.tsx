import { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { executeCommand, CommandOutput } from "./commands";
import { useMode } from "@/context/ModeContext";

interface TerminalLine {
  text: string;
  color?: string;
  isPrompt?: boolean;
}

const PROMPT = "rohit@portfolio:~$ ";

const TerminalEngine = () => {
  const { toggleMode } = useMode();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  useEffect(scrollToBottom, [lines, scrollToBottom]);

  const typeOutputLines = useCallback(
    async (outputs: CommandOutput[], onDone: () => void) => {
      for (const out of outputs) {
        if (out.delay) {
          await new Promise((r) => setTimeout(r, out.delay));
        }

        // Type character by character
        const text = out.text;
        if (text.length === 0) {
          setLines((prev) => [...prev, { text: "", color: out.color }]);
        } else {
          // Add empty line then fill it
          setLines((prev) => [...prev, { text: "", color: out.color }]);
          for (let i = 0; i < text.length; i++) {
            const partial = text.slice(0, i + 1);
            setLines((prev) => {
              const next = [...prev];
              next[next.length - 1] = { text: partial, color: out.color };
              return next;
            });
            await new Promise((r) => setTimeout(r, 8 + Math.random() * 15));
          }
        }
      }
      onDone();
    },
    []
  );

  const handleSubmit = useCallback(() => {
    if (isProcessing) return;

    const cmd = input.trim();

    // Add prompt + command to output
    setLines((prev) => [...prev, { text: PROMPT + input, isPrompt: true }]);
    setInput("");

    if (cmd) {
      setHistory((prev) => [cmd, ...prev.slice(0, 49)]);
    }
    setHistoryIdx(-1);

    const { output, special } = executeCommand(cmd);

    if (special === "clear") {
      setLines([]);
      return;
    }

    if (output.length > 0) {
      setIsProcessing(true);
      typeOutputLines(output, () => {
        setIsProcessing(false);
        if (special === "exit") {
          setTimeout(toggleMode, 600);
        }
      });
    } else if (special === "exit") {
      setTimeout(toggleMode, 300);
    }
  }, [input, isProcessing, typeOutputLines, toggleMode]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  // Focus input on click anywhere
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isProcessing]);

  return (
    <div
      ref={containerRef}
      className="terminal-text p-5 md:p-8 overflow-y-auto h-full cursor-text"
      onClick={handleContainerClick}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className="terminal-line"
          style={{ color: line.color || (line.isPrompt ? "#00FF00" : undefined) }}
        >
          {line.text || "\u00A0"}
        </div>
      ))}

      {/* Active input line */}
      <div className="terminal-line flex items-center">
        <span style={{ color: "#00FF00" }}>{PROMPT}</span>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className="terminal-input"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {!isProcessing && (
            <span
              className="terminal-cursor"
              style={{ left: `${input.length}ch` }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalEngine;
