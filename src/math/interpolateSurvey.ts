import type { SurveyStation } from "../types/well.ts";

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function wrapAzimuth(delta: number): number {
  if (delta > 180) return delta - 360;
  if (delta < -180) return delta + 360;
  return delta;
}

export function interpolateSurvey(
  survey: SurveyStation[],
  step = 10
): SurveyStation[] {
  if (survey.length < 2) return survey;

  const result: SurveyStation[] = [];

  for (let i = 0; i < survey.length - 1; i++) {
    const a = survey[i];
    const b = survey[i + 1];

    const mdDelta = b.md - a.md;
    const n = Math.max(1, Math.ceil(mdDelta / step));

    const aziDelta = wrapAzimuth(b.azi - a.azi);

    for (let j = 0; j < n; j++) {
      const t = j / n;

      result.push({
        md: lerp(a.md, b.md, t),
        inc: lerp(a.inc, b.inc, t),
        azi: a.azi + aziDelta * t,
      });
    }
  }

  result.push(survey[survey.length - 1]);

  return result;
}