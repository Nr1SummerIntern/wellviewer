import type { WellFactsheet } from "../types/wellFactsheet.ts";

// Transcribed from the supplied NORCE factsheets, including diagram annotations.
// Casing sizes are outside diameters; they are distinct from drilled-hole sizes.
export const coreFactsheets: Record<string, WellFactsheet> = {
  "well-002": {
    source: {
      filename: "Main-features-of-well-U1-rev.1.3-20.03.23.pdf",
      title: "Main features of well U1",
      revision: "1.3",
      date: "2023-03-20",
    },
    summary: "U1 has 13 3/8-inch surface casing set at 354 m MD and progressively smaller open-hole sections extending to 1324 m MD, ending in a 5 1/2-inch hole. Its near point with U2 is at 500 m MD. The single-shot survey reaches 950 m MD, with inclinations up to 7°.",
    casings: [
      {
        name: "Surface casing",
        size: '13 3/8"',
        depth: "Shoe at 354 m MD",
        specifications: [
          { label: "Wall thickness", value: '0.514"' },
          { label: "Nominal weight", value: "72 lb/ft" },
          { label: "Grade", value: "N-80" },
          { label: "Inside diameter", value: '313.6 mm / 12.347"' },
          { label: "Cement", value: "Class G, 1.90 sg" },
          { label: "Centralizers", value: "None" },
        ],
      },
    ],
    groups: [
      {
        title: "Wellhead & documented depths",
        facts: [
          { label: "Wellhead", value: '13 5/8", 5K' },
          { label: "Wellhead reference", value: "8.78 m RKB" },
          { label: "Deepest drilled section", value: "1324 m MD" },
          { label: "Near point with U2", value: "500 m MD" },
        ],
      },
      {
        title: "Borehole condition & geology",
        facts: [
          { label: "354–825 m MD", value: 'Actual borehole diameter varies from 12 1/4" to 16".' },
          { label: "Below 1100 m MD", value: 'Narrow hole, less than 12 1/4".' },
          { label: "Formations shown", value: "Phyllite and granitic augen gneiss" },
        ],
      },
    ],
    holeSections: [
      { name: "Main open hole", top: 354, bottom: 1261.3, type: "Open hole", diameter: 12.25, notes: "Diameter varies in the upper interval; see borehole condition." },
      { name: "Reduced open hole", top: 1261.3, bottom: 1288.8, type: "Open hole", diameter: 9.5 },
      { name: "Reduced open hole", top: 1288.8, bottom: 1306.5, type: "Open hole", diameter: 7.875 },
      { name: "Bottom open hole", top: 1306.5, bottom: 1324, type: "Open hole", diameter: 5.5 },
    ],
    surveyNote: "The supplied single-shot survey ends at 950 m MD. The documented drilled depth is 1324 m MD; the loaded trajectory does not cover the full well.",
  },
  "well-003": {
    source: {
      filename: "Main-features-of-well-U2-rev.1.4-20.03.23.pdf",
      title: "Main features of well U2",
      revision: "1.4",
      date: "2023-03-20",
    },
    summary: "U2 is a directional test well with 13 3/8-inch surface casing set at 1520 m MD and a 10 3/4-inch × 9 5/8-inch wear string. It kicks off at 300 m MD and builds into a 60–63° tangent section, with a 12 1/4-inch hole extending to 2020 m MD. The wear string ends in a bullnose at 2010 m MD.",
    casings: [
      {
        name: "Surface casing",
        size: '13 3/8"',
        depth: "Shoe at 1520 m MD",
        specifications: [
          { label: "Wall thickness", value: '0.514"' },
          { label: "Nominal weight", value: "72 lb/ft" },
          { label: "Grade", value: "N-80" },
          { label: "Inside diameter", value: '313.6 mm / 12.347"' },
          { label: "Cement", value: "Class G; 1.61 sg lead, 1.89 sg tail" },
          { label: "Top of cement", value: "Surface" },
        ],
      },
      {
        name: "Upper wear string",
        size: '10 3/4"',
        depth: "Crossover to 9 5/8-inch at 229 m MD",
        specifications: [
          { label: "Nominal weight", value: "45.5 lb/ft" },
          { label: "Grade", value: "N-80" },
        ],
      },
      {
        name: "Lower wear string",
        size: '9 5/8"',
        depth: "Below crossover at 229 m MD; bullnose at 2010 m MD",
        specifications: [
          { label: "Nominal weight", value: "47 lb/ft" },
          { label: "Grade", value: "N-80" },
        ],
      },
    ],
    groups: [
      {
        title: "Wellhead & documented depths",
        facts: [
          { label: "Wellhead", value: '13 5/8", 5K' },
          { label: "Wellhead reference", value: "8.75 m RKB" },
          { label: "Upper drilled-hole size", value: '17 1/2"' },
          { label: "Lower drilled hole", value: '12 1/4", drilled to 2020 m MD' },
        ],
      },
      {
        title: "Trajectory & geology",
        facts: [
          { label: "First kick-off point", value: "300 m MD" },
          { label: "Build rate", value: "3°/30 m" },
          { label: "Tangent inclination", value: "60–63°" },
          { label: "Near point with U1", value: "500 m MD" },
          { label: "Formations shown", value: "Phyllite and granitic augen gneiss" },
        ],
      },
      {
        title: "Documented pressure test",
        facts: [
          { label: "Test pressure", value: "326 bar surface pressure" },
          { label: "Test date", value: "17 December 2021" },
          { label: "Fluid condition", value: "Freshwater column in the hole" },
        ],
        notes: ["This records the historical pressure test stated in the factsheet."],
      },
    ],
    surveyNote: "The loaded survey ends at 2000 m MD; the factsheet documents drilling to 2020 m MD.",
  },
  "well-005": {
    source: {
      filename: "Main-features-of-well-U4-rev.1.2-20.03.2023.pdf",
      title: "Main features of well U4",
      revision: "1.2",
      date: "2023-03-20",
    },
    summary: "U4 has a 9 5/8-inch cased main bore and a 7-inch cased lateral branching through a window at 555 m MD. Six latch couplings are installed in the main bore and three in the lateral. The main bore is accessible to 1015 m MD, while the lateral reaches 998 m MD.",
    casings: [
      {
        name: "Surface casing",
        size: '13 3/8"',
        depth: "Shoe at 50 m MD",
        specifications: [
          { label: "Nominal weight", value: "72 lb/ft" },
          { label: "Grade", value: "N-80" },
        ],
      },
      {
        name: "Upper casing",
        size: '10 3/4"',
        depth: "Crossover to 9 5/8-inch at 230 m MD",
        specifications: [
          { label: "Nominal weight", value: "55.5 lb/ft" },
          { label: "Grade", value: "N-80" },
          { label: "Inclination at crossover", value: "18°" },
        ],
      },
      {
        name: "Main-bore casing",
        size: '9 5/8"',
        depth: "Below crossover at 230 m MD; bore accessible to 1015 m MD",
        specifications: [
          { label: "Nominal weight", value: "47 lb/ft" },
          { label: "Grade", value: "N-80" },
          { label: "Latch couplings", value: "Six, at 525, 560, 585, 937, 964 and 999 m MD" },
        ],
      },
      {
        name: "Lateral casing",
        size: '7"',
        depth: "Window at 555 m MD; lateral TD at 998 m MD",
        specifications: [
          { label: "Nominal weight", value: "26 lb/ft" },
          { label: "Grade", value: "N-80" },
          { label: "Latch couplings", value: "Three, at 900, 925 and 949 m MD" },
          { label: "Joints above latch couplings", value: 'One 7", 29 lb/ft, 13Cr joint above each coupling' },
        ],
      },
    ],
    groups: [
      {
        title: "Wellhead & branch access",
        facts: [
          { label: "Wellhead", value: '13 5/8", 5K' },
          { label: "Wellhead reference", value: "8.72 m RKB" },
          { label: "Main-bore access", value: "To 1015 m MD" },
          { label: "Lateral window", value: "555 m MD, 44° inclination" },
          { label: "Lateral TD", value: "998 m MD" },
          { label: "Formations shown", value: "Phyllite and granitic augen gneiss" },
        ],
      },
    ],
    surveyNote: "The factsheet provides separate surveys for the 9 5/8-inch main bore and 7-inch lateral. The viewer currently loads one U4 trajectory; the lateral is described here but is not plotted separately. Documented accessibility is distinct from the loaded survey endpoint.",
  },
  "well-013": {
    source: {
      filename: "Main-features-of-well-U7-rev.1.3-20.03.2023.pdf",
      title: "Main features of well U7",
      revision: "1.3",
      date: "2023-03-20",
    },
    summary: "U7 is a shallow test well with a 20-inch stove pipe, 13 3/8-inch surface casing and 9 5/8-inch P110 intermediate casing set at 210 m MD. Custom elastomers bonded to the casing are designed to simulate cement faults and mimic water on acoustic logs. Its trajectory is assumed to follow U3 approximately to 150 m MD; no U7 survey has been taken.",
    casings: [
      {
        name: "Stove pipe",
        size: '20"',
        depth: "Shoe at 11.2 m MD",
        specifications: [],
      },
      {
        name: "Surface casing",
        size: '13 3/8"',
        depth: "Shoe at 42.4 m MD",
        specifications: [
          { label: "Wall thickness", value: '0.514"' },
          { label: "Nominal weight", value: "72 lb/ft" },
          { label: "Grade", value: "N-80" },
          { label: "Inside diameter", value: '313.6 mm / 12.347"' },
        ],
      },
      {
        name: "Intermediate casing",
        size: '9 5/8"',
        depth: "Shoe at 210 m MD",
        specifications: [
          { label: "Wall thickness", value: '0.545"' },
          { label: "Nominal weight", value: "53.5 lb/ft" },
          { label: "Grade", value: "P110" },
          { label: "Connection / designation", value: "VAM 21 CWD R3" },
          { label: "Inside diameter", value: '216.8 mm / 8.535"' },
          { label: "Cement", value: "Class G, 1.90 sg" },
        ],
        notes: ["Custom elastomers are vulcanized to the casing wall to simulate faults in the cement; the compound is designed to mimic water on an acoustic log."],
      },
    ],
    groups: [
      {
        title: "Wellhead & drilled hole",
        facts: [
          { label: "Wellhead", value: '13 5/8", threaded onto 9 5/8" VAM 21' },
          { label: "Wellhead reference", value: "TBA m RKB, as stated in the factsheet" },
          { label: "Upper drilled hole", value: '17 1/2", drilled to 17.6 m MD' },
          { label: "Lower drilled hole", value: '12 1/2", drilled to 214 m MD' },
        ],
      },
      {
        title: "Cement evaluation testing",
        facts: [
          { label: "Test features", value: "Custom elastomers on the casing wall" },
          { label: "Purpose", value: "Simulate cement faults and mimic water on acoustic logs" },
        ],
      },
    ],
    surveyNote: "No survey has been taken in U7. The factsheet assumes approximately the same trajectory as U3 to 150 m MD. The displayed U7 path and its calculated statistics are based on this assumed trajectory, not a measured U7 survey.",
  },
};
