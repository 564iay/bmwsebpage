import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Smooth physics-based movement using GSAP quickTo
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleHover = () => {
      cursor.classList.add('hovered');
    };

    const handleHoverOut = () => {
      cursor.classList.remove('hovered');
    };

    window.addEventListener('mousemove', moveCursor);

    // Attach hover effects to buttons and links
    const hoverElements = document.querySelectorAll('a, button, .hover-target');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHover);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      hoverElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHover);
        el.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor"></div>;
}
