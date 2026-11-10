import type { HoleSection } from "./well.ts";

/** Preserve the source's units, depth references and qualifications in each value. */
export interface Fact {
  label: string;
  value: string;
}

export interface CasingDetail {
  name: string;
  size: string;
  depth: string;
  specifications: Fact[];
  notes?: string[];
}

export interface FactGroup {
  title: string;
  facts: Fact[];
  notes?: string[];
}

/** A factsheet may document a hole bottom without specifying its starting depth. */
export type DocumentedHoleSection = Omit<HoleSection, "top"> & { top?: number };

export interface WellFactsheet {
  source: {
    filename: string;
    title: string;
    revision: string;
    date: string;
  };
  summary: string;
  casings: CasingDetail[];
  groups: FactGroup[];
  holeSections?: DocumentedHoleSection[];
  surveyNote?: string;
}
