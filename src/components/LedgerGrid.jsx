import { useEffect, useRef } from 'react';
import '../styles/components/ledger-grid.css';

export default function LedgerGrid() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    let frame = null;
    const handlePointerMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        node.style.setProperty('--cursor-x', `${event.clientX}px`);
        node.style.setProperty('--cursor-y', `${event.clientY}px`);
        frame = null;
      });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="ledger-grid" ref={ref} aria-hidden="true">
      <div className="ledger-grid__base" />
      <div className="ledger-grid__spotlight" />
    </div>
  );
}
