"use client";

// 3D background scene — neural-network-style particle field with a few
// wireframe geometric shapes drifting through it. Reads as AI (the connected
// nodes) + Robotics (the wireframe structural shapes).
//
// Architecture:
//   - Outer <group ref=tilt>: cursor parallax (lerped tilt toward cursor)
//   - Inner <group ref=auto>: continuous slow rotation
//     - <lineSegments>: edges between particles within CONNECT_DIST
//     - <points>: the particle nodes themselves
//     - 3 floating wireframe icosahedrons spinning independently
//
// Mouse position lives in a useRef — no React renders on mousemove. useFrame
// reads the ref and lerps. Strict cleanup on unmount.

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 130;
const SPACE = 7; // half-width of the cube where particles live
const CONNECT_DIST = 1.9;
const ACCENT = "#a3e635"; // lime accent matching the site palette

// Generate particle positions and the edge buffer for nodes within CONNECT_DIST
function generateNetwork() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * SPACE * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * SPACE * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * SPACE * 2;
  }

  const linePositions: number[] = [];
  const cd2 = CONNECT_DIST * CONNECT_DIST;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      const dx = positions[i * 3] - positions[j * 3];
      const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
      const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < cd2) {
        linePositions.push(
          positions[i * 3],
          positions[i * 3 + 1],
          positions[i * 3 + 2],
        );
        linePositions.push(
          positions[j * 3],
          positions[j * 3 + 1],
          positions[j * 3 + 2],
        );
      }
    }
  }

  return {
    pointPositions: positions,
    linePositions: new Float32Array(linePositions),
  };
}

function NetworkField() {
  const autoRef = useRef<THREE.Group>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);
  const pointMatRef = useRef<THREE.PointsMaterial>(null);
  const { pointPositions, linePositions } = useMemo(
    () => generateNetwork(),
    [],
  );

  useFrame((state, delta) => {
    const g = autoRef.current;
    if (g) {
      g.rotation.y += delta * 0.04;
      g.rotation.x += delta * 0.02;
    }
    // Pulse the materials so the network "breathes" — feels live, not frozen
    const t = state.clock.elapsedTime;
    if (lineMatRef.current) {
      lineMatRef.current.opacity = 0.16 + Math.sin(t * 0.55) * 0.07;
    }
    if (pointMatRef.current) {
      pointMatRef.current.opacity = 0.7 + Math.sin(t * 0.85) * 0.18;
    }
  });

  return (
    <group ref={autoRef}>
      {/* Edges — neural-net feel via additive blending so overlaps glow */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMatRef}
          color={ACCENT}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={pointMatRef}
          color={ACCENT}
          size={0.05}
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Robotics flavor — floating wireframe shapes among the network */}
      <FloatingShape
        position={[3.8, 1.2, -2]}
        scale={0.9}
        speed={[0.18, 0.22]}
        kind="icosa"
      />
      <FloatingShape
        position={[-3.5, -1.6, 1.5]}
        scale={0.6}
        speed={[0.25, 0.15]}
        kind="octa"
      />
      <FloatingShape
        position={[0.5, 2.6, -3.5]}
        scale={0.75}
        speed={[0.12, 0.28]}
        kind="icosa"
      />
      <FloatingShape
        position={[-2.5, 2.2, 2.8]}
        scale={0.5}
        speed={[0.3, 0.18]}
        kind="octa"
      />
    </group>
  );
}

function FloatingShape({
  position,
  scale,
  speed,
  kind,
}: {
  position: [number, number, number];
  scale: number;
  speed: [number, number];
  kind: "icosa" | "octa";
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * speed[0];
    meshRef.current.rotation.y += delta * speed[1];
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {kind === "icosa" ? (
        <icosahedronGeometry args={[1, 0]} />
      ) : (
        <octahedronGeometry args={[1, 0]} />
      )}
      <meshBasicMaterial
        color={ACCENT}
        wireframe
        transparent
        opacity={0.28}
      />
    </mesh>
  );
}

function SceneRoot() {
  const tiltRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    const t = tiltRef.current;
    if (!t) return;
    t.rotation.x = THREE.MathUtils.lerp(
      t.rotation.x,
      target.current.y * 0.12,
      0.04,
    );
    t.rotation.y = THREE.MathUtils.lerp(
      t.rotation.y,
      target.current.x * 0.12,
      0.04,
    );
  });

  return (
    <group ref={tiltRef}>
      <NetworkField />
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 65 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <SceneRoot />
    </Canvas>
  );
}
