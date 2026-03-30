import { useState, useCallback } from "react";
import TerminalBoot from "./TerminalBoot";
import TerminalEngine from "./TerminalEngine";

const HackerMode = () => {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <div className="terminal-screen">
      {/* Fake OS top bar */}
      <div className="terminal-topbar">
        <div className="flex items-center gap-2">
          <span className="terminal-dot" style={{ background: "#FF5F57" }} />
          <span className="terminal-dot" style={{ background: "#FEBC2E" }} />
          <span className="terminal-dot" style={{ background: "#28C840" }} />
        </div>
        <span className="terminal-topbar-title">rohit@kali: ~</span>
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
