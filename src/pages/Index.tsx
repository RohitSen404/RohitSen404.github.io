import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Certificates from "@/components/Certificates";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <Hero />
          <About />
          <Certificates />
          <Skills />
          <Projects />
          <Testimonials />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
