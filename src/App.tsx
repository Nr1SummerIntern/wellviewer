import { useState, useEffect, useRef } from "react";
import "./App.css";
import { WellViewerScene } from "./components/Scene/WellViewerScene.tsx";
import { WellList } from "./components/UI/WellList.tsx";
import { WellDetails } from "./components/UI/WellDetails.tsx";
import * as sampleWellData from "./data/sampleWell.ts";
import { wellFactsheets, factsheetAvailability } from "./data/wellFactsheets.ts";
import type { Well } from "./types/well.ts";
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

  const detailsPanel = useRef<HTMLElement>(null);
  useEffect(() => {
    detailsPanel.current?.scrollTo({ top: 0 });
  }, [selectedWell?.id]);

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

      <aside className="right-panel" ref={detailsPanel} tabIndex={0} aria-label="Selected well details">
        {selectedWell ? (
          <WellDetails
            well={selectedWell}
            factsheet={wellFactsheets[selectedWell.id]}
            availabilityNote={factsheetAvailability[selectedWell.id]}
          />
        ) : (
          <p>Select a well to view its details.</p>
        )}
      </aside>

      <footer className="app-footer">DISCLAIMER: This application is provided free of charge and “as is” for visualization purposes only. It does not meet standards for planning or operational decision-making, and the use of the application is entirely at the user's own risk. Users are solely responsible for validating all information and determining fitness for their intended use. SLB, its affiliates and the developer provide no warranties, express or implied, and accept no liability for any direct, indirect, or consequential loss or damage arising from the use or reliance upon this application</footer>
    </div>
  );
}
