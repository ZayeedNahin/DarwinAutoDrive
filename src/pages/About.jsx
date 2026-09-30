import { Link } from 'react-router-dom';
import { Tag, Search, KeyRound, ArrowRight, Check, MapPin, Users, Sun } from 'lucide-react';
import { PageHero } from '../components/Hero.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { IMAGES } from '../data/vehicles.js';

const HIGHLIGHTS = [
  { icon: Tag, title: 'Sell your vehicle', text: 'Submit your car with photos and documents online. Our team reviews every submission and contacts you personally.', to: '/sell', cta: 'Sell your car' },
  { icon: Search, title: 'Browse vehicles for sale', text: 'Explore quality used cars, utes and 4WDs with detailed photos, video walkarounds and transparent pricing.', to: '/buy', cta: 'Browse vehicles' },
  { icon: KeyRound, title: 'Request a rental', text: 'Tell us the vehicle type and dates you need — we check availability and confirm your booking directly.', to: '/rent', cta: 'Request a rental' },
];

export default function About() {
  return (
    <>
      <PageHero image={IMAGES.about} crumbs={[{ label: 'About Us' }]} eyebrow="About Darwin Auto Drive" title="Your Local Automotive Partner in Darwin"
        text="One convenient place to buy, sell or rent a vehicle in the Top End." />

      <section className="section">
        <div className="container split">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, marginTop: 12 }}>Made in the Territory, for Territorians</h2>
            <p className="muted" style={{ fontSize: 17, marginTop: 16 }}>
              Darwin Auto Drive provides a convenient platform for customers to sell their vehicles, browse vehicles for sale and request vehicle rentals — all in one place, backed by a local team who understands Northern Territory driving.
            </p>
            <p className="muted" style={{ fontSize: 17, marginTop: 14 }}>
              From wet-season commutes to dry-season adventures out to Kakadu and Litchfield, we help people find the right vehicle for the way they live and travel.
            </p>
            <ul className="check-list">
              {['Every request reviewed by a real person', 'Clear, upfront information on every listing', 'Simple online forms — no complicated accounts', 'Local knowledge of NT roads and conditions'].map((t) => (
                <li key={t}><span className="ci"><Check size={16} strokeWidth={3} /></span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="split-media">
            <SmartImage src={IMAGES.sell} alt="Car ready for the road" />
            <div className="floating">
              <span className="fi"><MapPin size={22} /></span>
              <div><strong style={{ display: 'block' }}>Darwin, Northern Territory</strong><span className="muted" style={{ fontSize: 14 }}>Serving Darwin, Palmerston & the Top End</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">What we do</span>
            <h2>Buy. Sell. Rent.</h2>
            <p>Three services, one trusted local team.</p>
          </div>
          <div className="feature-grid">
            {HIGHLIGHTS.map(({ icon: Icon, title, text, to, cta }) => (
              <div key={title} className="card feature" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="fi"><Icon size={24} /></span>
                <h3>{title}</h3>
                <p style={{ flex: 1 }}>{text}</p>
                <Link to={to} className="btn-link btn" style={{ marginTop: 18, alignSelf: 'flex-start' }}>{cta}<ArrowRight size={16} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="feature-grid">
            {[
              { icon: Users, v: 'Local team', t: 'Based in Darwin and available by phone, email or in person.' },
              { icon: Sun, v: 'Top End ready', t: 'Vehicles and advice suited to tropical heat and long distances.' },
              { icon: Check, v: 'No obligation', t: 'Submitting a request never locks you into anything.' },
            ].map(({ icon: Icon, v, t }) => (
              <div key={v} style={{ display: 'flex', gap: 16 }}>
                <span className="service-icon" style={{ flexShrink: 0 }}><Icon size={24} /></span>
                <div><h3 style={{ fontSize: 20 }}>{v}</h3><p className="muted" style={{ marginTop: 6 }}>{t}</p></div>
              </div>
            ))}
          </div>
          <div className="cta-band" style={{ marginTop: 64 }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2>Ready to start your car journey?</h2>
              <p>Talk to the Darwin Auto Drive team today.</p>
            </div>
            <div className="btns">
              <Link to="/contact" className="btn btn-white btn-lg">Contact Us<ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
