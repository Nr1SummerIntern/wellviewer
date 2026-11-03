import { calculateMinimumCurvature } from "../math/minimumCurvature.ts";
import type { Well } from "../types/well.ts";

export function getWellStats(well: Well) {
  const trajectory = calculateMinimumCurvature(well.survey);

  const last = trajectory[trajectory.length - 1];

  const maxInc = Math.max(...trajectory.map((p) => p.inc));
  const maxDls = Math.max(...trajectory.map((p) => p.doglegSeverity ?? 0));

  const horizontalDeparture = Math.sqrt(
    last.north * last.north + last.east * last.east
  );

  return {
    md: last.md,
    tvd: last.tvd,
    north: last.north,
    east: last.east,
    maxInc,
    maxDls,
    horizontalDeparture,
  };
}