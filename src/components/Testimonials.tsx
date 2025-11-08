import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Professor, Computer Science",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      quote: "An exceptional student who consistently demonstrates creativity, technical prowess, and a genuine passion for learning. Their work ethic is truly inspiring.",
    },
    {
      name: "Michael Chen",
      role: "Team Lead, Tech Solutions",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      quote: "Working with them has been a pleasure. They bring innovative ideas to the table and have excellent problem-solving skills. A true team player.",
    },
    {
      name: "Emily Rodriguez",
      role: "Creative Director",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      quote: "Their artistic vision combined with technical skills is remarkable. They have an eye for detail and consistently deliver high-quality work that exceeds expectations.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-20 px-4 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute bottom-40 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />

      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text-cyan">
            Testimonials
          </h2>
          <p className="text-muted-foreground text-lg">
            What people say about working with me
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="testimonial-card glass-card border-border/50 hover:border-secondary/50 transition-all duration-300 hover:scale-105"
            >
              <CardContent className="pt-6">
                <Quote className="w-8 h-8 text-primary/40 mb-4" />
                <p className="text-foreground/90 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
