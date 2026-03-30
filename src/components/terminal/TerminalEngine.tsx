import { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { executeCommand, CommandOutput } from "./commands";
import { useMode } from "@/context/ModeContext";

interface TerminalLine {
  text: string;
  color?: string;
  isPrompt?: boolean;
}

const PROMPT = "rohit@portfolio:~$ ";

const AUTO_COMMANDS = ["whoami", "about", "projects", "skills"];

const TerminalEngine = () => {
  const { toggleMode } = useMode();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [autoPhase, setAutoPhase] = useState(true);
  const [idleTimer, setIdleTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  useEffect(scrollToBottom, [lines, input, scrollToBottom]);

  const typeOutputLines = useCallback(
    async (outputs: CommandOutput[]): Promise<void> => {
      for (const out of outputs) {
        if (abortRef.current) return;
        if (out.delay) {
          await new Promise((r) => setTimeout(r, out.delay));
        }
        const text = out.text;
        if (text.length === 0) {
          setLines((prev) => [...prev, { text: "", color: out.color }]);
        } else {
          setLines((prev) => [...prev, { text: "", color: out.color }]);
          for (let i = 0; i < text.length; i++) {
            if (abortRef.current) return;
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
    },
    []
  );

  // Simulate typing a command character by character into the input
  const simulateTyping = useCallback(
    async (cmd: string): Promise<void> => {
      for (let i = 0; i < cmd.length; i++) {
        if (abortRef.current) return;
        const partial = cmd.slice(0, i + 1);
        setInput(partial);
        await new Promise((r) => setTimeout(r, 30 + Math.random() * 50));
      }
    },
    []
  );

  // Run auto command sequence
  useEffect(() => {
    if (!autoPhase) return;
    abortRef.current = false;
    setIsProcessing(true);

    const run = async () => {
      // Initial delay before auto-sequence starts
      await new Promise((r) => setTimeout(r, 600));

      for (const cmd of AUTO_COMMANDS) {
        if (abortRef.current) return;

        // Random pre-typing pause
        await new Promise((r) => setTimeout(r, 400 + Math.random() * 800));

        // Simulate typing the command
        await simulateTyping(cmd);

        // Small pause before "pressing enter"
        await new Promise((r) => setTimeout(r, 200 + Math.random() * 300));

        // Commit the prompt line
        setLines((prev) => [...prev, { text: PROMPT + cmd, isPrompt: true }]);
        setInput("");

        // Execute and render output
        const { output } = executeCommand(cmd);
        if (output.length > 0) {
          await typeOutputLines(output);
        }
      }

      if (!abortRef.current) {
        setAutoPhase(false);
        setIsProcessing(false);
      }
    };

    run();

    return () => {
      abortRef.current = true;
    };
  }, [autoPhase, simulateTyping, typeOutputLines]);

  // Idle hint timer
  const resetIdleTimer = useCallback(() => {
    if (idleTimer) clearTimeout(idleTimer);
    if (autoPhase) return;
    const timer = setTimeout(() => {
      setLines((prev) => [
        ...prev,
        { text: "" },
        { text: '  💡 Type "help" to explore commands', color: "#008F11" },
        { text: "" },
      ]);
    }, 15000);
    setIdleTimer(timer);
  }, [idleTimer, autoPhase]);

  // Reset idle timer on user activity
  useEffect(() => {
    if (!autoPhase && !isProcessing) {
      resetIdleTimer();
    }
    return () => {
      if (idleTimer) clearTimeout(idleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPhase, isProcessing]);

  const handleSubmit = useCallback(() => {
    if (isProcessing || autoPhase) return;

    const cmd = input.trim();
    setLines((prev) => [...prev, { text: PROMPT + input, isPrompt: true }]);
    setInput("");

    if (cmd) {
      setHistory((prev) => [cmd, ...prev.slice(0, 49)]);
    }
    setHistoryIdx(-1);
    resetIdleTimer();

    const { output, special } = executeCommand(cmd);

    if (special === "clear") {
      setLines([]);
      return;
    }

    if (output.length > 0) {
      setIsProcessing(true);
      typeOutputLines(output).then(() => {
        setIsProcessing(false);
        if (special === "exit") {
          setTimeout(toggleMode, 600);
        }
      });
    } else if (special === "exit") {
      setTimeout(toggleMode, 300);
    }
  }, [input, isProcessing, autoPhase, typeOutputLines, toggleMode, resetIdleTimer]);

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

  const handleContainerClick = () => {
    if (!autoPhase) inputRef.current?.focus();
  };

  useEffect(() => {
    if (!isProcessing && !autoPhase) inputRef.current?.focus();
  }, [isProcessing, autoPhase]);

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

      {/* Active input / auto-typing line */}
      <div className="terminal-line flex items-center">
        <span style={{ color: "#00FF00" }}>{PROMPT}</span>
        <div className="relative flex-1">
          {autoPhase ? (
            <>
              <span className="terminal-auto-text">{input}</span>
              <span
                className="terminal-cursor"
                style={{ left: `${input.length}ch` }}
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalEngine;
