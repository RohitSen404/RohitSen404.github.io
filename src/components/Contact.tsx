import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from(".contact-input", {
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
      },
      opacity: 0,
      x: -40,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.from(".contact-submit", {
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: 0.4,
      ease: "back.out(1.7)"
    });

  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!", {
      description: "I'll get back to you soon!"
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-5"></div>
      
      {/* Floating particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-secondary rounded-full animate-float" style={{ animationDelay: "0.5s" }}></div>
      <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-accent rounded-full animate-float" style={{ animationDelay: "1s" }}></div>

      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold glow-text-cyan mb-4">
              Get In Touch
            </h2>
            <p className="text-muted-foreground text-lg">
              Let's collaborate on your next project
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
            <div className="contact-input">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-primary focus:glow-border-cyan transition-all h-12"
                required
              />
            </div>

            <div className="contact-input">
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-primary focus:glow-border-cyan transition-all h-12"
                required
              />
            </div>

            <div className="contact-input">
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-background/50 border-border/50 focus:border-primary focus:glow-border-cyan transition-all min-h-[150px] resize-none"
                required
              />
            </div>

            <div className="contact-submit">
              <Button 
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-border-cyan group"
              >
                <span className="group-hover:scale-110 inline-block transition-transform">
                  Send Message
                </span>
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
