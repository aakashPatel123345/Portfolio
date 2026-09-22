import SectionHead from '../SectionHead';
import WorkCard from './WorkCard';
import Reveal from '../Reveal';
import '../../styles/components/work.css';

function RetrievalGlyph() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="32" cy="13" r="4" />
      <circle cx="13" cy="40" r="4" />
      <circle cx="32" cy="51" r="4" />
      <circle cx="51" cy="40" r="4" />
      <line x1="30.5" y1="16.5" x2="16" y2="37" />
      <line x1="33.5" y1="16.5" x2="48" y2="37" />
      <line x1="15.5" y1="43.5" x2="29" y2="49" />
      <line x1="48.5" y1="43.5" x2="35" y2="49" />
      <line x1="17" y1="40" x2="47" y2="40" />
    </svg>
  );
}

function PriceSeriesGlyph() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="6,44 16,36 24,41 34,20 44,29 58,11" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="6" y1="54" x2="58" y2="54" opacity="0.4" />
    </svg>
  );
}

function ClassificationMatrixGlyph() {
  const filled = new Set(['0-0', '1-1', '2-2']);
  const cells = [];
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      cells.push({ r, c, on: filled.has(`${r}-${c}`) });
    }
  }
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
      {cells.map(({ r, c, on }) => (
        <rect
          key={`${r}-${c}`}
          x={10 + c * 15}
          y={10 + r * 15}
          width="13"
          height="13"
          fillOpacity={on ? 0.18 : 0}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

const PROJECTS = [
  {
    index: '01',
    title: 'RAG-powered digital twin',
    line: 'Retrieval-augmented chatbot grounded in a fixed document set.',
    tech: 'React · FastAPI · LangChain · Gemini',
    link: 'https://github.com/aakashPatel123345/Personal-AI-Chatbot',
    Glyph: RetrievalGlyph,
  },
  {
    index: '02',
    title: 'Stock market analysis',
    line: 'Trading platform with real-time lookups and an LLM layer over market data.',
    tech: 'React · OpenAI · Polygon',
    link: '[PROJECT URL]',
    Glyph: PriceSeriesGlyph,
  },
  {
    index: '03',
    title: 'Image classifier',
    line: 'Custom convolutional network trained from scratch, 90% held-out accuracy.',
    tech: 'Python · PyTorch',
    link: '[PROJECT URL]',
    Glyph: ClassificationMatrixGlyph,
  },
];

export default function Work() {
  return (
    <section id="selected-work" className="work">
      <Reveal>
        <SectionHead index="02" label="SELECTED WORK" />
      </Reveal>
      <div className="work__grid">
        {PROJECTS.map((project, i) => (
          <WorkCard key={project.index} {...project} revealIndex={i} />
        ))}
      </div>
    </section>
  );
}
