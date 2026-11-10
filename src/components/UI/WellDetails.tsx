import type { DocumentedHoleSection, Fact, WellFactsheet } from "../../types/wellFactsheet.ts";
import type { VisibleWell } from "../../types/visibleWell.ts";
import { getWellStats } from "../../utils/wellStats.ts";
import "./WellDetails.css";

interface Props {
  well: VisibleWell;
  factsheet?: WellFactsheet;
  availabilityNote?: string;
}

const depthFormat = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 });
const statFormat = new Intl.NumberFormat("en-GB", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatSize(diameter: number) {
  const eighths = Math.round(diameter * 8);
  const whole = Math.floor(eighths / 8);
  const remainder = eighths % 8;
  const fractions = ["", "1/8", "1/4", "3/8", "1/2", "5/8", "3/4", "7/8"];
  return `${whole}${remainder ? ` ${fractions[remainder]}` : ""} in`;
}

function formatDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Facts({ facts }: { facts: Fact[] }) {
  return (
    <dl className="well-details-facts">
      {facts.map((fact, index) => (
        <div key={`${fact.label}-${index}`}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Notes({ notes }: { notes?: string[] }) {
  if (!notes?.length) return null;
  return (
    <ul className="well-details-notes">
      {notes.map((note, index) => <li key={index}>{note}</li>)}
    </ul>
  );
}

function HoleSections({ sections, documented }: { sections: DocumentedHoleSection[]; documented: boolean }) {
  if (!sections.length) return null;
  return (
    <section className="well-details-section">
      <h3>{documented ? "Drilled hole sections" : "Existing section data"}</h3>
      {!documented && (
        <p className="well-details-caption">Existing app data; these sections have not been checked against a supplied factsheet.</p>
      )}
      <table className="well-details-holes">
        <caption className="well-details-sr-only">
          {documented ? "Documented drilled hole sections" : "Existing section data"}, depths in metres measured depth
        </caption>
        <thead>
          <tr><th scope="col">Section / size</th><th scope="col">Depth (m MD)</th></tr>
        </thead>
        <tbody>
          {sections.map((section, index) => (
            <tr key={`${section.name}-${section.top}-${index}`}>
              <th scope="row">
                <span>{section.name}</span>
                <span className="well-details-hole-meta">
                  {[section.diameter !== undefined ? formatSize(section.diameter) : undefined, section.type].filter(Boolean).join(" · ")}
                </span>
                {section.notes && <span className="well-details-hole-note">{section.notes}</span>}
              </th>
              <td>{section.top === undefined ? `To ${depthFormat.format(section.bottom)}` : `${depthFormat.format(section.top)}–${depthFormat.format(section.bottom)}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function WellDetails({ well, factsheet, availabilityNote }: Props) {
  const stats = well.survey.length ? getWellStats(well) : null;
  const firstMD = well.survey.length ? Math.min(...well.survey.map(station => station.md)) : 0;
  const source = factsheet?.source;
  const sections = factsheet ? factsheet.holeSections ?? [] : well.holeSections ?? [];
  const statFacts: Fact[] = stats ? [
    { label: "Survey start MD", value: `${statFormat.format(firstMD)} m` },
    { label: "Survey end MD", value: `${statFormat.format(stats.md)} m` },
    { label: firstMD > 0 ? "Vertical displacement" : "Calculated TVD", value: `${statFormat.format(stats.tvd)} m` },
    { label: "North displacement", value: `${statFormat.format(stats.north)} m` },
    { label: "East displacement", value: `${statFormat.format(stats.east)} m` },
    { label: "Horizontal departure", value: `${statFormat.format(stats.horizontalDeparture)} m` },
    { label: "Maximum inclination", value: `${statFormat.format(stats.maxInc)}°` },
    { label: "Maximum dogleg severity", value: `${statFormat.format(stats.maxDls)}°/30 m` },
  ] : [];

  return (
    <div className="well-details">
      <header className="well-details-header">
        <p className="well-details-eyebrow">Well details</p>
        <h2>{well.name}</h2>
      </header>

      <section className="well-details-section well-details-summary">
        <h3>Overview</h3>
        <p>{factsheet?.summary ?? well.summary ?? "No summary has been entered for this well."}</p>
      </section>

      {factsheet && (
        <section className="well-details-section">
          <h3>Casing &amp; completion</h3>
          <p className="well-details-caption">Sizes are casing outside diameters. MD = measured depth.</p>
          {factsheet.casings.length ? (
            <div className="well-details-casings">
              {factsheet.casings.map((casing, index) => (
                <article className="well-details-casing" key={`${casing.name}-${index}`}>
                  <h4><span>{casing.size}</span>{casing.name}</h4>
                  <p className="well-details-setting-depth">{casing.depth}</p>
                  <Facts facts={casing.specifications} />
                  <Notes notes={casing.notes} />
                </article>
              ))}
            </div>
          ) : <p>No casing specifications are stated in the supplied factsheet.</p>}
        </section>
      )}

      {factsheet?.groups.map((group, index) => (
        <section className="well-details-section" key={`${group.title}-${index}`}>
          <h3>{group.title}</h3>
          <Facts facts={group.facts} />
          <Notes notes={group.notes} />
        </section>
      ))}

      <HoleSections sections={sections} documented={!!factsheet} />

      <section className="well-details-section">
        <h3>Loaded survey statistics</h3>
        {factsheet?.surveyNote && <p className="well-details-survey-note">{factsheet.surveyNote}</p>}
        <p className="well-details-caption">Calculated from {well.survey.length} loaded survey stations using minimum curvature.</p>
        {stats ? <Facts facts={statFacts} /> : <p>No survey stations are loaded for this well.</p>}
        {stats && (
          <p className="well-details-coverage">
            {firstMD > 0
              ? `The survey starts at ${depthFormat.format(firstMD)} m MD. Vertical and horizontal displacements are relative to that first station; the missing interval to surface is not included.`
              : "Survey end MD is the end of the loaded trajectory and may differ from the documented well depth."}
          </p>
        )}
      </section>

      {source ? (
        <section className="well-details-section well-details-source">
          <h3>Source factsheet</h3>
          <p>{source.title}</p>
          <p className="well-details-source-revision">Revision {source.revision} · <time dateTime={source.date}>{formatDate(source.date)}</time></p>
          <a
            href={`${import.meta.env.BASE_URL}factsheets/${encodeURIComponent(source.filename)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open original factsheet <span aria-hidden="true">↗</span>
            <span className="well-details-sr-only"> for {well.name} (PDF, opens in a new tab)</span>
          </a>
        </section>
      ) : (
        <section className="well-details-section well-details-source">
          <h3>Information coverage</h3>
          <p>No matching factsheet details are available for this trajectory. Its overview uses the loaded survey, and its existing section data has not been verified.</p>
          {availabilityNote && <p className="well-details-coverage">{availabilityNote}</p>}
        </section>
      )}
    </div>
  );
}
