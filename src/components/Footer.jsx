import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Logo from './Logo.jsx';
import { useToast } from './Toast.jsx';
import { BUSINESS } from '../data/vehicles.js';

export default function Footer() {
  const toast = useToast();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo light />
            <div className="tagline">BUY | SELL | RENT</div>
            <p style={{ maxWidth: 320, fontSize: 15 }}>
              Your local automotive partner in Darwin, Northern Territory. Quality vehicles, honest reviews and rentals built for the Top End.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/buy">Buy a Car</Link></li>
              <li><Link to="/sell">Sell Your Car</Link></li>
              <li><Link to="/rent">Rent a Car</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><button className="btn-link" style={{ color: 'inherit', background: 'none', border: 0, padding: 0 }} onClick={() => toast('Privacy Policy — placeholder page in this prototype', 'info')}>Privacy Policy</button></li>
              <li><button className="btn-link" style={{ color: 'inherit', background: 'none', border: 0, padding: 0 }} onClick={() => toast('Terms & Conditions — placeholder page in this prototype', 'info')}>Terms &amp; Conditions</button></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="f-contact">
              <li><MapPin size={17} />{BUSINESS.address}</li>
              <li><Phone size={17} />{BUSINESS.phone}</li>
              <li><Mail size={17} />{BUSINESS.email}</li>
              <li><Clock size={17} />Mon–Fri 8am–5:30pm · Sat 9am–3pm</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Darwin Auto Drive. All rights reserved.</span>
          <div className="links">
            <button onClick={() => toast('Privacy Policy — placeholder page in this prototype', 'info')}>Privacy Policy</button>
            <button onClick={() => toast('Terms & Conditions — placeholder page in this prototype', 'info')}>Terms &amp; Conditions</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
