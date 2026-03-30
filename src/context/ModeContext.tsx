import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Mode = "hacker" | "normal";

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
  transitioning: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem("portfolio-mode");
    return saved === "normal" ? "normal" : "hacker";
  });
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    localStorage.setItem("portfolio-mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setTransitioning(true);
    setTimeout(() => {
      setMode((prev) => (prev === "hacker" ? "normal" : "hacker"));
      setTimeout(() => setTransitioning(false), 50);
    }, 300);
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode, transitioning }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error("useMode must be used within ModeProvider");
  return context;
};
