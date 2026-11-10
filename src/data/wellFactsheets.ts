import type { WellFactsheet } from "../types/wellFactsheet.ts";
import { coreFactsheets } from "./factsheetsCore.ts";

// Transcribed from the supplied NORCE factsheets. These describe construction;
// they do not replace, interpolate or extend the loaded directional surveys.
const u5Source = {
  filename: "Main-features-of-well-U5A-rev.1.4-17.06.2025.pdf",
  title: "Main features of well U5 / test well U5A",
  revision: "1.4",
  date: "2025-06-17",
};

const u5Casings: WellFactsheet["casings"] = [
  {
    name: "Surface casing",
    size: '13 3/8"',
    depth: "Shoe at 50 m MD",
    specifications: [
      { label: "Weight", value: "72 lb/ft" },
      { label: "Grade", value: "N-80" },
    ],
  },
  {
    name: "Casing",
    size: '9 5/8"',
    depth: "Shoe at 72.5 m MD",
    specifications: [
      { label: "Weight", value: "47 lb/ft" },
      { label: "Grade", value: "N-80" },
      { label: "Cement", value: "Not cemented" },
    ],
  },
];

export const wellFactsheets: Record<string, WellFactsheet> = {
  ...coreFactsheets,
  "well-004": {
    source: {
      filename: "Main-features-of-test-well-U3-rev.1.3-08.08.2025.pdf",
      title: "Main features of well U3",
      revision: "1.3",
      date: "2025-08-08",
    },
    summary: "U3 is a deviated test well with a 13 5/8-inch 5K wellhead, 13 3/8-inch surface casing set at 334 m MD and lower 9 5/8-inch casing set at 796 m MD. The lower well includes an 8 1/2-inch hole and a cemented interval, with phyllite and granitic augen gneiss formations. High-side casing milling includes one confirmed window and one partial window.",
    casings: [
      {
        name: "Surface casing",
        size: '13 3/8"',
        depth: "Shoe at 334 m MD",
        specifications: [
          { label: "Weight", value: "72 lb/ft" },
          { label: "Grade", value: "N-80" },
        ],
      },
      {
        name: "Upper casing",
        size: '10 3/4"',
        depth: '10 3/4" × 9 5/8" crossover at 122.7 m MD',
        specifications: [
          { label: "Weight", value: "55.5 lb/ft" },
          { label: "Connection", value: "BTC threads" },
        ],
      },
      {
        name: "Upper casing below crossover",
        size: '9 5/8"',
        depth: "Casing at 240.7 m MD (as labelled on the schematic)",
        specifications: [
          { label: "Weight", value: "47 lb/ft" },
          { label: "Grade", value: "N-80" },
          { label: "Connection", value: "BTC threads" },
        ],
      },
      {
        name: "Lower casing",
        size: '9 5/8"',
        depth: "Shoe at 796 m MD",
        specifications: [
          { label: "Weight", value: "53.5 lb/ft" },
          { label: "Grade", value: "C-95" },
          { label: "Connection", value: "New VAM threads" },
        ],
      },
    ],
    groups: [
      {
        title: "Wellhead & documented depths",
        facts: [
          { label: "Wellhead", value: '13 5/8", 5K' },
          { label: "Wellhead reference", value: "8.25 m RKB" },
          { label: "Lower hole", value: '8 1/2" hole drilled to 1115 m MD' },
          { label: "Cemented interval", value: "1115–1135 m (as stated in the revised schematic)" },
          { label: "Inclination", value: "24° indicated on the schematic" },
        ],
      },
      {
        title: "Casing windows",
        facts: [
          { label: "Confirmed window", value: '695.8–697.0 m MD; 1.2 m long; 3 3/4"; high side' },
          { label: "Partial window", value: '742.2–744.2 m MD; 3 1/2"; high side' },
          { label: "Depth uncertainty", value: "±2.0 m for the milling depths" },
          { label: "Well azimuth", value: "174.7° stated with the window information" },
        ],
        notes: ["Window details are recorded on page 2 of the 8 August 2025 revision."],
      },
      {
        title: "Geology",
        facts: [
          { label: "Formations", value: "Phyllite and granitic augen gneiss" },
          { label: "Revised lower annotation", value: "Augen gneiss from 1135 m MD" },
        ],
      },
    ],
    surveyNote: "The loaded single-shot survey ends at 1082 m MD. The revised construction drawing describes the 8 1/2\" hole to 1115 m MD and cement from 1115 to 1135 m; these annotations are retained separately and no trajectory is extrapolated.",
  },
  "well-006": {
    source: u5Source,
    summary: "U5 has 13 3/8-inch surface casing set at 50 m MD and uncemented 9 5/8-inch casing set at 72.5 m MD. Its original 6 1/8-inch open-hole branch extends to 375 m MD and is not accessible. The U5A sidetrack branches from U5 at approximately 110–120 m MD.",
    casings: u5Casings,
    groups: [
      {
        title: "Wellhead & original bore",
        facts: [
          { label: "Wellhead", value: '13 5/8", 5K' },
          { label: "Wellhead reference", value: "8.66 m RKB" },
          { label: "Upper drilled hole", value: '12 1/4" hole drilled to 73 m MD' },
          { label: "Original open hole", value: '6 1/8" from approximately 110–120 m to 375 m MD' },
          { label: "Documented TD", value: "375 m MD" },
          { label: "Access", value: "Original U5 branch: not accessible (factsheet status)" },
        ],
      },
      {
        title: "U5A sidetrack",
        facts: [
          { label: "Kickoff from U5", value: "Approximately 110–120 m MD" },
          { label: "U5A open hole", value: '8 1/2" from 73 to 295 m MD' },
        ],
        notes: ["The supplied U5A factsheet depicts U5 and U5A together. These casing specifications describe their shared upper well."],
      },
    ],
    surveyNote: "The loaded U5 survey ends at 372.83 m MD. The factsheet marks the original U5 open-hole branch as not accessible; a displayed trajectory does not establish access.",
  },
  "well-008": {
    source: u5Source,
    summary: "U5A is a sidetrack from U5, kicking off at approximately 110–120 m MD and extending to 295 m MD. It shares the upper 13 3/8-inch surface casing and uncemented 9 5/8-inch casing with U5, with an 8 1/2-inch open-hole interval from 73 to 295 m MD.",
    casings: u5Casings,
    holeSections: [
      { name: '12 1/4" upper drilled hole', bottom: 73, diameter: 12.25, type: "Drilled hole" },
      { name: '8 1/2" U5A open hole', top: 73, bottom: 295, diameter: 8.5, type: "Open hole" },
    ],
    groups: [
      {
        title: "Wellhead & sidetrack",
        facts: [
          { label: "Shared wellhead", value: '13 5/8", 5K' },
          { label: "Wellhead reference", value: "8.66 m RKB" },
          { label: "Kickoff from U5", value: "Approximately 110–120 m MD" },
          { label: "Documented U5A TD", value: "295 m MD" },
          { label: "Original U5 branch", value: '6 1/8" open hole to 375 m MD; marked not accessible' },
        ],
        notes: ["Casing details refer to the shared upper U5/U5A assembly. The inaccessible original U5 branch and the U5A sidetrack are separate bores."],
      },
    ],
    surveyNote: "The loaded U5A survey ends at 287.69 m MD; the documented sidetrack TD is 295 m MD.",
  },
  "well-012": {
    source: {
      filename: "Main-features-of-well-U6-rev.1.4-21.03.2023.pdf",
      title: 'Main features of well U6 “Wisting” / U6B survey',
      revision: "1.4",
      date: "2023-03-21",
    },
    summary: "U6B (Wisting) is a near-horizontal test well with 13 3/8-inch surface casing set at 37.5 m MD and 10 3/4-inch P110 intermediate casing set at 461 m MD. It kicks off at 100 m MD and continues into a 9 1/2-inch open-hole interval from 465 to 768 m MD.",
    casings: [
      {
        name: "Surface casing",
        size: '13 3/8"',
        depth: "Shoe at 37.5 m MD",
        specifications: [
          { label: "Wall thickness", value: '0.514"' },
          { label: "Weight", value: "72 lb/ft" },
          { label: "Grade", value: "N-80" },
          { label: "Inside diameter", value: '313.6 mm / 12.347"' },
          { label: "Cement", value: "Concrete; top of cement at surface" },
        ],
      },
      {
        name: "Intermediate casing",
        size: '10 3/4"',
        depth: "Shoe at 461 m MD",
        specifications: [
          { label: "Wall thickness", value: '0.545"' },
          { label: "Weight", value: "60.7 lb/ft" },
          { label: "Grade", value: "P110" },
          { label: "Inside diameter", value: '245.4 mm / 9.660"' },
          { label: "Cement", value: "Class G, 2.00 sg" },
        ],
      },
    ],
    holeSections: [
      { name: '17 1/2" surface hole', bottom: 38, diameter: 17.5, type: "Drilled hole" },
      { name: '12 1/4" intermediate hole', bottom: 465, diameter: 12.25, type: "Drilled hole" },
      { name: '9 1/2" open hole', top: 465, bottom: 768, diameter: 9.5, type: "Open hole" },
    ],
    groups: [
      {
        title: "Wellhead & trajectory features",
        facts: [
          { label: "Wellhead", value: '13 5/8", threaded onto the 13 3/8" surface casing' },
          { label: "Wellhead reference", value: "8.46 m RKB" },
          { label: "Kickoff", value: "100 m MD" },
          { label: "Dogleg", value: "Up to 14° (as stated on the schematic; no interval specified)" },
          { label: "Documented open-hole end", value: "768 m MD" },
        ],
      },
    ],
    surveyNote: "The source is titled U6 “Wisting”; its survey page explicitly identifies U6B (Wisting Well), matching this well. The loaded survey ends at 738.4 m MD; the construction schematic extends to 768 m MD.",
  },
  "well-014": {
    source: {
      filename: "Main-features-of-PandA-test-well-U8-rev.1.3-20.03.2023.pdf",
      title: "Main features of well U8 P&A",
      revision: "1.3",
      date: "2023-03-20",
    },
    summary: "U8 is a P&A test well with a 30-inch conductor set at 20.8 m MD and 20-inch intermediate casing set at 217.5 m MD. Below the casing, a 17 1/2-inch open-hole interval runs from 220 to 723 m MD, followed by a 12 1/4-inch interval to 896.5 m MD. Strain gauges on the wellhead measure applied forces.",
    casings: [
      {
        name: "Conductor pipe",
        size: '30"',
        depth: "Shoe at 20.8 m MD",
        specifications: [
          { label: "Wall thickness", value: '1.0"' },
          { label: "Grade", value: "X52" },
          { label: "Connection / designation", value: "H60D / QTBXSL-60P" },
          { label: "Inside diameter", value: "707.6 mm" },
        ],
      },
      {
        name: "Intermediate casing — upper section",
        size: '20"',
        depth: "Wellhead–120 m MD",
        specifications: [
          { label: "Wall thickness", value: '0.625"' },
          { label: "Grade", value: "API 5L-X56" },
          { label: "Connection", value: "RL-4S BOX × PIN" },
          { label: "Inside diameter", value: '18.63" (as stated in factsheet)' },
        ],
      },
      {
        name: "Intermediate casing — lower section",
        size: '20"',
        depth: "120–217.5 m MD; shoe at 217.5 m MD",
        specifications: [
          { label: "Wall thickness", value: '0.625"' },
          { label: "Grade / manufacture", value: "X56, SAW" },
          { label: "Connection", value: "Multi-thread type H60D / MT BOX × PIN" },
        ],
      },
    ],
    holeSections: [
      { name: '36" conductor hole', bottom: 20.8, diameter: 36, type: "Drilled hole" },
      { name: '26" intermediate hole', bottom: 220, diameter: 26, type: "Drilled hole" },
      { name: '17 1/2" open hole', top: 220, bottom: 723, diameter: 17.5, type: "Open hole" },
      { name: '12 1/4" open hole', top: 723, bottom: 896.5, diameter: 12.25, type: "Open hole" },
    ],
    groups: [
      {
        title: "Wellhead & test instrumentation",
        facts: [
          { label: "Wellhead", value: '30", at 8.55 m RKB' },
          { label: "Casing hanger flange", value: '20", 1750 psi, at 7.98 m RKB' },
          { label: "Strain gauges", value: "Mounted on the wellhead to measure applied forces" },
          { label: "Documented hole end", value: "896.5 m MD" },
        ],
      },
      {
        title: "Geology",
        facts: [
          { label: "Formations shown", value: "Phyllite and granitic augen gneiss" },
        ],
      },
    ],
    surveyNote: "The loaded survey covers 9.54–890.58 m MD. The construction schematic extends to 896.5 m MD. Calculated coordinates start at the first loaded station; the unsurveyed surface interval is not reconstructed.",
  },
};

export const factsheetAvailability: Record<string, string> = {
  "well-010": "The supplied U6 factsheet describes Wisting and labels its survey U6B. Its construction details are shown under U6B (Wisting), rather than assigned to this separate U6 trajectory.",
};
