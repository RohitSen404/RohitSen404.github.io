import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Progress } from "@/components/ui/progress";
import { Code, Shield, Camera, Palette, MessageCircle, Network, Cpu, Database, Cloud, Brain, FileCode, Server } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    { name: "Python Programming", level: 90, icon: FileCode, color: "text-primary" },
    { name: "Advance Computer Network", level: 85, icon: Network, color: "text-secondary" },
    { name: "Internet of Things (IoT)", level: 82, icon: Cpu, color: "text-accent" },
    { name: "Database Management System (DBMS)", level: 88, icon: Database, color: "text-primary" },
    { name: "Oracle Cloud Infrastructure (OCI)", level: 87, icon: Cloud, color: "text-secondary" },
    { name: "AI Foundation", level: 85, icon: Brain, color: "text-accent" },
    { name: "Microsoft Azure", level: 83, icon: Server, color: "text-primary" },
    { name: "Web Development", level: 88, icon: Code, color: "text-secondary" },
    { name: "Ethical Hacking", level: 85, icon: Shield, color: "text-accent" },
    { name: "Photography", level: 90, icon: Camera, color: "text-primary" },
    { name: "Art & Design", level: 82, icon: Palette, color: "text-secondary" },
    { name: "Communication", level: 92, icon: MessageCircle, color: "text-accent" },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-cyan">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg">
            Technical and creative abilities I've developed over the years
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="skill-item glass-card p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className={`w-6 h-6 ${skill.color}`} />
                  <h3 className="text-xl font-semibold text-foreground">
                    {skill.name}
                  </h3>
                </div>
                <Progress value={skill.level} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2 text-right">
                  {skill.level}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
