import { createElement } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Reveal({
  as = 'div',
  index = 0,
  threshold = 0.2,
  className = '',
  style,
  children,
  ...rest
}) {
  const [ref, visible] = useScrollReveal(threshold);

  return createElement(
    as,
    {
      ref,
      className: `reveal${visible ? ' reveal--visible' : ''}${className ? ` ${className}` : ''}`,
      style: { ...style, '--i': index },
      ...rest,
    },
    children,
  );
}
