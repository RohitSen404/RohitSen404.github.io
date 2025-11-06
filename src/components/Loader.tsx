import { useEffect, useState } from "react";
import { gsap } from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(".preloader", {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            onComplete();
          }
        });
      }
    });

    // Animate progress
    tl.to({}, {
      duration: 2.5,
      onUpdate: function() {
        const prog = Math.round(this.progress() * 100);
        setProgress(prog);
      }
    });

    // Animate logo text
    tl.from(".loader-text", {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: "power2.out"
    }, 0);

  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="absolute inset-0 grid-pattern opacity-20"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: "1s" }}></div>

      <div className="relative z-10 text-center">
        <h1 className="loader-text text-6xl md:text-8xl font-bold mb-8 glow-text-cyan">
          ROHIT
        </h1>
        
        {/* Progress bar */}
        <div className="w-64 md:w-96 h-1 bg-muted/30 rounded-full overflow-hidden mx-auto mb-4">
          <div 
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="text-muted-foreground font-mono text-sm">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Loader;
