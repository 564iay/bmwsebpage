import { Canvas } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import BmwModel from './BmwModel';
import { Suspense } from 'react';

export default function Scene({ scrollTriggerRef }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-obsidian">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={45} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 20]} />

        {/* Cinematic Lighting Setup */}
        <ambientLight intensity={0.2} color="#ffffff" />
        <spotLight 
          position={[0, 10, 5]} 
          angle={0.6} 
          penumbra={1} 
          intensity={5} 
          color="#00f3ff" 
          castShadow 
        />
        <spotLight 
          position={[-5, 5, -5]} 
          angle={0.5} 
          penumbra={1} 
          intensity={3} 
          color="#ff0055" 
        />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <BmwModel scrollTriggerRef={scrollTriggerRef} />
          </Float>

          {/* High-end Post Processing */}
          <EffectComposer disableNormalPass multisampling={4}>
            <DepthOfField focusDistance={0.02} focalLength={0.15} bokehScale={3} />
            <Bloom 
              luminanceThreshold={0.2} 
              luminanceSmoothing={0.9} 
              intensity={1.5} 
              kernelSize={3} 
              blendFunction={BlendFunction.SCREEN}
            />
            <ChromaticAberration 
              offset={[0.002, 0.002]} 
              blendFunction={BlendFunction.NORMAL} 
            />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
