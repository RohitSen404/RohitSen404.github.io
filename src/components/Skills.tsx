import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Shield, 
  Camera, 
  Palette, 
  MessageCircle, 
  Network, 
  Cpu, 
  Database, 
  Cloud, 
  Brain, 
  FileCode, 
  Server 
} from "lucide-react";

const Skills = () => {
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
      id="skills"
      className="relative py-20 px-4 bg-background"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-cyan">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground text-lg">
            Technical and creative abilities I've developed over the years
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-card ${skill.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {skill.name}
                  </h3>
                  <Badge variant="secondary" className="ml-auto">
                    {skill.level}%
                  </Badge>
                </div>
                <Progress value={skill.level} className="h-2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
