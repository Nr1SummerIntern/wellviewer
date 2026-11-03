import type { SurveyStation, TrajectoryPoint } from "../types/well";

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

/**
 * Converts degrees to radians.
 */
function toRad(degrees: number): number {
  return degrees * DEG_TO_RAD;
}

/**
 * Calculates dogleg angle between two survey stations.
 * Result is in radians.
 */
function calculateDoglegRadians(
  inc1: number,
  azi1: number,
  inc2: number,
  azi2: number
): number {
  const cosDogleg =
    Math.cos(inc2 - inc1) -
    Math.sin(inc1) * Math.sin(inc2) * (1 - Math.cos(azi2 - azi1));

  return Math.acos(Math.min(1, Math.max(-1, cosDogleg)));
}

/**
 * Ratio factor used by the Minimum Curvature Method.
 */
function calculateRatioFactor(dogleg: number): number {
  if (Math.abs(dogleg) < 1e-12) return 1;

  return (2 / dogleg) * Math.tan(dogleg / 2);
}

/**
 * Industry-standard Minimum Curvature Method.
 *
 * Inputs:
 * - MD in meters
 * - Inclination in degrees
 * - Azimuth in degrees
 *
 * Outputs:
 * - North, East, TVD in meters
 */
export function calculateMinimumCurvature(
  stations: SurveyStation[]
): TrajectoryPoint[] {
  if (stations.length === 0) {
    console.warn("calculateMinimumCurvature: Empty stations array");
    return [];
  }

  const sortedStations = [...stations].sort((a, b) => a.md - b.md);
  console.log(`calculateMinimumCurvature: Processing ${sortedStations.length} stations, MD range ${sortedStations[0].md}-${sortedStations[sortedStations.length-1].md}`);

  const trajectory: TrajectoryPoint[] = [
    {
      md: sortedStations[0].md,
      inc: sortedStations[0].inc,
      azi: sortedStations[0].azi,
      north: 0,
      east: 0,
      tvd: 0,
      dogleg: 0,
      doglegSeverity: 0,
    },
  ];

  for (let i = 1; i < sortedStations.length; i++) {
    const previousStation = sortedStations[i - 1];
    const currentStation = sortedStations[i];
    const previousPoint = trajectory[i - 1];

    const deltaMd = currentStation.md - previousStation.md;

    if (deltaMd <= 0) {
      console.error(`Survey stations must have increasing MD values. Station ${i-1}: ${previousStation.md}, Station ${i}: ${currentStation.md}`);
      throw new Error("Survey stations must have increasing MD values.");
    }

    const inc1 = toRad(previousStation.inc);
    const azi1 = toRad(previousStation.azi);
    const inc2 = toRad(currentStation.inc);
    const azi2 = toRad(currentStation.azi);

    const doglegRad = calculateDoglegRadians(inc1, azi1, inc2, azi2);
    const ratioFactor = calculateRatioFactor(doglegRad);

    const deltaNorth =
      (deltaMd / 2) *
      (Math.sin(inc1) * Math.cos(azi1) +
        Math.sin(inc2) * Math.cos(azi2)) *
      ratioFactor;

    const deltaEast =
      (deltaMd / 2) *
      (Math.sin(inc1) * Math.sin(azi1) +
        Math.sin(inc2) * Math.sin(azi2)) *
      ratioFactor;

    const deltaTvd =
      (deltaMd / 2) *
      (Math.cos(inc1) + Math.cos(inc2)) *
      ratioFactor;

    const doglegDeg = doglegRad * RAD_TO_DEG;

    trajectory.push({
      md: currentStation.md,
      inc: currentStation.inc,
      azi: currentStation.azi,
      north: previousPoint.north + deltaNorth,
      east: previousPoint.east + deltaEast,
      tvd: previousPoint.tvd + deltaTvd,
      dogleg: doglegDeg,
      doglegSeverity: (doglegDeg / deltaMd) * 30,
    });
  }

  console.log(`calculateMinimumCurvature: Complete. Final TVD: ${trajectory[trajectory.length-1].tvd}m, Lateral: N=${trajectory[trajectory.length-1].north}m E=${trajectory[trajectory.length-1].east}m`);
  return trajectory;
}