import { useState, useEffect, lazy, Suspense } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";

const About = lazy(() => import("@/components/About"));
const Certificates = lazy(() => import("@/components/Certificates"));
const Skills = lazy(() => import("@/components/Skills"));
const Gallery = lazy(() => import("@/components/Gallery"));
const Ratings = lazy(() => import("@/components/Ratings"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

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
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <About />
            <Certificates />
            <Skills />
            <Gallery />
            <Ratings />
            <Contact />
            <Footer />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default Index;
