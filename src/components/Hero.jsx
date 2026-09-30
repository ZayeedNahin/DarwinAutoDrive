import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import SmartImage from './SmartImage.jsx';

/** Large homepage hero. */
export function Hero({ image, badge, title, lead, primary, secondary, stats = [] }) {
  return (
    <section className="hero">
      <div className="hero-media"><SmartImage src={image} alt="Modern vehicle on an open Northern Territory road" loading="eager" /></div>
      <div className="container">
        {badge && <span className="hero-badge"><i>NT</i>{badge}</span>}
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        <div className="hero-ctas">
          {primary && <Link to={primary.to} className="btn btn-primary btn-lg">{primary.label}<ChevronRight size={18} /></Link>}
          {secondary && <Link to={secondary.to} className="btn btn-ghost-light btn-lg">{secondary.label}</Link>}
        </div>
        {stats.length > 0 && (
          <div className="hero-stats">
            {stats.map((s) => <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
          </div>
        )}
      </div>
      <div className="hero-tagline">BUY · SELL · RENT — DARWIN NT</div>
    </section>
  );
}

/** Compact hero used at the top of inner pages. */
export function PageHero({ image, eyebrow, title, text, crumbs = [] }) {
  return (
    <section className="page-hero">
      {image && <div className="page-hero-media"><SmartImage src={image} alt="" /></div>}
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            {crumbs.map((c) => (
              <span key={c.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <ChevronRight size={14} />{c.to ? <Link to={c.to}>{c.label}</Link> : <span style={{ color: '#fff' }}>{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <div style={{ marginTop: 18 }}><span className="eyebrow">{eyebrow}</span></div>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}
