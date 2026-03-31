import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ModeProvider, useMode } from "@/context/ModeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HackerMode from "./components/terminal/HackerMode";
import FloatingModeSwitch from "./components/FloatingModeSwitch";

const queryClient = new QueryClient();

const AppContent = () => {
  const { mode, transitioning } = useMode();

  return (
    <div
      className={`transition-opacity duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`}
      style={{ minHeight: "100vh" }}
    >
      {mode === "hacker" ? (
        <HackerMode />
      ) : (
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      )}
      {mode !== "hacker" && <FloatingModeSwitch />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ModeProvider>
        <AppContent />
      </ModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
