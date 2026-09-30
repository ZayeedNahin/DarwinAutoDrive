import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ number, icon: Icon, title, text, cta, to }) {
  return (
    <article className="service-card">
      <span className="num" aria-hidden="true">{number}</span>
      <span className="service-icon"><Icon size={26} /></span>
      <h3>{title}</h3>
      <p>{text}</p>
      <Link to={to} className="btn btn-dark">{cta}<ArrowRight size={17} /></Link>
    </article>
  );
}
