import type { Well } from "../../types/well.ts";

type Props = {
  well: Well | null;
};

export function SurveyTable({ well }: Props) {
  if (!well) return null;

  return (
    <div className="survey-table">
      <h2>Survey Stations</h2>

      <div className="survey-table-scroll">
        <table>
          <thead>
            <tr>
              <th>MD</th>
              <th>Inc</th>
              <th>Azi</th>
            </tr>
          </thead>

          <tbody>
            {well.survey.map((station, index) => (
              <tr key={`${station.md}-${index}`}>
                <td>{station.md.toFixed(1)}</td>
                <td>{station.inc.toFixed(1)}</td>
                <td>{station.azi.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}