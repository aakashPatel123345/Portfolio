import useTheme from '../hooks/useTheme';
import '../styles/components/nav-rail.css';

const LINKS = [
  { label: '01 WORK', href: '#work' },
  { label: '02 ABOUT', href: '#about' },
  { label: '03 CONTACT', href: '#contact' },
];

export default function NavRail() {
  const [theme, toggleTheme] = useTheme();

  return (
    <header className="nav-rail">
      <a className="nav-rail__mark mono-label" href="#top">
        AAKASH PATEL
      </a>
      <nav className="nav-rail__links" aria-label="Primary">
        {LINKS.map((link) => (
          <a key={link.href} className="nav-rail__link mono-label" href={link.href}>
            {link.label}
          </a>
        ))}
        <button
          type="button"
          className="nav-rail__theme mono-label"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? 'LIGHT' : 'DARK'}
        </button>
        <a
          className="nav-rail__email mono-label"
          href="mailto:aakash.patel0377@gmail.com"
        >
          EMAIL →
        </a>
      </nav>
    </header>
  );
}
