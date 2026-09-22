import SectionHead from '../SectionHead';
import Reveal from '../Reveal';
import useParallax from '../../hooks/useParallax';
import heroPicture from '../../assets/hero_picture.jpg';
import '../../styles/components/about-contact.css';

const CONTACT_ROWS = [
  {
    label: 'EMAIL',
    value: 'aakash.patel0377@gmail.com',
    href: 'mailto:aakash.patel0377@gmail.com',
  },
  {
    label: 'LINKEDIN',
    value: 'in/aakash-patel-akp',
    href: 'https://www.linkedin.com/in/aakash-patel-akp/',
  },
  {
    label: 'GITHUB',
    value: 'aakashPatel123345',
    href: 'https://github.com/aakashPatel123345',
  },
];

export default function AboutContact() {
  const [portraitRef, portraitOffset] = useParallax(0.06);

  return (
    <section id="about" className="about-contact">
      <Reveal>
        <SectionHead index="03" label="ABOUT" />
      </Reveal>

      <div className="about-contact__grid">
        <div
          ref={portraitRef}
          className="about-contact__portrait-wrap"
          style={{ transform: `translateY(${portraitOffset}px)` }}
        >
          <Reveal
            as="img"
            threshold={0.3}
            className="about-contact__portrait"
            src={heroPicture}
            alt="Portrait of Aakash Patel"
          />
        </div>
        <Reveal as="div" index={1} className="about-contact__copy">
          <p className="about-contact__name">Aakash Patel</p>
          <p className="about-contact__bio">
            Full-time software engineer at <span className="bracket">[COMPANY]</span>, working in
            .NET, Angular and Azure. Most of my own time goes to LLM systems — the seam where a
            model's output meets a schema, a constraint, and someone who has to trust the result.
          </p>
        </Reveal>
      </div>

      <table id="contact" className="about-contact__table">
        <caption className="visually-hidden">Contact information</caption>
        <tbody>
          {CONTACT_ROWS.map((row, i) => (
            <Reveal
              as="tr"
              key={row.label}
              index={i}
              threshold={0.6}
              className="about-contact__row"
            >
              <th scope="row" className="mono-label about-contact__label">
                {row.label}
              </th>
              <td className="mono-data about-contact__value">{row.value}</td>
              <td className="about-contact__arrow-cell">
                <a
                  className="about-contact__arrow"
                  href={row.href}
                  target={row.href.startsWith('http') ? '_blank' : undefined}
                  rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={`${row.label} — ${row.value}`}
                >
                  →
                </a>
              </td>
            </Reveal>
          ))}
        </tbody>
      </table>
    </section>
  );
}
