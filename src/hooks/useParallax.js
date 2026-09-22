import { useEffect, useRef, useState } from 'react';

export default function useParallax(factor = 0.08) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = null;
    const update = () => {
      frame = null;
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const distance = rect.top + rect.height / 2 - viewportCenter;
      setOffset(-distance * factor);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [factor]);

  return [ref, offset];
}
