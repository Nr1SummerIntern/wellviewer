import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
} from "@react-three/drei";
import { WellPath } from "../Wells/WellPath.tsx";
import { WellLabel } from "../Wells/WellLabel.tsx";
import { Axes } from "./Axes.tsx";
import type { VisibleWell } from "../../types/visibleWell.ts";

function UllrigModel() {
  const origin = [0, 0, 0] as [number, number, number];

  return (
    <group position={origin} scale={0.5}>
      <mesh position={[0, 14, 0]}>
        <boxGeometry args={[110, 12, 110]} />
        <meshStandardMaterial color="#9aa8b3" metalness={0.35} roughness={0.8} />
      </mesh>

      <mesh position={[0, 90, 0]}>
        <boxGeometry args={[22, 170, 22]} />
        <meshStandardMaterial color="#b4bec8" metalness={0.35} roughness={0.72} />
      </mesh>

      <mesh position={[0, 180, 0]}>
        <boxGeometry args={[18, 24, 18]} />
        <meshStandardMaterial color="#dfe7ee" metalness={0.35} roughness={0.7} />
      </mesh>

      <mesh position={[0, 210, 0]}>
        <boxGeometry args={[100, 10, 10]} />
        <meshStandardMaterial color="#d2dbe3" metalness={0.35} roughness={0.7} />
      </mesh>

      <mesh position={[0, 210, 0]} rotation={[0, 0, -0.45]}>
        <boxGeometry args={[90, 10, 10]} />
        <meshStandardMaterial color="#d2dbe3" metalness={0.35} roughness={0.7} />
      </mesh>

      <mesh position={[0, 210, 0]} rotation={[0, 0, 0.45]}>
        <boxGeometry args={[90, 10, 10]} />
        <meshStandardMaterial color="#d2dbe3" metalness={0.35} roughness={0.7} />
      </mesh>

      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * 30, 95, 0]} rotation={[0, 0, side * 0.3]}>
          <boxGeometry args={[10, 180, 10]} />
          <meshStandardMaterial color="#b4bec8" metalness={0.35} roughness={0.72} />
        </mesh>
      ))}

      {[-1, 1].map((side) => (
        <mesh key={`z-${side}`} position={[0, 95, side * 30]} rotation={[side * 0.3, 0, 0]}>
          <boxGeometry args={[10, 180, 10]} />
          <meshStandardMaterial color="#b4bec8" metalness={0.35} roughness={0.72} />
        </mesh>
      ))}

      <mesh position={[0, 50, 0]}>
        <boxGeometry args={[65, 12, 65]} />
        <meshStandardMaterial color="#b9c4cf" metalness={0.35} roughness={0.72} />
      </mesh>

      <mesh position={[0, 85, 0]}>
        <boxGeometry args={[80, 8, 15]} />
        <meshStandardMaterial color="#c8d3dc" metalness={0.35} roughness={0.72} />
      </mesh>

      <mesh position={[0, 110, 0]}>
        <boxGeometry args={[10, 120, 10]} />
        <meshStandardMaterial color="#dfe7ee" metalness={0.35} roughness={0.7} />
      </mesh>

      <mesh position={[0, 60, 0]}>
        <boxGeometry args={[68, 9, 9]} />
        <meshStandardMaterial color="#d3dce4" metalness={0.35} roughness={0.7} />
      </mesh>

      <mesh position={[0, 165, 0]}>
        <boxGeometry args={[70, 10, 10]} />
        <meshStandardMaterial color="#d3dce4" metalness={0.35} roughness={0.7} />
      </mesh>

      <mesh position={[0, 35, 0]}>
        <cylinderGeometry args={[18, 18, 42, 30]} />
        <meshStandardMaterial color="#c4ced7" metalness={0.4} roughness={0.68} />
      </mesh>

      <mesh position={[-90, 28, 0]}>
        <boxGeometry args={[26, 38, 26]} />
        <meshStandardMaterial color="#aab7c0" metalness={0.35} roughness={0.8} />
      </mesh>

      <mesh position={[90, 28, 0]}>
        <boxGeometry args={[26, 38, 26]} />
        <meshStandardMaterial color="#aab7c0" metalness={0.35} roughness={0.8} />
      </mesh>

      <mesh position={[110, 18, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[32, 12, 12]} />
        <meshStandardMaterial color="#d0d9e2" metalness={0.45} roughness={0.68} />
      </mesh>

      <mesh position={[110, 18, 0]} rotation={[0, 0, 0.6]}>
        <boxGeometry args={[18, 4, 4]} />
        <meshStandardMaterial color="#e3ebf2" metalness={0.5} roughness={0.6} />
      </mesh>

      <mesh position={[100, 40, 0]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[58, 6, 6]} />
        <meshStandardMaterial color="#dfe8ee" metalness={0.45} roughness={0.68} />
      </mesh>

      <mesh position={[120, 24, 0]}>
        <coneGeometry args={[18, 28, 24]} />
        <meshStandardMaterial color="#e7edf3" metalness={0.2} roughness={0.8} />
      </mesh>

      <WellLabel name="Ullrigg" position={[0, 260, 0]} />
    </group>
  );
}

type WellViewerSceneProps = {
  wells: VisibleWell[];
  selectedWellId?: string;
  onSelectWell: (well: VisibleWell) => void;
};

export function WellViewerScene({
  wells,
  selectedWellId,
  onSelectWell,
}: WellViewerSceneProps) {
  useEffect(() => {
    console.log(`WellViewerScene: Rendering ${wells.length} wells`);
    wells.forEach((well) => {
      console.log(`  - Well: ${well.name}, ID: ${well.id}, Survey stations: ${well.survey.length}, Visible: ${well.visible}`);
    });
  }, [wells]);

  return (
    <Canvas
      camera={{
        position: [800, 500, 800],
        fov: 45,
        near: 0.1,
        far: 10000000,
      }}
    >
      <color attach="background" args={["#05070a"]} />

      <ambientLight intensity={1} />
      <directionalLight position={[300, 500, 300]} intensity={2} />

      <gridHelper args={[10000, 50, "#666666", "#333333"]} />

      <Axes />

      <UllrigModel />

      {wells.map((well) => (
        <WellPath
          key={well.id}
          well={well}
          isSelected={well.id === selectedWellId}
          onSelect={onSelectWell}
        />
      ))}

      <OrbitControls minDistance={10} maxDistance={1000000} />

      <GizmoHelper alignment="bottom-right">
        <GizmoViewport />
      </GizmoHelper>
    </Canvas>
  );
}