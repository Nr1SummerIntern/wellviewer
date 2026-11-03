import { Line } from "@react-three/drei";
import { useMemo, useState } from "react";
import { calculateMinimumCurvature } from "../../math/minimumCurvature.ts";
import type { VisibleWell } from "../../types/visibleWell.ts";
import { WellLabel } from "./WellLabel.tsx";
import { MAP_CENTER } from "../../constants/map.ts";

type WellPathProps = {
  well: VisibleWell;
  isSelected: boolean;
  onSelect: (well: VisibleWell) => void;
};

export function WellPath({
  well,
  isSelected,
  onSelect,
}: WellPathProps) {
  const [hovered, setHovered] = useState(false);

  const trajectory = useMemo(() => {
    const calc = calculateMinimumCurvature(well.survey);
    console.log(`Well ${well.name}: trajectory calculated with ${calc.length} points`, calc);
    return calc;
  }, [well]);

  const points = useMemo(() => {
    const mapped = trajectory.map((p) => [
      p.east + (well.surface.east - MAP_CENTER.east),
      -(p.tvd - well.surface.elevation),
      p.north + (well.surface.north - MAP_CENTER.north),
    ]) as [number, number, number][];
    console.log(`Well ${well.name}: points array has ${mapped.length} points`, mapped);
    return mapped;
  }, [trajectory, well]);

  const color = isSelected ? "#ffcc00" : hovered ? "#7df9ff" : well.color;

  // Guard against empty trajectory
  if (points.length < 1) {
    console.warn(`Well ${well.name}: No points to render!`);
    return <group />;
  }

  const wellheadPosition = points[0];
  const tdPosition = points[points.length - 1];

  return (
    <group
      onClick={(event) => {
        event.stopPropagation();
        onSelect(well);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Wellhead - orange sphere at surface */}
      <mesh position={wellheadPosition}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshStandardMaterial color="#ff8c00" />
      </mesh>

      {/* Well trajectory line */}
      {points.length >= 2 && (
        <Line points={points} color={color} lineWidth={isSelected ? 6 : 3} />
      )}

      {/* Well label at TD */}
      <WellLabel name={well.name} position={tdPosition} />
    </group>
  );
}