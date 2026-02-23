import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "@/assets/profile-new.png";
import { 
  Cloud, Network, Brain, FileCode, Database, Shield, Cpu, Lightbulb,
  Code2, Camera, Palette, Server
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const GRID_COLS = 5;
const GRID_ROWS = 5;

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = imageContainerRef.current;
    if (!section || !container) return;

    const pieces = container.querySelectorAll<HTMLDivElement>(".shatter-piece");

    // Set initial scattered state
    pieces.forEach((piece) => {
      gsap.set(piece, {
        opacity: 0,
        scale: 0.3,
        x: gsap.utils.random(-200, 200),
        y: gsap.utils.random(-200, 200),
        rotation: gsap.utils.random(-90, 90),
        filter: "blur(8px)",
      });
    });

    // Animate pieces joining together on scroll
    gsap.to(pieces, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
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
      ease: "power3.out",
    });

    gsap.from(".about-content", {
      scrollTrigger: { trigger: section, start: "top 70%" },
      opacity: 0, x: 60, filter: "blur(10px)", duration: 1, ease: "power3.out"
    });
  }, []);

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

  // Generate grid pieces
  const pieces = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const xPercent = (col / GRID_COLS) * 100;
      const yPercent = (row / GRID_ROWS) * 100;
      const wPercent = 100 / GRID_COLS;
      const hPercent = 100 / GRID_ROWS;
      pieces.push(
        <div
          key={`${row}-${col}`}
          className="shatter-piece absolute overflow-hidden"
          style={{
            left: `${xPercent}%`,
            top: `${yPercent}%`,
            width: `${wPercent}%`,
            height: `${hPercent}%`,
          }}
        >
          <img
            src={profileImage}
            alt="Rohit Sen"
            className="absolute w-full h-full object-cover"
            style={{
              /* Position the full image so this piece shows the correct portion */
              width: `${GRID_COLS * 100}%`,
              height: `${GRID_ROWS * 100}%`,
              left: `${-col * 100}%`,
              top: `${-row * 100}%`,
              objectFit: "cover",
            }}
          />
        </div>
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
              className="relative w-[340px] h-[420px] mx-auto"
              style={{
                /* Blend edges with page background using mask */
                maskImage: "radial-gradient(ellipse 85% 85% at center, black 50%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 85% 85% at center, black 50%, transparent 100%)",
              }}
            >
              {pieces}
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