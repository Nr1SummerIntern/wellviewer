export interface SurveyStation {
  md: number;
  inc: number;
  azi: number;
}

export interface TrajectoryPoint {
  md: number;
  inc: number;
  azi: number;
  north: number;
  east: number;
  tvd: number;
  dogleg?: number;
  doglegSeverity?: number;
}

export interface SurfaceLocation {
  north: number;
  east: number;
  elevation: number;
}

export interface HoleSection {
  name: string;
  top: number;
  bottom: number;
  type?: string;
  diameter?: number;
  notes?: string;
}

export interface Well {
  id: string;
  name: string;
  operator?: string;
  field?: string;
  status?: string;
  surface: SurfaceLocation;
  survey: SurveyStation[];
  holeSections?: HoleSection[];
  summary?: string;
}