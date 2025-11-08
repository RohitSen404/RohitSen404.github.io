import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack online shopping platform with payment integration, user authentication, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      codeUrl: "https://github.com/yourusername/project1",
      liveUrl: "https://project1-demo.com",
    },
    {
      title: "Security Audit Tool",
      description: "Automated vulnerability scanner for web applications with detailed reporting and remediation suggestions.",
      technologies: ["Python", "Flask", "SQLite", "BeautifulSoup"],
      codeUrl: "https://github.com/yourusername/project2",
      liveUrl: "https://project2-demo.com",
    },
    {
      title: "Photography Portfolio",
      description: "Responsive portfolio website showcasing photography work with gallery, blog, and contact features.",
      technologies: ["React", "Tailwind CSS", "Firebase", "Framer Motion"],
      codeUrl: "https://github.com/yourusername/project3",
      liveUrl: "https://project3-demo.com",
    },
    {
      title: "Design System Library",
      description: "Comprehensive UI component library with customizable themes and extensive documentation.",
      technologies: ["TypeScript", "Storybook", "CSS-in-JS", "Vite"],
      codeUrl: "https://github.com/yourusername/project4",
      liveUrl: "https://project4-demo.com",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-purple">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            A collection of my best work and personal projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="project-card glass-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-secondary/20 text-secondary-foreground"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  asChild
                >
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </Button>
                <Button
                  size="sm"
                  className="flex items-center gap-2"
                  asChild
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
