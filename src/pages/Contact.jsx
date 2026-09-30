import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { PageHero } from '../components/Hero.jsx';
import ContactForm from '../components/ContactForm.jsx';
import { BUSINESS, IMAGES } from '../data/vehicles.js';

export default function Contact() {
  return (
    <>
      <PageHero image={IMAGES.hero} crumbs={[{ label: 'Contact' }]} eyebrow="Contact us" title="Talk to the Darwin Auto Drive team"
        text="Questions about buying, selling or renting? Send us a message or give us a call." />

      <section className="section-sm" style={{ paddingBottom: 88 }}>
        <div className="container contact-grid">
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="contact-info">
              <h3>Darwin Auto Drive</h3>
              <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 14.5, marginTop: 4 }}>Placeholder contact details for this prototype.</p>
              <div style={{ marginTop: 10 }}>
                <div className="contact-item"><span className="ci"><MapPin size={20} /></span><div><small>Location</small><b>{BUSINESS.address}</b></div></div>
                <div className="contact-item"><span className="ci"><Phone size={20} /></span><div><small>Phone</small><b>{BUSINESS.phone}</b></div></div>
                <div className="contact-item"><span className="ci"><Mail size={20} /></span><div><small>Email</small><b style={{ wordBreak: 'break-all' }}>{BUSINESS.email}</b></div></div>
                <div className="contact-item">
                  <span className="ci"><Clock size={20} /></span>
                  <div style={{ flex: 1 }}>
                    <small>Business Hours (ACST)</small>
                    <div style={{ marginTop: 6 }}>
                      {BUSINESS.hours.map(([d, h]) => <div className="hours-row" key={d}><span>{d}</span><b>{h}</b></div>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>

        <div className="container" style={{ marginTop: 32 }}>
          <div className="map-ph" role="img" aria-label="Map placeholder showing Darwin, Northern Territory">
            <svg className="roads" viewBox="0 0 1000 340" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 250 C 200 230, 350 280, 520 200 S 820 120, 1000 150" stroke="#fff" strokeWidth="14" fill="none" />
              <path d="M0 250 C 200 230, 350 280, 520 200 S 820 120, 1000 150" stroke="#FDBA74" strokeWidth="4" fill="none" />
              <path d="M480 0 C 470 100, 520 160, 500 340" stroke="#fff" strokeWidth="10" fill="none" />
              <path d="M150 0 C 180 120, 120 200, 240 340" stroke="#fff" strokeWidth="7" fill="none" />
              <path d="M760 0 C 720 90, 820 200, 780 340" stroke="#fff" strokeWidth="7" fill="none" />
              <path d="M0 0 H 1000 V 60 C 800 90, 600 40, 400 70 S 100 50, 0 90 Z" fill="#BFDBFE" opacity=".7" />
            </svg>
            <span className="badge badge-solid map-tag"><Navigation size={13} />Map placeholder</span>
            <div className="map-pin"><span className="pin"><MapPin size={24} /></span></div>
            <div className="map-label">Darwin, Northern Territory</div>
          </div>
        </div>
      </section>
    </>
  );
}
