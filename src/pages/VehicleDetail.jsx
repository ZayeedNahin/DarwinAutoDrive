import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ChevronRight, Gauge, Settings2, Fuel, CalendarDays, MapPin, CheckCircle2, ShieldCheck, FileCheck2, Phone, Send, Mail, ArrowLeft } from 'lucide-react';
import VehicleGallery from '../components/VehicleGallery.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import EmailPreview from '../components/EmailPreview.jsx';
import { TextInput, TextArea, validate, makeRef } from '../components/FormFields.jsx';
import { vehicles, formatKm, formatPrice, BUSINESS } from '../data/vehicles.js';
import NotFound from './NotFound.jsx';

export default function VehicleDetail() {
  const { id } = useParams();
  const { hash } = useLocation();
  const v = vehicles.find((x) => x.id === id);

  useEffect(() => {
    if (hash === '#enquire') {
      const t = setTimeout(() => document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
      return () => clearTimeout(t);
    }
  }, [hash, id]);

  if (!v) return <NotFound />;

  const similar = vehicles.filter((x) => x.id !== v.id && (x.type === v.type || x.make === v.make)).slice(0, 3);
  const specs = [
    ['Make', v.make], ['Model', v.model], ['Variant', v.variant], ['Year', v.year],
    ['Price', formatPrice(v.price)], ['Kilometres', formatKm(v.km)], ['Transmission', v.transmission], ['Fuel', v.fuel],
    ['Body type', v.type], ['Colour', v.colour], ['Registration', v.rego], ['Location', v.location],
  ];

  return (
    <>
      <div className="container" style={{ paddingTop: 24 }}>
        <nav className="crumbs" style={{ color: 'var(--muted)' }} aria-label="Breadcrumb">
          <Link to="/">Home</Link><ChevronRight size={14} /><Link to="/buy">Buy a Car</Link><ChevronRight size={14} />
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{v.year} {v.make} {v.model}</span>
        </nav>
      </div>

      <section className="section-sm" style={{ paddingTop: 20 }}>
        <div className="container detail-grid">
          <div>
            <VehicleGallery images={v.images} thumbs={v.thumbs} title={v.title} hasVideo={v.hasVideo} />

            <div className="card card-pad detail-block" style={{ marginTop: 24 }}>
              <h2>About this vehicle</h2>
              <p style={{ color: 'var(--dark-2)', fontSize: 16 }}>{v.description}</p>
            </div>

            <div className="card card-pad detail-block">
              <h2>Vehicle information</h2>
              <div className="spec-table">
                {specs.map(([k, val]) => <div className="spec-row" key={k}><span>{k}</span><strong>{val}</strong></div>)}
              </div>
            </div>

            <div className="card card-pad detail-block">
              <h2>Key features</h2>
              <div className="feature-list">
                {v.features.map((f) => <span key={f}><CheckCircle2 size={16} />{f}</span>)}
              </div>
            </div>

            <EnquiryForm vehicle={v} />
          </div>

          <aside>
            <div className="card detail-summary">
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <StatusBadge status={v.availability} />
                {v.hasVideo && <span className="badge badge-dark">Video available</span>}
              </div>
              <h1>{v.year} {v.make} {v.model}</h1>
              <p className="muted">{v.variant} · {v.colour}</p>
              <div className="detail-price">{formatPrice(v.price)}</div>
              <p className="muted" style={{ fontSize: 13.5 }}>Drive away · Excludes optional extras</p>
              <div className="quick-specs">
                <div><small><Gauge size={12} /> Kilometres</small><strong>{formatKm(v.km)}</strong></div>
                <div><small><CalendarDays size={12} /> Year</small><strong>{v.year}</strong></div>
                <div><small><Settings2 size={12} /> Transmission</small><strong>{v.transmission}</strong></div>
                <div><small><Fuel size={12} /> Fuel</small><strong>{v.fuel}</strong></div>
              </div>
              <p style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14.5, marginBottom: 18 }}>
                <MapPin size={16} color="#F97316" />{v.location}
              </p>
              <div style={{ display: 'grid', gap: 10 }}>
                <a href="#enquire" className="btn btn-primary btn-lg btn-block"><Send size={18} />Enquire About This Vehicle</a>
                <a href={`tel:${BUSINESS.phone}`} className="btn btn-outline btn-lg btn-block"><Phone size={18} />Call {BUSINESS.phone}</a>
              </div>
              <div className="trust-row">
                <div><ShieldCheck size={22} />Inspected</div>
                <div><FileCheck2 size={22} />{v.rego.startsWith('Registered') ? 'Registered NT' : 'Unregistered'}</div>
                <div><MapPin size={22} />Local seller</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="section-sm" style={{ paddingBottom: 88 }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 28, fontWeight: 800 }}>Similar vehicles</h2>
              <Link to="/buy" className="btn btn-outline btn-sm"><ArrowLeft size={16} />Back to all vehicles</Link>
            </div>
            <div className="vehicle-grid">{similar.map((s) => <VehicleCard key={s.id} vehicle={s} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}

function EnquiryForm({ vehicle }) {
  const initial = { name: '', email: '', phone: '', message: `Hi, I'm interested in the ${vehicle.title} (${formatPrice(vehicle.price)}). Is it still available for an inspection or test drive?` };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null);
  const set = (k, val) => { setValues((s) => ({ ...s, [k]: val })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };

  useEffect(() => { setValues(initial); setSent(null); setErrors({}); }, [vehicle.id]); // eslint-disable-line

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(values, {
      name: { required: true, message: 'Please enter your name' },
      email: { required: true, email: true, message: 'Please enter your email' },
      phone: { required: true, phone: true, message: 'Please enter your phone number' },
      message: { required: true, message: 'Please enter a message' },
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent({ ...values, ref: makeRef('ENQ') });
      document.getElementById('enquire')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1000);
  };

  return (
    <div id="enquire" className="card card-pad detail-block" style={{ scrollMarginTop: 90 }}>
      {sent ? (
        <div>
          <div className="confirm-head">
            <div className="confirm-icon"><CheckCircle2 size={40} /></div>
            <h2>Enquiry Received</h2>
            <p>Thank you. Your enquiry has been received. The Darwin Auto Drive team will contact you shortly.</p>
            <div className="confirm-meta">
              <StatusBadge status="Under Review" prefix="Status:" large />
              <span className="ref">Ref: {sent.ref}</span>
            </div>
          </div>
          <div className="notice notice-orange" style={{ marginTop: 22 }}>
            <Mail size={18} /><span>A confirmation email has been sent to your email address (<b>{sent.email}</b>).</span>
          </div>
          <EmailPreview
            to={sent.email}
            name={sent.name}
            subject={`Darwin Auto Drive — Your enquiry about the ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            intro={`We have received your enquiry about the ${vehicle.title} and our team is currently reviewing it. A member of our team will contact you shortly on ${sent.phone} to discuss availability, inspection and next steps.`}
            details={[['Reference', sent.ref], ['Vehicle', vehicle.title], ['Listed price', formatPrice(vehicle.price)]]}
          />
          <div className="confirm-actions">
            <Link to="/buy" className="btn btn-outline">Browse more vehicles</Link>
            <button className="btn btn-dark" onClick={() => { setSent(null); setValues(initial); }}>Send another enquiry</button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <h2>Enquire About This Vehicle</h2>
          <p className="muted" style={{ margin: '-8px 0 22px' }}>Ask a question, book an inspection or arrange a test drive.</p>
          <div className="form-grid">
            <TextInput label="Name" name="name" value={values.name} onChange={set} error={errors.name} required autoComplete="name" />
            <TextInput label="Email" name="email" type="email" value={values.email} onChange={set} error={errors.email} required autoComplete="email" />
            <TextInput label="Phone" name="phone" type="tel" value={values.phone} onChange={set} error={errors.phone} required placeholder="04xx xxx xxx" autoComplete="tel" full />
            <TextArea label="Message" name="message" value={values.message} onChange={set} error={errors.message} required rows={4} />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: 22 }} disabled={sending}>
            {sending ? 'Sending enquiry…' : <><Send size={18} />Send Enquiry</>}
          </button>
        </form>
      )}
    </div>
  );
}
