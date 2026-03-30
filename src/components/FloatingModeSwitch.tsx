import { useMode } from "@/context/ModeContext";

const FloatingModeSwitch = () => {
  const { mode, toggleMode } = useMode();
  const isHacker = mode === "hacker";

  return (
    <button
      onClick={toggleMode}
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-[9999] px-4 py-3 rounded-full font-mono text-xs tracking-wider transition-all duration-300 border ${
        isHacker
          ? "bg-black/80 text-[#00FF00] border-[#00FF00]/40 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] hover:border-[#00FF00]/70"
          : "bg-background/80 backdrop-blur-sm text-foreground border-border hover:border-primary hover:shadow-[0_0_20px_hsl(42_50%_57%/0.3)]"
      }`}
      style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
    >
      {isHacker ? "EXIT TERMINAL" : "ENTER TERMINAL"}
    </button>
  );
};

export default FloatingModeSwitch;
