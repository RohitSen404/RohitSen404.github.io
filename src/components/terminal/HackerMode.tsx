import { useState, useCallback } from "react";
import { useMode } from "@/context/ModeContext";
import TerminalBoot from "./TerminalBoot";
import TerminalEngine from "./TerminalEngine";

const HackerMode = () => {
  const { toggleMode } = useMode();
  const [booted, setBooted] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  const handleExit = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    // Small delay then switch mode
    setTimeout(toggleMode, 800);
  }, [exiting, toggleMode]);

  return (
    <div className="terminal-screen">
      {/* Fake OS top bar */}
      <div className="terminal-topbar">
        <button
          onClick={handleExit}
          className="terminal-exit-btn"
        >
          Exit
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExit}
            className="terminal-dot terminal-dot-exit"
            style={{ background: "#FF5F57" }}
            aria-label="Exit terminal"
          />
          <span className="terminal-dot" style={{ background: "#FEBC2E" }} />
          <span className="terminal-dot" style={{ background: "#28C840" }} />
        </div>
        <span className="terminal-topbar-title">rohit@portfolio: ~</span>
      </div>

      {/* Terminal body */}
      <div className="terminal-body">
        {!booted ? (
          <TerminalBoot onComplete={handleBootComplete} />
        ) : (
          <TerminalEngine />
        )}
      </div>

      {/* Scanline overlay */}
      <div className="terminal-scanlines" />
    </div>
  );
};

export default HackerMode;
