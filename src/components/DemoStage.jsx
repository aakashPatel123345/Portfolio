import { Suspense, lazy, useEffect, useRef } from 'react';
import '../styles/components/demo-stage.css';

const DEMOS = {
  'image-classifier': {
    label: 'Image classifier',
    note: 'ResNet18, fine-tuned on 74 species from Open Images, quantized to int8.',
    Component: lazy(() => import('./AnimalClassifier')),
  },
  // 'budgeting-ai': {
  //   label: 'Budgeting AI',
  //   note: '',
  //   Component: lazy(() => import('./BudgetingAI')),
  // },
  // 'rag-chatbot': {
  //   label: 'RAG chatbot',
  //   note: '',
  //   Component: lazy(() => import('./RagChatbot')),
  // },
};

export default function DemoStage({ activeId, onClose }) {
  const stageRef = useRef(null);
  const demo = activeId ? DEMOS[activeId] : null;

  useEffect(() => {
    if (!activeId || !stageRef.current) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    stageRef.current.scrollIntoView({
      block: 'nearest',
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [activeId]);

  return (
    <section
      id="demo-stage"
      ref={stageRef}
      className={`demo-stage${demo ? ' demo-stage--open' : ''}`}
    >
      {demo && (
        <>
          <div className="demo-stage__head">
            <span className="demo-stage__badge mono-label">LIVE DEMO</span>
            <h3 className="demo-stage__title">{demo.label}</h3>
            <p className="demo-stage__note">{demo.note}</p>
            <button
              type="button"
              className="demo-stage__close"
              aria-label={`Close ${demo.label} demo`}
              onClick={onClose}
            >
              Close ×
            </button>
          </div>
          <Suspense fallback={<div className="demo-stage__loading mono-label">Loading demo…</div>}>
            <demo.Component key={activeId} />
          </Suspense>
        </>
      )}
    </section>
  );
}
