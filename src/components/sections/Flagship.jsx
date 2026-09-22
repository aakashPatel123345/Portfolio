import SectionHead from '../SectionHead';
import Reveal from '../Reveal';
import '../../styles/components/flagship.css';

const STAGES = [
  { n: '01', title: 'Raw statement text', note: null },
  { n: '02', title: 'Structured output', note: 'strict JSON schema' },
  { n: '03', title: 'Retry on parse failure', note: 'error fed back, once' },
  { n: '04', title: 'Independent validation', note: 'amount, date, category id' },
  { n: '05', title: 'Duplicate detection', note: '±3 day window' },
  { n: '06', title: 'Human review queue', note: 'pending / rejected / duplicate' },
  { n: '07', title: 'Commit & log', note: 'tokens and cost per call' },
];

const TINTED = new Set(['03', '04', '05']);

export default function Flagship() {
  return (
    <section id="work" className="flagship">
      <Reveal>
        <SectionHead index="01" label="FEATURED" />
      </Reveal>

      <Reveal as="div" className="flagship__heading">
        <h2 className="flagship__title">Budgeting AI</h2>
        <span className="flagship__status mono-label">IN PROGRESS</span>
      </Reveal>

      <Reveal as="p" index={1} className="flagship__claim">
        Bank-statement extraction with a validation layer that never trusts the model.
      </Reveal>

      <ol className="flagship__stages">
        {STAGES.map((stage, i) => (
          <Reveal
            as="li"
            key={stage.n}
            index={i % 3}
            threshold={0.5}
            className={`flagship__stage${TINTED.has(stage.n) ? ' flagship__stage--tint' : ''}`}
          >
            <span className="flagship__stage-index mono-label">{stage.n}</span>
            <span className="flagship__stage-title">{stage.title}</span>
            {stage.note && <span className="flagship__stage-note">— {stage.note}</span>}
          </Reveal>
        ))}
      </ol>

      <Reveal as="div" className="flagship__stats mono-data">
        <span>extract-v1</span>
        <span>±3 days</span>
        <span>10 categories</span>
        <span>integer cents</span>
      </Reveal>

      <Reveal as="div" className="flagship__links">
        <span className="flagship__link-inert">
          Read the code → <span className="bracket">[REPO URL]</span>
        </span>
        <span className="flagship__link-inert">
          Full breakdown → <span className="bracket">[/budgeting-ai — deferred]</span>
        </span>
      </Reveal>
    </section>
  );
}
