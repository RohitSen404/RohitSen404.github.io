import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "@/assets/profile-new.png";
import { 
  Cloud, Network, Brain, FileCode, Database, Shield, Cpu, Lightbulb,
  Code2, Camera, Palette, Server
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const GRID_COLS = 4;
const GRID_ROWS = 5;

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isAssembled, setIsAssembled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const hoverTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = imageContainerRef.current;
    if (!section || !container) return;

    const pieces = container.querySelectorAll<HTMLDivElement>(".shatter-piece");

    const randoms = Array.from(pieces).map(() => ({
      x: gsap.utils.random(-400, 400),
      y: gsap.utils.random(-400, 400),
      rotation: gsap.utils.random(-180, 180),
      scale: gsap.utils.random(0.15, 0.4),
    }));

    // Set initial scattered state
    pieces.forEach((piece, i) => {
      gsap.set(piece, {
        opacity: 0,
        scale: randoms[i].scale,
        x: randoms[i].x,
        y: randoms[i].y,
        rotation: randoms[i].rotation,
        filter: "blur(8px)",
      });
    });

    // Slow scroll assembly animation
    const scrollTween = gsap.to(pieces, {
      scrollTrigger: {
        trigger: section,
        start: "top 95%",
        end: "top 5%",
        scrub: 3,
        onUpdate: (self) => {
          setIsAssembled(self.progress > 0.95);
        },
      },
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
      filter: "blur(0px)",
      stagger: {
        each: 0.03,
        from: "center",
      },
      ease: "none",
    });

    gsap.from(".about-content", {
      scrollTrigger: { trigger: section, start: "top 70%" },
      opacity: 0, x: 60, filter: "blur(10px)", duration: 1, ease: "power3.out"
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Mouse hover shatter/reassemble effect
  const handleMouseEnter = () => {
    if (!isAssembled) return;
    setIsHovering(true);
    const container = imageContainerRef.current;
    if (!container) return;
    const pieces = container.querySelectorAll<HTMLDivElement>(".shatter-piece");

    if (hoverTweenRef.current) hoverTweenRef.current.kill();

    hoverTweenRef.current = gsap.to(pieces, {
      x: () => gsap.utils.random(-200, 200),
      y: () => gsap.utils.random(-200, 200),
      rotation: () => gsap.utils.random(-90, 90),
      scale: () => gsap.utils.random(0.4, 0.7),
      opacity: 0.6,
      filter: "blur(4px)",
      duration: 0.8,
      stagger: { each: 0.015, from: "edges" },
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!isAssembled) return;
    setIsHovering(false);
    const container = imageContainerRef.current;
    if (!container) return;
    const pieces = container.querySelectorAll<HTMLDivElement>(".shatter-piece");

    if (hoverTweenRef.current) hoverTweenRef.current.kill();

    hoverTweenRef.current = gsap.to(pieces, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      stagger: { each: 0.02, from: "center" },
      ease: "elastic.out(1, 0.5)",
    });
  };

  const skills = [
    { icon: Cloud, name: "Cloud Computing" },
    { icon: Network, name: "Networking" },
    { icon: Brain, name: "AI Foundations" },
    { icon: FileCode, name: "Python" },
    { icon: Database, name: "DBMS" },
    { icon: Shield, name: "Ethical Hacking" },
    { icon: Cpu, name: "IoT" },
    { icon: Lightbulb, name: "Problem Solving" },
    { icon: Code2, name: "Web Dev" },
    { icon: Server, name: "Azure" },
    { icon: Camera, name: "Photography" },
    { icon: Palette, name: "Art & Design" },
  ];

  const gridPieces = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const xPercent = (col / GRID_COLS) * 100;
      const yPercent = (row / GRID_ROWS) * 100;
      const wPercent = 100 / GRID_COLS;
      const hPercent = 100 / GRID_ROWS;
      gridPieces.push(
        <div
          key={`${row}-${col}`}
          className="shatter-piece absolute"
          style={{
            left: `${xPercent}%`,
            top: `${yPercent}%`,
            width: `${wPercent}%`,
            height: `${hPercent}%`,
            backgroundImage: `url(${profileImage})`,
            backgroundSize: `${GRID_COLS * 100}% ${GRID_ROWS * 100}%`,
            backgroundPosition: `${(col / (GRID_COLS - 1)) * 100}% ${(row / (GRID_ROWS - 1)) * 100}%`,
          }}
        />
      );
    }
  }

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Shattered Image */}
          <div className="about-image flex items-center justify-center">
            <div
              ref={imageContainerRef}
              className="relative w-[320px] h-[600px] mx-auto cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                maskImage: "radial-gradient(ellipse 95% 95% at center, black 65%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 95% 95% at center, black 65%, transparent 100%)",
              }}
            >
              {gridPieces}
              {/* Glow overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-full"
                style={{
                  background: "radial-gradient(ellipse at center, hsl(228 100% 62% / 0.08) 0%, hsl(42 50% 57% / 0.05) 40%, transparent 70%)",
                  mixBlendMode: "screen",
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="about-content space-y-5">
            <h2 className="text-4xl md:text-5xl font-bold glow-text-cyan">About Me</h2>

            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              I am a Computer Science & Technology diploma student with strong skills in{' '}
              <span className="text-primary font-semibold">Cloud Computing</span>,{' '}
              <span className="text-primary font-semibold">Networking</span>, and I'm{' '}
              <strong className="text-foreground">OCI Certified AI Foundations Associate</strong>.
              I have hands-on experience as an intern at Ardent Private Limited.
            </p>

            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              My interests include{' '}
              <strong className="text-foreground">ethical hacking</strong> and{' '}
              <strong className="text-foreground">problem-solving</strong>.
              I aim to grow as a professional in computer science and AI-driven technologies,
              while continuously upgrading my technical and analytical skills.
            </p>

            {/* Skills Icon Grid */}
            <div className="skills-grid grid grid-cols-4 gap-3 pt-4">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={index} className="skill-icon skill-card p-4 rounded-lg flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer">
                    <Icon className="w-7 h-7 mb-2 skill-card-icon transition-colors duration-300" strokeWidth={1.5} />
                    <p className="text-[11px] font-medium text-muted-foreground leading-tight">{skill.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
