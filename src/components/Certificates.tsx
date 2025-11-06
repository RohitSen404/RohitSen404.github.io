import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cert1 from "@/assets/certificate-1.png";
import cert2 from "@/assets/certificate-2.png";
import cert3 from "@/assets/certificate-3.png";
import { Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from(".cert-card", {
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
      },
      opacity: 0,
      y: 60,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out"
    });

  }, []);

  const certificates = [
    {
      image: cert1,
      title: "Python Bootcamp",
      description: "LetsUpgrade - Python programming certification with hands-on projects",
      tech: ["Python", "Programming", "Projects"]
    },
    {
      image: cert2,
      title: "Oracle AI Foundations",
      description: "Oracle certified in AI and Cloud Infrastructure fundamentals",
      tech: ["AI", "Cloud", "Oracle"]
    },
    {
      image: cert3,
      title: "Industrial Internship",
      description: "Python programming internship with Voting Management System project",
      tech: ["Python", "Django", "Development"]
    }
  ];

  return (
    <section id="certificates" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "1s" }}></div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold glow-text-cyan mb-4">
            Certificates
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional certifications and achievements
          </p>
        </div>

        {/* Horizontal scroll container */}
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
          {certificates.map((cert, index) => (
            <div 
              key={index}
              className="cert-card flex-shrink-0 w-[90vw] md:w-[500px] snap-center"
            >
              <div className="glass-card rounded-2xl overflow-hidden group hover:glow-border-cyan transition-all duration-500 h-full">
                {/* Image */}
                <div className="relative overflow-hidden h-64 bg-muted/20">
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <h3 className="text-2xl font-bold group-hover:glow-text-cyan transition-all">
                      {cert.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground">
                    {cert.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {cert.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
