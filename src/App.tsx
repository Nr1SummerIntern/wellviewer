import { useState, useEffect } from "react";
import "./App.css";
import { WellViewerScene } from "./components/Scene/WellViewerScene.tsx";
import { WellList } from "./components/UI/WellList.tsx";
import * as sampleWellData from "./data/sampleWell.ts";
import { getWellStats } from "./utils/wellStats.ts";
import type { HoleSection, Well } from "./types/well.ts";
import type { VisibleWell } from "./types/visibleWell.ts";

const WELL_COLORS = [
  "#00d4ff",
  "#ff4d4d",
  "#7cff6b",
  "#ffb84d",
  "#c084fc",
  "#f472b6",
  "#38bdf8",
  "#facc15",
];

function formatHoleSize(diameter?: number, fallbackName?: string) {
  if (diameter === undefined) {
    return fallbackName || "-";
  }

  const eighths = Math.round(diameter * 8);
  const whole = Math.floor(eighths / 8);
  const remainder = eighths % 8;
  const fractions: Record<number, string> = {
    1: "1/8",
    2: "1/4",
    3: "3/8",
    4: "1/2",
    5: "5/8",
    6: "3/4",
    7: "7/8",
  };

  return `${whole}${remainder ? ` ${fractions[remainder]}` : ""}"`;
}



export default function App() {
  const initialWells: VisibleWell[] = Object.values(sampleWellData)
    .filter(
      (well): well is Well =>
        !!well && typeof well === "object" && "survey" in well && "surface" in well
    )
    .map((well, index) => ({
      ...well,
      visible: true,
      color: WELL_COLORS[index % WELL_COLORS.length],
    }));

  const [wells, setWells] = useState<VisibleWell[]>(initialWells);

  const [selectedWell, setSelectedWell] = useState<VisibleWell | null>(
    () => initialWells[initialWells.length - 1] ?? null
  );

  // Debug logging
  useEffect(() => {
    console.log("App: State updated");
    console.log(`  - wells: ${wells.length} total`);
    console.log(`  - visibleWells: ${wells.filter((w) => w.visible).length}`);
    console.log(`  - selectedWell: ${selectedWell?.name || "none"}`);
    console.log("Sample wells loaded:", wells.map((w) => w.name).join(", "));
  }, [wells, selectedWell]);

  const selectedStats = selectedWell ? getWellStats(selectedWell) : null;
  const selectedSummary = selectedWell
    ? selectedWell.summary ??
      Object.values(sampleWellData).find(
        (well): well is Well =>
          !!well &&
          typeof well === "object" &&
          "id" in well &&
          well.id === selectedWell.id
      )?.summary
    : undefined;
  const selectedHoleSections: HoleSection[] = selectedWell?.holeSections ??
    (selectedWell
      ? Object.values(sampleWellData).find(
          (well): well is Well =>
            !!well &&
            typeof well === "object" &&
            "id" in well &&
            well.id === selectedWell.id
        )?.holeSections ?? []
      : []);
  const visibleWells = wells.filter((well) => well.visible);

  function toggleVisibility(wellId: string) {
    setWells((current) =>
      current.map((well) =>
        well.id === wellId ? { ...well, visible: !well.visible } : well
      )
    );
  }

  return (
    <div className="app">
      <aside className="left-panel">
        <img
          src="/imageedit_3_5053586946.png"
          alt="NORCE logo"
          className="left-panel-logo"
        />

        <WellList
          wells={wells}
          selectedWellId={selectedWell?.id}
          onSelectWell={setSelectedWell}
          onToggleVisibility={toggleVisibility}
        />

        <section className="disclaimer-section">
          <h2></h2>
        </section>
      </aside>

      <main className="viewer">
        <WellViewerScene
          wells={visibleWells}
          selectedWellId={selectedWell?.id}
          onSelectWell={setSelectedWell}
        />
      </main>

      <aside className="right-panel">
        {selectedWell && selectedStats ? (
          <>
            <h2>{selectedWell.name}</h2>

            <section className="well-summary">
              <h3>Summary</h3>
              <p>{selectedSummary || "No summary has been entered for this well."}</p>
            </section>

            <section className="hole-sections">
              <h3>Hole sections</h3>
              {selectedHoleSections.length > 0 ? (
                <>
                <div className="hole-section-header" aria-hidden="true">
                  <span>Hole size</span>
                  <span>Type</span>
                  <span>Top MD</span>
                  <span>Bottom MD</span>
                </div>
                {selectedHoleSections.map((section) => (
                  <div className="hole-section-row" key={`${section.name}-${section.top}`}>
                    <strong>{formatHoleSize(section.diameter, section.name)}</strong>
                    <span>{section.type || "-"}</span>
                    <span>{section.top.toFixed(0)} m</span>
                    <span>{section.bottom.toFixed(0)} m</span>
                  </div>
                ))}
                </>
              ) : (
                <p>No hole sections have been entered for this well.</p>
              )}
            </section>

            <hr />

            <section className="well-stats" aria-label="Trajectory statistics">
              <div className="stat-item">
                <strong>MD</strong>
                <span>{selectedStats.md.toFixed(2)} m</span>
              </div>
              <div className="stat-item">
                <strong>TVD</strong>
                <span>{selectedStats.tvd.toFixed(2)} m</span>
              </div>
              <div className="stat-item">
                <strong>North</strong>
                <span>{selectedStats.north.toFixed(2)} m</span>
              </div>
              <div className="stat-item">
                <strong>East</strong>
                <span>{selectedStats.east.toFixed(2)} m</span>
              </div>
              <div className="stat-item">
                <strong>Departure</strong>
                <span>{selectedStats.horizontalDeparture.toFixed(2)} m</span>
              </div>
              <div className="stat-item">
                <strong>Max Inc</strong>
                <span>{selectedStats.maxInc.toFixed(2)}°</span>
              </div>
              <div className="stat-item">
                <strong>Max DLS</strong>
                <span>{selectedStats.maxDls.toFixed(2)}°/30m</span>
              </div>
            </section>

          </>
        ) : (
          <p>Select a well to view its details.</p>
        )}
      </aside>

      <footer className="app-footer">DISCLAIMER: This application is provided free of charge and “as is” for visualization purposes only. It does not meet standards for planning or operational decision-making, and the use of the application is entirely at the user's own risk. Users are solely responsible for validating all information and determining fitness for their intended use. SLB, its affiliates and the developer provide no warranties, express or implied, and accept no liability for any direct, indirect, or consequential loss or damage arising from the use or reliance upon this application</footer>
    </div>
  );
}