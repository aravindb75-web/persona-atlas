"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Dodecahedron, Octahedron, Sparkles } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const FAMILY = ["#9a6fc0", "#33a474", "#4298b4", "#e4ae3a"];

function Core() {
  const ref = useRef();
  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.25;
    ref.current.rotation.x += dt * 0.1;
  });
  return (
    <Icosahedron ref={ref} args={[1.35, 1]}>
      <meshStandardMaterial color="#7c5cd0" roughness={0.15} metalness={0.55} flatShading />
    </Icosahedron>
  );
}

function Shard({ position, color, kind, speed }) {
  const Shape = kind === 0 ? Dodecahedron : kind === 1 ? Octahedron : Icosahedron;
  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={2.2}>
      <Shape args={[0.34, 0]} position={position}>
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.4} flatShading />
      </Shape>
    </Float>
  );
}

function Swarm() {
  const shards = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const r = 2.6 + (i % 3) * 0.5;
      arr.push({
        position: [Math.cos(a) * r, Math.sin(a * 1.3) * 1.5, Math.sin(a) * r - 1],
        color: FAMILY[i % 4],
        kind: i % 3,
        speed: 1 + (i % 5) * 0.3,
      });
    }
    return arr;
  }, []);
  return shards.map((s, i) => <Shard key={i} {...s} />);
}

function Rig() {
  useFrame((state) => {
    const x = (state.pointer.x * Math.PI) / 12;
    const y = (state.pointer.y * Math.PI) / 12;
    state.camera.position.x += (x * 2 - state.camera.position.x) * 0.05;
    state.camera.position.y += (-y * 2 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} style={{ width: "100%", height: "100%" }}>
      <color attach="background" args={["#00000000"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} />
      <directionalLight position={[-5, -2, -3]} intensity={0.5} color="#8a6bd8" />
      <Core />
      <Swarm />
      <Sparkles count={60} scale={9} size={3} speed={0.4} color="#c9b6f0" />
      <Rig />
    </Canvas>
  );
}
