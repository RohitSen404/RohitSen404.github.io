import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const unicornRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load UnicornStudio script
    const existingScript = document.querySelector('script[src*="unicornStudio"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";
      script.onload = () => {
        (window as any).UnicornStudio?.init();
      };
      document.head.appendChild(script);
    } else {
      (window as any).UnicornStudio?.init();
    }

    // GSAP entrance animations
    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(".hero-title", { opacity: 0, y: 50, filter: "blur(10px)", duration: 1, ease: "power3.out" })
      .from(".hero-subtitle", { opacity: 0, y: 30, filter: "blur(8px)", duration: 0.8, ease: "power2.out" }, "-=0.5")
      .from(".hero-cta", { opacity: 0, scale: 0.8, duration: 0.6, ease: "back.out(1.7)" }, "-=0.3")
      .from(".hero-social", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, "-=0.4")
      .from(".hero-3d", { opacity: 0, scale: 1.05, duration: 1.2, ease: "power3.out" }, 0);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-[0.04]"></div>

      {/* UnicornStudio 3D Interactive Model */}
      <div className="hero-3d absolute inset-0 z-0">
        <div
          ref={unicornRef}
          data-us-project="0N8TXzXyp90TNK7JtIAs"
          style={{ width: "100%", height: "100%" }}
        ></div>
      </div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background via-background/70 to-background/20"></div>
      {/* Bottom fade to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-[350px] z-[2] bg-gradient-to-t from-background via-background/90 via-60% to-transparent"></div>

      {/* Atmospheric glows */}
      <div className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full blur-[200px] animate-float" style={{ background: 'rgba(63, 99, 255, 0.08)' }}></div>
      <div className="absolute bottom-20 right-40 w-[400px] h-[400px] rounded-full blur-[180px] animate-float" style={{ background: 'rgba(28, 47, 110, 0.12)', animationDelay: '1.5s' }}></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-2xl">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6" style={{ textShadow: '0 0 40px rgba(255,255,255,0.08)' }}>
            Hi, I'm <span className="hero-gradient-text">Rohit</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl mb-12 max-w-xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Web Developer & Creative Technologist
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 items-start mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground group px-8 py-6 text-lg border-0"
              style={{ boxShadow: '0 0 30px rgba(199, 168, 90, 0.25)' }}
              onClick={scrollToContact}
            >
              <span className="group-hover:scale-110 inline-block transition-transform">Hire Me</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/40 hover:bg-primary/10 px-8 py-6 text-lg"
              style={{ color: '#EDEFF5' }}
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Work
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            <a href="https://github.com/RohitSen404" target="_blank" rel="noopener noreferrer" className="hero-social">
              <Button size="icon" variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-all hover:scale-110">
                <Github className="w-6 h-6" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/rohit-sen-941a9b256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hero-social">
              <Button size="icon" variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-all hover:scale-110">
                <Linkedin className="w-6 h-6" />
              </Button>
            </a>
            <a href="mailto:rohitsen7501@gmail.com" className="hero-social">
              <Button size="icon" variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-all hover:scale-110">
                <Mail className="w-6 h-6" />
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-primary/40 rounded-full p-1">
          <div className="w-1 h-3 bg-primary/60 rounded-full mx-auto animate-glow-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
