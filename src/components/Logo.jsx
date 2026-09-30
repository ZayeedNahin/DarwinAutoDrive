import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo({ light = false, onClick }) {
  return (
    <Link to="/" className={`logo ${light ? 'light' : ''}`} onClick={onClick} aria-label="Darwin Auto Drive home">
      <span className="logo-mark"><Car size={22} strokeWidth={2.4} /></span>
      <span className="logo-text">
        <strong>Darwin Auto Drive</strong>
        <span>Buy · Sell · Rent</span>
      </span>
    </Link>
  );
}
