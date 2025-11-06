import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    
    tl.from(".hero-title", {
      opacity: 0,
      y: 50,
      filter: "blur(10px)",
      duration: 1,
      ease: "power3.out"
    })
    .from(".hero-subtitle", {
      opacity: 0,
      y: 30,
      filter: "blur(8px)",
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .from(".hero-cta", {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .from(".hero-social", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5
    }, "-=0.4");

    // Floating animation for spline container
    gsap.to(".spline-container", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-10"></div>
      
      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      
      {/* Spline 3D Background */}
      <div className="spline-container absolute inset-0 z-0 opacity-60">
        <iframe 
          src='https://my.spline.design/orb-eH07laIV825z1Nm7hRvXKt2S/' 
          className="w-full h-full"
          title="3D Background"
        />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/15 rounded-full blur-[140px] animate-float" style={{ animationDelay: "1.5s" }}></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          Hi, I'm <span className="glow-text-cyan">Rohit</span>
        </h1>
        
        <p className="hero-subtitle text-xl md:text-3xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Web Developer & Creative Technologist
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground glow-border-cyan group px-8 py-6 text-lg"
            onClick={scrollToContact}
          >
            <span className="group-hover:scale-110 inline-block transition-transform">
              Hire Me
            </span>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-primary/50 hover:bg-primary/10 text-foreground px-8 py-6 text-lg"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Work
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hero-social">
            <Button size="icon" variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-all hover:scale-110">
              <Github className="w-6 h-6" />
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/rohit-sen-941a9b256" target="_blank" rel="noopener noreferrer" className="hero-social">
            <Button size="icon" variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-all hover:scale-110">
              <Linkedin className="w-6 h-6" />
            </Button>
          </a>
          <a href="mailto:contact@rohit.dev" className="hero-social">
            <Button size="icon" variant="ghost" className="hover:bg-primary/10 hover:text-primary transition-all hover:scale-110">
              <Mail className="w-6 h-6" />
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full p-1">
          <div className="w-1 h-3 bg-primary rounded-full mx-auto animate-glow-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
