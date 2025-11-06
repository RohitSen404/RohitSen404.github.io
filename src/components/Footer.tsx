import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    gsap.from(".footer-content", {
      scrollTrigger: {
        trigger: footer,
        start: "top 90%",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out"
    });

  }, []);

  return (
    <footer ref={footerRef} className="relative py-12 border-t border-border/30 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      
      {/* Floating particles */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-[60px] animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-[60px] animate-float" style={{ animationDelay: "1s" }}></div>

      <div className="footer-content container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo/Name */}
          <div>
            <h3 className="text-2xl font-bold glow-text-cyan">Rohit Sen</h3>
            <p className="text-sm text-muted-foreground mt-1">Web Developer & Creative Technologist</p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:contact@rohit.dev"
              className="w-10 h-10 rounded-full bg-muted/30 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all hover:scale-110"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 pt-6 border-t border-border/30">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-primary animate-glow-pulse" /> by Rohit Sen © 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
