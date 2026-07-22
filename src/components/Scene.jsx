import { Canvas } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera, OrbitControls, Text } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import BmwModel from './BmwModel';
import { Suspense } from 'react';

export default function Scene({ scrollTriggerRef }) {
  return (
    <div className="canvas-container fixed top-0 left-0 w-full h-full -z-10 bg-obsidian">
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
          intensity={8} 
          color="#ffffff" 
          castShadow 
        />
        <spotLight 
          position={[-5, 5, -5]} 
          angle={0.5} 
          penumbra={1} 
          intensity={15} 
          color="#DC2626" 
        />
        
        <Suspense fallback={null}>
          <Environment preset="studio" />
          
          {/* Giant Background Text */}
          <Text
            position={[0, 1.5, -3]}
            fontSize={5}
            fontWeight="bold"
            letterSpacing={0.1}
            color="#ffffff"
            material-toneMapped={false}
          >
            EMPOWER
          </Text>

          {/* Red angled spotlight to match the reference floor glare */}
          <spotLight
            position={[5, 10, -5]}
            angle={0.4}
            penumbra={0.8}
            intensity={20}
            color="#ff0000"
          />

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
