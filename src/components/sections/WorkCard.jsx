import Reveal from '../Reveal';

export default function WorkCard(props) {
  const {
    index,
    title,
    line,
    tech,
    link,
    linkLabel = 'View project',
    revealIndex,
    demo,
    isDemoOpen,
    onToggleDemo,
  } = props;
  const isPlaceholder = link != null && link.startsWith('[');

  return (
    <Reveal as="article" index={revealIndex} threshold={0.3} className="work-card">
      <div className="work-card__glyph" aria-hidden="true">
        <props.Glyph />
      </div>
      <div className="work-card__index mono-label">{index}</div>
      <h3 className="work-card__title">{title}</h3>
      <p className="work-card__line">{line}</p>
      <p className="work-card__tech mono-label">{tech}</p>
      {demo ? (
        <button
          type="button"
          className="work-card__link work-card__link--button"
          aria-expanded={isDemoOpen}
          aria-controls="demo-stage"
          onClick={onToggleDemo}
        >
          {isDemoOpen ? 'Hide demo →' : 'Live demo →'}
        </button>
      ) : isPlaceholder ? (
        <span className="work-card__link work-card__link--inert">
          {linkLabel} → <span className="bracket">{link}</span>
        </span>
      ) : (
        <a
          className="work-card__link"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${linkLabel} — ${title} (opens in new tab)`}
        >
          {linkLabel} →
        </a>
      )}
    </Reveal>
  );
}
