import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const preloaderRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fake progress animation (in a real app, tie this to Suspense/useProgress)
      tl.to(progressRef.current, {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
      })
      .to(textRef.current, {
        opacity: 0,
        duration: 0.3
      })
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2
      });
    }, preloaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={preloaderRef} 
      className="fixed inset-0 z-[99999] bg-obsidian flex flex-col items-center justify-center"
    >
      <div className="overflow-hidden mb-8">
        <h1 ref={textRef} className="font-sans text-4xl md:text-6xl font-bold tracking-tighter text-white">
          VISION<span className="text-neon-blue font-light">M5</span>
        </h1>
      </div>
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div ref={progressRef} className="h-full w-0 bg-neon-blue rounded-full shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>
      </div>
    </div>
  );
}
