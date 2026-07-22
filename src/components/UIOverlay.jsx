import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

export default function UIOverlay({ setScrollTriggerRef }) {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    setScrollTriggerRef(containerRef);

    const ctx = gsap.context(() => {
      // Staggered reveal for hero text
      gsap.fromTo(
        textRefs.current,
        { y: 100, opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        {
          y: 0,
          opacity: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          delay: 2 // Wait for preloader
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [setScrollTriggerRef]);

  return (
    <div ref={containerRef} className="relative z-10 w-full h-[300vh]">
      
      {/* Glassmorphic Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl glass rounded-full px-8 py-4 flex justify-between items-center z-50">
        <div className="text-xl font-sans font-bold tracking-tighter">
          VISION<span className="text-neon-blue font-light">M5</span>
        </div>
        <div className="hidden md:flex gap-2">
          <Button variant="ghost" className="hover-target text-muted-foreground hover:text-white rounded-full transition-colors">Design</Button>
          <Button variant="ghost" className="hover-target text-muted-foreground hover:text-white rounded-full transition-colors">Performance</Button>
          <Button variant="ghost" className="hover-target text-muted-foreground hover:text-white rounded-full transition-colors">Technology</Button>
        </div>
        <Button variant="ghost" size="icon" className="hover-target rounded-full hover:bg-white/10 transition-colors">
          <Menu size={24} />
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col justify-center px-[10%] pt-20">
        <div className="max-w-2xl">
          <div className="overflow-hidden">
            <h1 ref={addToTextRefs} className="font-sans text-6xl md:text-8xl font-bold leading-none mb-4 text-mask">
              BEYOND
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 ref={addToTextRefs} className="font-sans text-6xl md:text-8xl font-bold leading-none mb-6 text-mask text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              BOUNDARIES.
            </h1>
          </div>
          <div className="overflow-hidden">
            <p ref={addToTextRefs} className="font-sans text-muted-foreground text-lg md:text-xl max-w-md mb-8 text-mask">
              Experience the pinnacle of automotive engineering and design, 
              encapsulated in an ultra-premium interactive journey.
            </p>
          </div>
          <div className="overflow-hidden">
            <Button ref={addToTextRefs} variant="outline" className="hover-target glass rounded-full px-8 py-6 flex items-center gap-4 hover:bg-white/10 transition-all font-sans font-semibold tracking-wide uppercase text-sm border-white/20">
              Discover Form <ChevronRight size={18} className="text-neon-blue" />
            </Button>
          </div>
        </div>
      </section>

      {/* Scroll Section 2 */}
      <section className="h-screen w-full flex items-center justify-end px-[10%]">
        <Card className="max-w-xl text-right glass border-0 bg-transparent shadow-none">
          <CardHeader>
            <CardTitle className="font-sans text-5xl font-bold mb-2">Aerodynamic Core</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-sans text-muted-foreground leading-relaxed text-lg">
              Every curve and glowing edge is procedurally designed to slice through the air. 
              The structural dismantled view reveals the inner heart of the Vision M5.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Scroll Section 3 */}
      <section className="h-screen w-full flex items-center justify-start px-[10%]">
        <Card className="max-w-xl glass border-neon-blue/30 shadow-[0_0_50px_rgba(0,243,255,0.1)] rounded-3xl overflow-hidden">
          <CardHeader className="bg-black/20 pb-6">
            <CardTitle className="font-sans text-5xl font-bold">Raw Power</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-end border-b border-border pb-4">
                <span className="font-sans text-muted-foreground uppercase text-sm tracking-widest font-semibold">Horsepower</span>
                <span className="font-sans text-4xl font-bold text-neon-blue">627</span>
              </div>
              <div className="flex justify-between items-end border-b border-border pb-4">
                <span className="font-sans text-muted-foreground uppercase text-sm tracking-widest font-semibold">0-60 MPH</span>
                <span className="font-sans text-4xl font-bold">2.9s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}
