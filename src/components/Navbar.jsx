import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, ChevronRight, Search, Tag, KeyRound } from 'lucide-react';
import Logo from './Logo.jsx';
import Modal from './Modal.jsx';
import { BUSINESS } from '../data/vehicles.js';

export const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/buy', label: 'Buy a Car' },
  { to: '/sell', label: 'Sell Your Car' },
  { to: '/rent', label: 'Rent a Car' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

const START_OPTIONS = [
  { to: '/buy', icon: Search, title: 'Buy a car', text: 'Browse quality used vehicles in Darwin.' },
  { to: '/sell', icon: Tag, title: 'Sell my car', text: 'Submit your vehicle for review.' },
  { to: '/rent', icon: KeyRound, title: 'Rent a car', text: 'Request a vehicle for your dates.' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <Logo />
          <nav aria-label="Main">
            <ul className="nav-links">
              {NAV_LINKS.map((l) => (
                <li key={l.to}><NavLink to={l.to} end={l.end}>{l.label}</NavLink></li>
              ))}
            </ul>
          </nav>
          <div className="nav-right">
            <a href={`tel:${BUSINESS.phone}`} className="nav-phone"><Phone size={16} />{BUSINESS.phone}</a>
            <button className="btn btn-primary btn-sm" onClick={() => setStart(true)}>Get Started</button>
            <button className="hamburger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="mobile-menu">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="m-link">
              {l.label} <ChevronRight size={20} />
            </NavLink>
          ))}
          <button className="btn btn-primary btn-lg btn-block" onClick={() => { setOpen(false); setStart(true); }}>Get Started</button>
          <a href={`tel:${BUSINESS.phone}`} className="btn btn-outline btn-lg btn-block"><Phone size={18} />{BUSINESS.phone}</a>
        </div>
      )}

      <Modal open={start} onClose={() => setStart(false)} maxWidth={520} labelledBy="start-title">
        <span className="eyebrow">Get started</span>
        <h2 id="start-title" style={{ fontSize: 28, fontWeight: 900, margin: '10px 0 6px' }}>What would you like to do?</h2>
        <p className="muted">Choose a service and we'll take you straight there.</p>
        <div style={{ display: 'grid', gap: 12, marginTop: 22 }}>
          {START_OPTIONS.map(({ to, icon: Icon, title, text }) => (
            <button key={to} className="toggle-row" style={{ textAlign: 'left' }} onClick={() => { setStart(false); navigate(to); }}>
              <span style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <span className="service-icon" style={{ width: 46, height: 46, borderRadius: 12 }}><Icon size={22} /></span>
                <span><strong>{title}</strong><small>{text}</small></span>
              </span>
              <ChevronRight size={20} color="#F97316" />
            </button>
          ))}
        </div>
        <p className="muted" style={{ fontSize: 13, marginTop: 18, textAlign: 'center' }}>
          Questions? <Link to="/contact" onClick={() => setStart(false)} className="accent" style={{ fontWeight: 600 }}>Contact our team</Link>
        </p>
      </Modal>
    </>
  );
}
