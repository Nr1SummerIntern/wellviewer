import type { SurveyStation } from "../types/well.ts";

function toNumber(value: string): number {
  return Number(value.replace(",", ".").trim());
}

export function parseSurveyText(text: string): SurveyStation[] {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const stations: SurveyStation[] = [];

  for (const line of lines) {
    const columns = line.split(/\t|;|,/).map((c) => c.trim());

    const numbers = columns
      .map(toNumber)
      .filter((value) => Number.isFinite(value));

    if (numbers.length < 3) continue;

    stations.push({
      md: numbers[0],
      inc: numbers[1],
      azi: numbers[2],
    });
  }

  return stations.sort((a, b) => a.md - b.md);
}