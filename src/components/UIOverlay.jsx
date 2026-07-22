import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, ChevronRight } from 'lucide-react';

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
        <div className="hidden md:flex gap-8 text-sm font-inter tracking-wide text-gray-300">
          <a href="#design" className="hover:text-white transition-colors hover-target">Design</a>
          <a href="#performance" className="hover:text-white transition-colors hover-target">Performance</a>
          <a href="#technology" className="hover:text-white transition-colors hover-target">Technology</a>
        </div>
        <button className="hover-target flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors">
          <Menu size={24} />
        </button>
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
            <p ref={addToTextRefs} className="font-inter text-gray-400 text-lg md:text-xl max-w-md mb-8 text-mask">
              Experience the pinnacle of automotive engineering and design, 
              encapsulated in an ultra-premium interactive journey.
            </p>
          </div>
          <div className="overflow-hidden">
            <button ref={addToTextRefs} className="hover-target glass px-8 py-4 rounded-full flex items-center gap-4 hover:bg-white/10 transition-all font-sans font-semibold tracking-wide uppercase text-sm">
              Discover Form <ChevronRight size={18} className="text-neon-blue" />
            </button>
          </div>
        </div>
      </section>

      {/* Scroll Section 2 */}
      <section className="h-screen w-full flex items-center justify-end px-[10%]">
        <div className="max-w-xl text-right glass p-10 rounded-3xl">
          <h2 className="font-sans text-5xl font-bold mb-4">Aerodynamic Core</h2>
          <p className="font-inter text-gray-400 leading-relaxed">
            Every curve and glowing edge is procedurally designed to slice through the air. 
            The structural dismantled view reveals the inner heart of the Vision M5.
          </p>
        </div>
      </section>

      {/* Scroll Section 3 */}
      <section className="h-screen w-full flex items-center justify-start px-[10%]">
        <div className="max-w-xl glass p-10 rounded-3xl border-neon-blue/30 shadow-[0_0_50px_rgba(0,243,255,0.1)]">
          <h2 className="font-sans text-5xl font-bold mb-4">Raw Power</h2>
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <span className="font-inter text-gray-500 uppercase text-xs tracking-widest">Horsepower</span>
              <span className="font-sans text-4xl font-bold text-neon-blue">627</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <span className="font-inter text-gray-500 uppercase text-xs tracking-widest">0-60 MPH</span>
              <span className="font-sans text-4xl font-bold">2.9s</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
