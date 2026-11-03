import type { VisibleWell } from "../../types/visibleWell.ts";

type Props = {
  wells: VisibleWell[];
  selectedWellId?: string;
  onSelectWell: (well: VisibleWell) => void;
  onToggleVisibility: (wellId: string) => void;
};

export function WellList({
  wells,
  selectedWellId,
  onSelectWell,
  onToggleVisibility,
}: Props) {
  return (
    <div className="well-list">
      <h2>Wells</h2>

      {wells.map((well) => (
        <div
          key={well.id}
          className={`well-list-item ${
            well.id === selectedWellId ? "selected" : ""
          }`}
        >
          <button onClick={() => onSelectWell(well)}>{well.name}</button>

          <button
            className="visibility-button"
            onClick={() => onToggleVisibility(well.id)}
            title={well.visible ? "Hide well" : "Show well"}
          >
            {well.visible ? "👁" : "—"}
          </button>

        </div>
      ))}
    </div>
  );
}