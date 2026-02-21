import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImage from "@/assets/profile.jpg";
import { 
  Code2, Database, Layout, Sparkles, Shield, Camera, Palette, 
  MessageCircle, Network, Cpu, Cloud, Brain, FileCode, Server 
} from "lucide-react";
gsap.registerPlugin(ScrollTrigger);
const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.from(".about-image", {
      scrollTrigger: {
        trigger: section,
        start: "top 70%"
      },
      opacity: 0,
      x: -60,
      filter: "blur(10px)",
      duration: 1,
      ease: "power3.out"
    });
    gsap.from(".about-content", {
      scrollTrigger: {
        trigger: section,
        start: "top 70%"
      },
      opacity: 0,
      x: 60,
      filter: "blur(10px)",
      duration: 1,
      ease: "power3.out"
    });
    gsap.from(".skill-icon", {
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 80%"
      },
      opacity: 0,
      y: 30,
      stagger: 0.08,
      duration: 0.5,
      ease: "back.out(1.7)"
    });
  }, []);
  const skills = [
    { icon: FileCode, name: "Python" },
    { icon: Network, name: "Networking" },
    { icon: Cpu, name: "IoT" },
    { icon: Database, name: "DBMS" },
    { icon: Cloud, name: "Oracle Cloud" },
    { icon: Brain, name: "AI Foundation" },
    { icon: Server, name: "Azure" },
    { icon: Code2, name: "Web Dev" },
    { icon: Shield, name: "Ethical Hacking" },
    { icon: Camera, name: "Photography" },
    { icon: Palette, name: "Art & Design" },
    { icon: MessageCircle, name: "Communication" },
  ];
  return <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float"></div>

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="about-image">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary/60 transition-all group-hover:scale-105 duration-500">
                <img src={profileImage} alt="Rohit Sen" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="about-content space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold glow-text-cyan">
              About Me
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">I’m Rohit Sen, a passionate Computer Science student and aspiring ethical hacker currently pursuing my Diploma in Computer Science and Technology at Nalhati Government Polytechnic.

I specialize in web development, cybersecurity fundamentals, and creative problem-solving, blending logic with design to craft projects that are both functional and visually striking. My goal is to build secure, efficient, and human-centered digital experiences — from responsive websites to innovative tech experiments.

Beyond code, I’m also a mobile photographer and digital artist, bringing a creative edge to my technical work. I believe every great interface tells a story — and I aim to make mine both meaningful and memorable.

💡 Core Skills: HTML, CSS, JavaScript, Python, Linux, Networking, UI/UX Design
⚡ Interests: Ethical Hacking, Web Security, System Design, Open Source Projects</p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Oracle Certified AI Foundations Associate and Python Programming specialist with hands-on 
              experience in building cutting-edge web solutions.
            </p>

            {/* Skills Grid */}
            <div className="skills-grid grid grid-cols-3 sm:grid-cols-4 gap-3 pt-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={index} className="skill-icon skill-card p-4 rounded-lg transition-all duration-300 cursor-pointer">
                    <Icon className="w-7 h-7 mb-2 transition-colors duration-300 skill-card-icon" strokeWidth={1.5} />
                    <p className="text-xs font-medium text-muted-foreground">{skill.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;