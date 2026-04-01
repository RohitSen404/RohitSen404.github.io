import { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { executeCommand, CommandOutput } from "./commands";
import { useMode } from "@/context/ModeContext";

interface TerminalLine {
  text: string;
  color?: string;
  isPrompt?: boolean;
  isRootPrompt?: boolean;
}

const PROMPT_USER = "rohit@portfolio:~$ ";
const PROMPT_ROOT_PREFIX = "\x1Broot\x1B@rohit:~# ";

const AUTO_COMMANDS = ["whoami", "about", "projects", "skills"];

const GREEN = "#00FF00";
const DIM_GREEN = "#008F11";

const generateSessionInfo = (): CommandOutput[] => {
  const sessionId = `RS-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
  const ip = `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(1 + Math.random() * 254)}`;
  const port = 3000 + Math.floor(Math.random() * 6001);

  return [
    { text: "", delay: 200 },
    { text: "  > Initializing session...", color: DIM_GREEN, delay: 600 },
    { text: "  > Connecting...", color: DIM_GREEN, delay: 800 },
    { text: "" },
    { text: "  ┌─────────────────────────────────────────────┐", color: GREEN },
    { text: `  │  Session ID :  ${sessionId.padEnd(28)}│`, color: GREEN },
    { text: `  │  IP Address :  ${ip.padEnd(28)}│`, color: GREEN },
    { text: `  │  Port       :  ${String(port).padEnd(28)}│`, color: GREEN },
    { text: `  │  Status     :  ${"Connected".padEnd(28)}│`, color: GREEN },
    { text: "  └─────────────────────────────────────────────┘", color: GREEN },
    { text: "" },
  ];
};

const TerminalEngine = () => {
  const { toggleMode } = useMode();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [autoPhase, setAutoPhase] = useState(true);
  const [isRoot, setIsRoot] = useState(false);
  const [idleTimer, setIdleTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [runKey, setRunKey] = useState(0); // triggers restart
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef(false);

  const prompt = isRoot ? PROMPT_ROOT_PREFIX : PROMPT_USER;

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

  // Run auto command sequence (triggered by runKey)
  useEffect(() => {
    if (!autoPhase) return;
    abortRef.current = false;
    setIsProcessing(true);

    const run = async () => {
      await new Promise((r) => setTimeout(r, 600));

      // Session info
      const sessionLines = generateSessionInfo();
      await typeOutputLines(sessionLines);

      // Sudo
      await new Promise((r) => setTimeout(r, 400 + Math.random() * 600));
      await simulateTyping("sudo");
      await new Promise((r) => setTimeout(r, 200 + Math.random() * 300));
      setLines((prev) => [...prev, { text: PROMPT_USER + "sudo", isPrompt: true }]);
      setInput("");
      const { output: sudoOutput } = executeCommand("sudo");
      await typeOutputLines(sudoOutput);
      setIsRoot(true);

      // Auto commands
      for (const cmd of AUTO_COMMANDS) {
        if (abortRef.current) return;
        await new Promise((r) => setTimeout(r, 400 + Math.random() * 800));
        await simulateTyping(cmd);
        await new Promise((r) => setTimeout(r, 200 + Math.random() * 300));
        setLines((prev) => [...prev, { text: cmd, isPrompt: true, isRootPrompt: true }]);
        setInput("");
        const { output } = executeCommand(cmd);
        if (output.length > 0) {
          await typeOutputLines(output);
        }
      }

      if (!abortRef.current) {
        // Show hint after auto-run
        setLines((prev) => [
          ...prev,
          { text: "" },
          { text: '  💡 Type "clear" to reset  •  "start" to run again  •  "help" for all commands', color: DIM_GREEN },
          { text: "" },
        ]);
        setAutoPhase(false);
        setIsProcessing(false);
      }
    };

    run();
    return () => { abortRef.current = true; };
  }, [autoPhase, runKey, simulateTyping, typeOutputLines]);

  // Idle hint timer
  const resetIdleTimer = useCallback(() => {
    if (idleTimer) clearTimeout(idleTimer);
  }, [idleTimer]);

  useEffect(() => {
    if (!autoPhase && !isProcessing) resetIdleTimer();
    return () => { if (idleTimer) clearTimeout(idleTimer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPhase, isProcessing]);

  const handleSubmit = useCallback(() => {
    if (isProcessing || autoPhase) return;
    const cmd = input.trim();
    setLines((prev) => [
      ...prev,
      { text: cmd, isPrompt: true, isRootPrompt: isRoot },
    ]);
    setInput("");
    if (cmd) setHistory((prev) => [cmd, ...prev.slice(0, 49)]);
    setHistoryIdx(-1);
    resetIdleTimer();

    const { output, special } = executeCommand(cmd);

    if (special === "clear") { setLines([]); return; }
    if (special === "sudo") { setIsRoot(true); }
    if (special === "restart") {
      // Reset state and trigger full sequence again
      setLines([]);
      setIsRoot(false);
      setAutoPhase(true);
      setRunKey((k) => k + 1);
      return;
    }

    if (output.length > 0) {
      setIsProcessing(true);
      typeOutputLines(output).then(() => {
        setIsProcessing(false);
        if (special === "exit") setTimeout(toggleMode, 600);
      });
    } else if (special === "exit") {
      setTimeout(toggleMode, 300);
    }
  }, [input, isProcessing, autoPhase, isRoot, typeOutputLines, toggleMode, resetIdleTimer]);

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

  const renderPrompt = (root: boolean) => {
    if (root) {
      return (
        <>
          <span style={{ color: "#FF0033" }}>root</span>
          <span style={{ color: "#00FF00" }}>@rohit:~# </span>
        </>
      );
    }
    return <span style={{ color: "#00FF00" }}>{PROMPT_USER}</span>;
  };

  return (
    <div
      ref={containerRef}
      className="terminal-text p-5 md:p-8 overflow-y-auto h-full cursor-text"
      onClick={handleContainerClick}
    >
      {lines.map((line, i) => (
        <div key={i} className="terminal-line" style={{ color: line.color || (line.isPrompt ? "#00FF00" : undefined) }}>
          {line.isPrompt ? (
            <>
              {renderPrompt(!!line.isRootPrompt)}
              <span>{line.text}</span>
            </>
          ) : (
            line.text || "\u00A0"
          )}
        </div>
      ))}

      {/* Active input line */}
      <div className="terminal-line flex items-center">
        {renderPrompt(isRoot)}
        <div className="relative flex-1">
          {autoPhase ? (
            <>
              <span className="terminal-auto-text">{input}</span>
              <span className="terminal-cursor" style={{ left: `${input.length}ch` }} />
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
                <span className="terminal-cursor" style={{ left: `${input.length}ch` }} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TerminalEngine;
