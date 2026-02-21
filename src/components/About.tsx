import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "@/assets/profile.jpg";
import { 
  Cloud, Network, Brain, FileCode, Database, Shield, Cpu, Lightbulb,
  Code2, Camera, Palette, Server
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.from(".about-image", {
      scrollTrigger: { trigger: section, start: "top 70%" },
      opacity: 0, x: -60, filter: "blur(10px)", duration: 1, ease: "power3.out"
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

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-5" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="about-image">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary/60 transition-all group-hover:scale-105 duration-500">
                <img src={profileImage} alt="Rohit Sen" className="w-full h-full object-cover" />
              </div>
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