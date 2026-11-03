import { useState } from "react";
import { parseSurveyText } from "../../utils/parseSurveyText.ts";
import type { Well } from "../../types/well.ts";

type Props = {
  onAddWell: (well: Well) => void;
};

export function SurveyPastePanel({ onAddWell }: Props) {
  const [name, setName] = useState("Imported Well");
  const [surfaceNorth, setSurfaceNorth] = useState(6536036.15);
  const [surfaceEast, setSurfaceEast] = useState(655904.14);
  const [surfaceElevation, setSurfaceElevation] = useState(0);
  const [text, setText] = useState("");

  function handleImport() {
    const survey = parseSurveyText(text);

    if (survey.length < 2) {
      alert("Could not find valid survey rows. Paste MD, Inc, Azi columns.");
      return;
    }

    onAddWell({
      id: crypto.randomUUID(),
      name,
      operator: "Imported",
      field: "Land Rig",
      status: "Imported",
      surface: {
        north: surfaceNorth,
        east: surfaceEast,
        elevation: surfaceElevation,
      },
      survey,
    });

    setText("");
  }

  return (
    <div className="survey-panel">
      <h2>Paste Survey</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Well name"
      />

      <label>Surface Northing (m)</label>
      <input
        type="number"
        value={surfaceNorth}
        onChange={(e) => setSurfaceNorth(Number(e.target.value))}
      />

      <label>Surface Easting (m)</label>
      <input
        type="number"
        value={surfaceEast}
        onChange={(e) => setSurfaceEast(Number(e.target.value))}
      />

      <label>Rig Elevation (m)</label>
      <input
        type="number"
        value={surfaceElevation}
        onChange={(e) => setSurfaceElevation(Number(e.target.value))}
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={"Paste from Excel:\nMD\tInc\tAzi\n0\t0\t0\n300\t10\t90"}
      />

      <button onClick={handleImport}>Import Well</button>
    </div>
  );
}