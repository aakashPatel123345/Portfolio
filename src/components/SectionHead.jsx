import '../styles/components/section-head.css';

export default function SectionHead({ index, label }) {
  return (
    <div className="section-head">
      <span className="section-head__index mono-label">{index}</span>
      <span className="section-head__label mono-label">{label}</span>
    </div>
  );
}
