import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

export default function UIOverlay({ setScrollTriggerRef }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    setScrollTriggerRef(containerRef);

    const ctx = gsap.context(() => {
      // Fade out the 3D canvas when scrolling past the hero
      const canvasEl = document.querySelector('.canvas-container');
      if (canvasEl) {
        gsap.to(canvasEl, {
          opacity: 0,
          scrollTrigger: {
            trigger: '#hero',
            start: 'bottom top',
            end: '+=300',
            scrub: true,
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [setScrollTriggerRef]);

  return (
    <div ref={containerRef} className="relative z-10 w-full font-sans text-white selection:bg-m-red selection:text-white pb-32">
      
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full px-12 py-8 flex justify-between items-center z-50 mix-blend-difference">
        <div className="text-2xl font-heading font-bold tracking-widest text-m-red">
          ///<span className="text-white ml-1">VISION</span>
        </div>
        <div className="hidden md:flex gap-8">
          <Button variant="link" className="text-white hover:text-m-red text-xs transition-colors tracking-widest uppercase">Home</Button>
          <Button variant="link" className="text-white hover:text-m-red text-xs transition-colors tracking-widest uppercase">About</Button>
          <Button variant="link" className="text-white hover:text-m-red text-xs transition-colors tracking-widest uppercase">Models</Button>
          <Button variant="link" className="text-white hover:text-m-red text-xs transition-colors tracking-widest uppercase">Features</Button>
          <Button variant="link" className="text-white hover:text-m-red text-xs transition-colors tracking-widest uppercase">Testimonials</Button>
        </div>
        <div className="w-12"></div>
      </nav>

      {/* Hero Section (3D Model sits behind this) */}
      <section id="hero" className="h-screen w-full flex flex-col justify-end px-[10%] pb-32">
        <div className="max-w-md">
          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
            Step into the future with a car that blends intelligent features, sleek design, and everything you need for the road ahead.
          </p>
          <Button className="bg-m-red hover:bg-red-700 text-white rounded-full px-6 py-6 flex items-center gap-4 text-sm font-bold uppercase transition-all shadow-lg shadow-m-red/20 group">
            Explore 
            <div className="bg-white rounded-full p-1 group-hover:translate-x-1 transition-transform">
              <ChevronRight size={16} className="text-m-red" />
            </div>
          </Button>
        </div>
      </section>

      {/* Section 2: More Than Just A Car */}
      <section className="w-full px-[10%] py-24 bg-gradient-to-b from-transparent to-black">
        <Card className="bg-gradient-to-r from-neutral-900 to-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
          <div className="flex flex-col md:flex-row relative z-10">
            <div className="w-full md:w-1/2 p-12 bg-[url('https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000')] bg-cover bg-center min-h-[400px]">
              {/* Image Placeholder area */}
            </div>
            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
              <h2 className="font-heading text-6xl text-white tracking-tighter mb-6 leading-none">MORE THAN JUST<br/>A CAR</h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-sm">
                We believe a car is more than just a means of transport, it's a part of your lifestyle. With elegant design and smart features, every ride becomes meaningful.
              </p>
              <Button className="bg-m-red hover:bg-red-700 w-fit text-white rounded-full px-6 py-6 flex items-center gap-4 text-sm font-bold uppercase transition-all shadow-lg shadow-m-red/20 group">
                Explore 
                <div className="bg-white rounded-full p-1 group-hover:translate-x-1 transition-transform">
                  <ChevronRight size={16} className="text-m-red" />
                </div>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Section 3: Explore The Details */}
      <section className="w-full px-[10%] py-24 bg-black">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="font-heading text-6xl text-white tracking-tighter mb-12">EXPLORE THE<br/>DETAILS</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 bg-neutral-900 rounded-xl border border-white/5 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800" className="w-full h-full object-cover opacity-70" alt="Car detail 1"/>
              </div>
              <div className="flex flex-col gap-4">
                <div className="h-32 bg-neutral-900 rounded-xl border border-white/5 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1503376713295-8bb2909405d4?q=80&w=800" className="w-full h-full object-cover opacity-70" alt="Car detail 2"/>
                </div>
                <div className="h-28 bg-neutral-900 rounded-xl border border-white/5 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800" className="w-full h-full object-cover opacity-70" alt="Car detail 3"/>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <Accordion type="single" collapsible="true" className="w-full">
              <AccordionItem value="item-1" className="border-b border-white/10 py-2">
                <AccordionTrigger className="text-white hover:text-m-red text-left font-semibold">What type of vehicles do you offer?</AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed">
                  We offer a premium selection of high-performance luxury vehicles tailored for an unparalleled driving experience.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-white/10 py-2">
                <AccordionTrigger className="text-white hover:text-m-red text-left font-semibold">Can I schedule a test drive?</AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed">
                  Yes, you can schedule a test drive by contacting our concierge service directly through the app.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b border-white/10 py-2">
                <AccordionTrigger className="text-white hover:text-m-red text-left font-semibold">Do you offer financing options?</AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed">
                  We partner with top-tier financial institutions to provide competitive and flexible financing packages.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-white/10 py-2">
                <AccordionTrigger className="text-white hover:text-m-red text-left font-semibold">How long is the warranty?</AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed">
                  All our models come with a comprehensive 5-year or 60,000-mile bumper-to-bumper warranty.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Section 4: Testimonials */}
      <section className="w-full px-[10%] py-24 bg-black">
        <h2 className="font-heading text-6xl text-white tracking-tighter mb-12">WHAT OUR<br/>CUSTOMERS SAY</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-neutral-900 border border-white/5 rounded-xl p-8 hover:border-m-red/30 transition-colors">
              <div className="flex gap-1 mb-6 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                "I never thought buying a car online could be this easy. The service was outstanding, and the car was exactly as promised! Truly worth it."
              </p>
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Customer {i}</div>
                    <div className="text-gray-500 text-xs">Verified</div>
                  </div>
                </div>
                <div className="text-m-red font-bold text-4xl leading-none">"</div>
              </div>
            </Card>
          ))}

        </div>
      </section>

      {/* Footer Video Section */}
      <section className="w-full px-[10%] py-12 bg-black">
        <div className="w-full h-80 bg-neutral-900 rounded-3xl overflow-hidden relative group border border-white/10 hover:border-m-red transition-colors">
          <img src="https://images.unsplash.com/photo-1503376713295-8bb2909405d4?q=80&w=1200" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Video cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="icon" className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-m-red hover:border-m-red transition-all">
              <Play size={24} fill="currentColor" />
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
