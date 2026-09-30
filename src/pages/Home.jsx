import { Link } from 'react-router-dom';
import { Search, Tag, KeyRound, ArrowRight, ShieldCheck, MapPin, BadgeCheck, Handshake, Check, Sun } from 'lucide-react';
import { Hero } from '../components/Hero.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { IMAGES, vehicles, rentalFleet, formatPrice } from '../data/vehicles.js';

const SERVICES = [
  { number: '01', icon: Search, title: 'Buy a Car', text: 'Browse available vehicles with photos, videos, specifications and pricing.', cta: 'Browse Vehicles', to: '/buy' },
  { number: '02', icon: Tag, title: 'Sell Your Car', text: 'Submit your vehicle details and documents to the Darwin Auto Drive team for review.', cta: 'Sell My Car', to: '/sell' },
  { number: '03', icon: KeyRound, title: 'Rent a Car', text: 'Request a vehicle based on your preferred vehicle type, dates and rental requirements.', cta: 'Request a Rental', to: '/rent' },
];

const STEPS = [
  { t: 'Tell us what you need', p: 'Browse listings, submit your car or request a rental in a few minutes.' },
  { t: 'We review everything', p: 'Our local team checks vehicle details, documents and availability.' },
  { t: 'We get in touch', p: 'Expect a call or email from a real person in Darwin — not a bot.' },
  { t: 'Drive away', p: 'Inspect, sign and hit the road with confidence.' },
];

export default function Home() {
  const featured = vehicles.filter((v) => v.featured).slice(0, 3);
  const fleetPreview = ['Compact', 'SUV', '4WD', 'Ute'].map((k) => rentalFleet[k]);

  return (
    <>
      <Hero
        image={IMAGES.hero}
        badge="Local to Darwin, Northern Territory"
        title={<>Your Car Journey <span>Starts Here.</span></>}
        lead="Buy, sell or rent with Darwin Auto Drive — your local automotive partner in Darwin, Northern Territory."
        primary={{ to: '/buy', label: 'Browse Cars' }}
        secondary={{ to: '/sell', label: 'Sell Your Car' }}
        stats={[
          { value: `${vehicles.length}+`, label: 'Vehicles listed' },
          { value: '24 hr', label: 'Typical review time' },
          { value: '7', label: 'Rental categories' },
        ]}
      />

      <section className="services" aria-label="Our services">
        <div className="container">
          <div className="service-grid">
            {SERVICES.map((s) => <ServiceCard key={s.title} {...s} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 36 }}>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="eyebrow">Featured vehicles</span>
              <h2>Fresh on the lot this week</h2>
              <p>Hand-picked, inspected vehicles ready for Top End roads.</p>
            </div>
            <Link to="/buy" className="btn btn-outline">View all vehicles<ArrowRight size={17} /></Link>
          </div>
          <div className="vehicle-grid">
            {featured.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="stripe-deco" aria-hidden="true" />
        <div className="container" style={{ position: 'relative' }}>
          <div className="section-head">
            <span className="eyebrow" style={{ color: '#FDBA74' }}>How it works</span>
            <h2>Simple, transparent and handled locally</h2>
            <p className="muted">Whether you're buying, selling or renting, every request is reviewed by our Darwin team.</p>
          </div>
          <div className="steps-row">
            {STEPS.map((s, i) => (
              <div key={s.t} className="step-card" style={{ background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.1)' }}>
                <span className="sn">STEP 0{i + 1}</span>
                <h4 style={{ color: '#fff' }}>{s.t}</h4>
                <p style={{ color: 'rgba(255,255,255,.62)' }}>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="split-media">
            <SmartImage src={IMAGES.rent} alt="SUV driving on an outback road" />
            <div className="floating">
              <span className="fi"><Sun size={22} /></span>
              <div><strong style={{ display: 'block' }}>Built for the Top End</strong><span className="muted" style={{ fontSize: 14 }}>From city runabouts to Kakadu-ready 4WDs.</span></div>
            </div>
          </div>
          <div>
            <span className="eyebrow">Rent a car</span>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, marginTop: 12 }}>The right vehicle for every Territory trip</h2>
            <p className="muted" style={{ fontSize: 17, marginTop: 14 }}>
              Pick a vehicle type and your dates — we'll check availability and confirm with you directly. Airport and CBD pickup available.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 24 }}>
              {fleetPreview.map((f) => (
                <Link to={`/rent?type=${encodeURIComponent(f.category)}`} key={f.category} className="card" style={{ padding: 16, display: 'block' }}>
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: 17 }}>{f.category}</strong>
                  <div className="muted" style={{ fontSize: 13.5 }}>from <b style={{ color: 'var(--orange-700)' }}>{formatPrice(f.rate)}</b>/day</div>
                </Link>
              ))}
            </div>
            <Link to="/rent" className="btn btn-primary btn-lg" style={{ marginTop: 28 }}>Request a Rental<ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Why Darwin Auto Drive</span>
            <h2>Local people. Honest process.</h2>
          </div>
          <div className="feature-grid">
            {[
              { icon: MapPin, t: 'Darwin based', p: 'We know NT conditions — heat, humidity, wet season and long highway kilometres.' },
              { icon: ShieldCheck, t: 'Checked & verified', p: 'Every vehicle and seller submission is reviewed before anything moves forward.' },
              { icon: Handshake, t: 'No-pressure service', p: 'Clear pricing, straight answers and a real person on the phone.' },
            ].map(({ icon: Icon, t, p }) => (
              <div key={t} className="card feature">
                <span className="fi"><Icon size={24} /></span>
                <h3>{t}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2>Thinking of selling? Get your car reviewed by our team.</h2>
              <p><Check size={16} style={{ verticalAlign: -3 }} /> Free submission &nbsp; <BadgeCheck size={16} style={{ verticalAlign: -3 }} /> Local review &nbsp; <Check size={16} style={{ verticalAlign: -3 }} /> No obligation</p>
            </div>
            <div className="btns">
              <Link to="/sell" className="btn btn-white btn-lg">Sell My Car<ArrowRight size={18} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
