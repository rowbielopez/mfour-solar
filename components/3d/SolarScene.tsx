'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Ring } from '@react-three/drei';
import * as THREE from 'three';

function SolarPanel({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group position={position} ref={ref}>
      {/* Panel frame */}
      <mesh rotation={[Math.PI * 0.15, 0, 0]}>
        <boxGeometry args={[2.4, 1.4, 0.05]} />
        <meshStandardMaterial color="#1a2a3a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Solar cells grid */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              (col - 2.5) * 0.36,
              (row - 1.5) * 0.3,
              0.03,
            ]}
            rotation={[Math.PI * 0.15, 0, 0]}
          >
            <boxGeometry args={[0.32, 0.26, 0.01]} />
            <meshStandardMaterial
              color="#0a1628"
              metalness={0.9}
              roughness={0.1}
              emissive="#001a4d"
              emissiveIntensity={0.3}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

function Sun() {
  const ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group position={[2.5, 0.5, -1]}>
        {/* Sun core */}
        <mesh ref={ref}>
          <Sphere args={[0.8, 64, 64]}>
            <MeshDistortMaterial
              color="#FFC300"
              emissive="#FF8C00"
              emissiveIntensity={0.5}
              metalness={0}
              roughness={0.3}
              distort={0.3}
              speed={2}
            />
          </Sphere>
        </mesh>

        {/* Glow halo */}
        <mesh>
          <Sphere args={[1.05, 32, 32]}>
            <meshStandardMaterial
              color="#FFD740"
              transparent
              opacity={0.08}
              side={THREE.BackSide}
            />
          </Sphere>
        </mesh>

        {/* Orbit rings */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <Ring args={[1.3, 1.35, 64]}>
            <meshStandardMaterial color="#FFC300" transparent opacity={0.2} side={THREE.DoubleSide} />
          </Ring>
        </mesh>
      </group>
    </Float>
  );
}

function Particles() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#FFC300" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function EnergyBeam() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      const material = ref.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      ref.current.rotation.z += 0.02;
    }
  });

  return (
    <mesh ref={ref} position={[0.5, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
      <torusGeometry args={[1.8, 0.01, 8, 100]} />
      <meshStandardMaterial
        color="#FFC300"
        emissive="#FFC300"
        emissiveIntensity={0.5}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}

export default function SolarScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 3]} intensity={1.5} color="#FFF5CC" />
      <pointLight position={[2.5, 0.5, -1]} intensity={2} color="#FFC300" distance={8} />
      <pointLight position={[-3, -1, 2]} intensity={0.5} color="#0B3D2E" />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <SolarPanel position={[-1.2, -0.3, 0]} />
      </Float>

      <Sun />
      <Particles />
      <EnergyBeam />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
