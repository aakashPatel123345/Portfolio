import SpendingRoast from '../SpendingRoast';
import Reveal from '../Reveal';
import '../../styles/components/hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__copy">
        <Reveal as="p" index={0} threshold={0.4} className="hero__eyebrow mono-label">
          SOFTWARE ENGINEER · FULL-STACK &amp; AI
        </Reveal>
        <Reveal as="h1" index={1} threshold={0.4} className="hero__headline">
          I build AI systems that{' '}
          <em className="hero__accent">assume the model is wrong.</em>
        </Reveal>
        <Reveal as="p" index={2} threshold={0.4} className="hero__line">
          Full-stack by day — .NET, Angular, Azure. LLM pipelines by design: validation, dedup,
          cost, and a human in the loop.
        </Reveal>
        <Reveal as="div" index={3} threshold={0.4} className="hero__actions">
          <a className="hero__link hero__link--primary" href="#work">
            See the work →
          </a>
          <a className="hero__link" href="#contact">
            Get in touch
          </a>
        </Reveal>
      </div>
      <Reveal as="div" index={1} threshold={0.2} className="hero__demo">
        <SpendingRoast />
      </Reveal>
    </section>
  );
}
