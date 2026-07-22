import { useRef, useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import gsap from 'gsap';

export default function BmwModel({ scrollTriggerRef }) {
  const { scene } = useGLTF('/bmw.glb');
  const groupRef = useRef();

  useLayoutEffect(() => {
    // Traverse and apply shadow settings to the loaded model
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.envMapIntensity = 1.5;
        }
      }
    });
  }, [scene]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollTriggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // Scroll-based rotation and translation for the real BMW model
      tl.to(groupRef.current.rotation, {
        y: Math.PI * 2.2,
        x: Math.PI / 12,
        z: -Math.PI / 12,
        ease: "none"
      }, 0)
      .to(groupRef.current.scale, {
        x: 1.2, y: 1.2, z: 1.2,
        ease: "none"
      }, 0)
      .to(groupRef.current.position, {
        x: -2, z: 3,
        ease: "power2.inOut"
      }, 0);
      
    }, scrollTriggerRef);

    return () => ctx.revert();
  }, [scrollTriggerRef]);

  return (
    <group ref={groupRef} position={[0, -1, 0]} scale={0.6}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/bmw.glb');
