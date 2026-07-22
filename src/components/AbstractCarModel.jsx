import { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, Sphere, MeshTransmissionMaterial } from '@react-three/drei';
import gsap from 'gsap';

export default function AbstractCarModel({ scrollTriggerRef }) {
  const groupRef = useRef();
  const wheelRefs = useRef([]);
  const coreRef = useRef();

  useFrame((state, delta) => {
    // Gentle floating animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
    // Rotate wheels slowly
    wheelRefs.current.forEach(wheel => {
      if (wheel) wheel.rotation.x += delta * 2;
    });
  });

  useLayoutEffect(() => {
    // Setup GSAP scroll animations tied to scrollTriggerRef
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollTriggerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing
        }
      });

      // Dismantle / Transform animation as user scrolls
      tl.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        x: Math.PI / 4,
        z: -Math.PI / 8,
        ease: "none"
      }, 0)
      .to(groupRef.current.scale, {
        x: 1.5, y: 1.5, z: 1.5,
        ease: "none"
      }, 0)
      // Explode effect on the wheels
      .to(wheelRefs.current.map(w => w.position), {
        x: (i) => wheelRefs.current[i].position.x * 2.5,
        z: (i) => wheelRefs.current[i].position.z * 2.5,
        ease: "power2.inOut"
      }, 0)
      // Core glow shift
      .to(coreRef.current.material, {
        opacity: 1,
        emissiveIntensity: 5,
        ease: "power2.inOut"
      }, 0);
      
    }, scrollTriggerRef);

    return () => ctx.revert();
  }, [scrollTriggerRef]);

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Main Body - Glassmorphic / Crystal */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2, 0.5, 4]} />
        <MeshTransmissionMaterial 
          backside 
          thickness={0.5} 
          roughness={0.1} 
          transmission={1} 
          ior={1.5} 
          chromaticAberration={0.06} 
          anisotropy={0.1} 
          color="#1a1a1a"
        />
      </mesh>

      {/* Aerodynamic Canopy */}
      <mesh position={[0, 0.9, -0.5]}>
        <boxGeometry args={[1.5, 0.4, 2]} />
        <MeshTransmissionMaterial 
          backside 
          thickness={0.2} 
          roughness={0} 
          transmission={1} 
          ior={1.5} 
          color="#00f3ff"
        />
      </mesh>

      {/* Glowing Energy Core */}
      <Sphere ref={coreRef} args={[0.3, 32, 32]} position={[0, 0.5, -0.5]}>
        <meshStandardMaterial 
          color="#00f3ff" 
          emissive="#00f3ff" 
          emissiveIntensity={2} 
          toneMapped={false} 
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Wheels */}
      {[
        [-1.1, 0.3, 1.5], // Front Left
        [1.1, 0.3, 1.5],  // Front Right
        [-1.1, 0.3, -1.5], // Rear Left
        [1.1, 0.3, -1.5],  // Rear Right
      ].map((pos, i) => (
        <mesh 
          key={i} 
          position={pos} 
          rotation={[0, 0, Math.PI / 2]} 
          ref={el => (wheelRefs.current[i] = el)}
        >
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial 
            color="#050505" 
            metalness={0.9} 
            roughness={0.1} 
            envMapIntensity={2} 
          />
          {/* Wheel rim glow */}
          <mesh position={[0, i % 2 === 0 ? -0.16 : 0.16, 0]}>
            <ringGeometry args={[0.2, 0.3, 32]} />
            <meshBasicMaterial color="#00f3ff" side={2} toneMapped={false} />
          </mesh>
        </mesh>
      ))}

      {/* Futuristic Accents/Lines */}
      <Box args={[0.1, 0.1, 4.2]} position={[-1.05, 0.5, 0]}>
        <meshStandardMaterial color="#333" metalness={1} roughness={0.2} />
      </Box>
      <Box args={[0.1, 0.1, 4.2]} position={[1.05, 0.5, 0]}>
        <meshStandardMaterial color="#333" metalness={1} roughness={0.2} />
      </Box>
    </group>
  );
}
