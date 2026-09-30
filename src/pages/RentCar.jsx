import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, CalendarDays, Car, Sparkles, Search, Check, CheckCircle2, Users, Info, Plane, ShieldCheck, Clock } from 'lucide-react';
import { PageHero } from '../components/Hero.jsx';
import { TextInput, SelectInput, TextArea, Segmented, ToggleRow, Field, validate, makeRef } from '../components/FormFields.jsx';
import AvailabilityCard from '../components/AvailabilityCard.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import { IMAGES, rentalFleet, rentalLocations, formatPrice } from '../data/vehicles.js';

const TYPES = [
  { key: 'Economy', text: 'City & short trips' },
  { key: 'Compact', text: 'Easy to park' },
  { key: 'Sedan', text: 'Comfort & space' },
  { key: 'SUV', text: 'Family favourite' },
  { key: '4WD', text: 'Kakadu & Litchfield' },
  { key: 'Ute', text: 'Work & hauling' },
  { key: 'Van', text: 'Groups up to 12' },
];

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };

const initial = (type) => ({
  fullName: '', email: '', phone: '', licence: '', contactMethod: 'Phone',
  pickupDate: addDays(1), pickupTime: '09:00', returnDate: addDays(5), returnTime: '09:00',
  pickupLocation: rentalLocations[0], returnLocation: rentalLocations[0],
  vehicleType: type && rentalFleet[type] ? type : '',
  passengers: '2', additionalDriver: false, childSeat: false, special: '', notes: '',
});

const CHECK_STEPS = ['Checking fleet for your dates', 'Matching your vehicle type', 'Calculating indicative rate'];

export default function RentCar() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [values, setValues] = useState(() => initial(params.get('type')));
  const [errors, setErrors] = useState({});
  const [phase, setPhase] = useState('form'); // form | checking | result
  const [checkStep, setCheckStep] = useState(0);
  const [done, setDone] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const set = (k, v) => { setValues((s) => ({ ...s, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };
  const top = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const quote = useMemo(() => {
    const v = rentalFleet[values.vehicleType];
    if (!v) return null;
    const start = new Date(`${values.pickupDate}T${values.pickupTime || '00:00'}`);
    const end = new Date(`${values.returnDate}T${values.returnTime || '00:00'}`);
    const days = Math.max(1, Math.ceil((end - start) / 86400000));
    const extras = [];
    if (values.additionalDriver) extras.push(['Additional driver ($8/day)', 8 * days]);
    if (values.childSeat) extras.push(['Child seat ($10/day)', 10 * days]);
    const total = v.rate * days + extras.reduce((n, [, c]) => n + c, 0);
    return { vehicle: v, days, extras, total };
  }, [values]);

  useEffect(() => {
    if (phase !== 'checking') return;
    setCheckStep(0);
    const timers = [
      setTimeout(() => setCheckStep(1), 700),
      setTimeout(() => setCheckStep(2), 1400),
      setTimeout(() => setCheckStep(3), 2100),
      setTimeout(() => setPhase('result'), 2600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(values, {
      fullName: { required: true, message: 'Please enter your full name' },
      email: { required: true, email: true, message: 'Please enter your email' },
      phone: { required: true, phone: true, message: 'Please enter your phone number' },
      licence: { required: true, message: 'Please enter your licence number' },
      pickupDate: { required: true, custom: (v) => (v && v < addDays(0) ? 'Pickup date cannot be in the past' : '') },
      pickupTime: { required: true },
      returnDate: {
        required: true,
        custom: (v, all) => (v && new Date(`${v}T${all.returnTime}`) <= new Date(`${all.pickupDate}T${all.pickupTime}`) ? 'Return must be after pickup' : ''),
      },
      returnTime: { required: true },
      vehicleType: { required: true, message: 'Please choose a vehicle type' },
    });
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(first === 'vehicleType' ? 'vehicle-section' : first)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setPhase('checking');
    top();
  };

  const requestVehicle = () => {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone({ ref: makeRef('RENT') }); }, 900);
  };

  const chooseAnother = () => {
    setPhase('form');
    setValues((v) => ({ ...v, vehicleType: '' }));
    setTimeout(() => document.getElementById('vehicle-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const reset = () => { setValues(initial()); setPhase('form'); setDone(null); top(); };

  return (
    <>
      <PageHero
        image={IMAGES.rent}
        crumbs={[{ label: 'Rent a Car' }]}
        eyebrow="Rentals"
        title="Rent a Car in Darwin"
        text="Choose your vehicle type, rental dates and requirements. Our team will check availability and contact you to confirm your booking."
      />

      <section className="section-sm" style={{ paddingBottom: 88 }}>
        <div className="container">
          {phase === 'checking' && (
            <div className="card checking" aria-live="polite">
              <div className="spinner" />
              <h2>Checking vehicle availability...</h2>
              <p className="muted" style={{ marginTop: 8 }}>{values.vehicleType} · {values.pickupDate} → {values.returnDate}</p>
              <div className="check-steps">
                {CHECK_STEPS.map((s, i) => (
                  <div key={s} className={checkStep > i ? 'on' : ''}>
                    {checkStep > i ? <CheckCircle2 size={18} /> : <Clock size={18} />}{s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {phase === 'result' && quote && (
            <>
              <div style={{ marginBottom: 20 }}>
                <span className="eyebrow">Availability result</span>
                <h2 style={{ fontSize: 30, fontWeight: 900, marginTop: 8 }}>Good news, {values.fullName.split(' ')[0]}!</h2>
              </div>
              <AvailabilityCard
                vehicle={quote.vehicle}
                request={values}
                days={quote.days}
                extras={quote.extras}
                total={quote.total}
                onRequest={requestVehicle}
                onChooseAnother={chooseAnother}
              />
              {submitting && <p className="muted" style={{ textAlign: 'center', marginTop: 16 }}>Sending your rental request…</p>}
            </>
          )}

          {phase === 'form' && (
            <div className="two-col">
              <form onSubmit={submit} noValidate>
                <div className="card form-section">
                  <div className="form-section-head">
                    <span className="step-no"><User size={20} /></span>
                    <div><h2>Customer information</h2><p>We'll use these details to confirm your booking.</p></div>
                  </div>
                  <div className="form-grid">
                    <TextInput label="Full Name" name="fullName" value={values.fullName} onChange={set} error={errors.fullName} required autoComplete="name" />
                    <TextInput label="Email" name="email" type="email" value={values.email} onChange={set} error={errors.email} required autoComplete="email" />
                    <TextInput label="Phone" name="phone" type="tel" value={values.phone} onChange={set} error={errors.phone} required placeholder="04xx xxx xxx" autoComplete="tel" />
                    <TextInput label="Driver Licence Number" name="licence" value={values.licence} onChange={set} error={errors.licence} required placeholder="Prototype — use a sample number" />
                    <Segmented label="Preferred Contact Method" name="contactMethod" value={values.contactMethod} onChange={set} options={['Phone', 'Email', 'SMS']} full />
                  </div>
                </div>

                <div className="card form-section">
                  <div className="form-section-head">
                    <span className="step-no"><CalendarDays size={20} /></span>
                    <div><h2>Rental details</h2><p>When and where would you like the vehicle?</p></div>
                  </div>
                  <div className="form-grid">
                    <TextInput label="Pickup Date" name="pickupDate" type="date" min={addDays(0)} value={values.pickupDate} onChange={set} error={errors.pickupDate} required />
                    <TextInput label="Pickup Time" name="pickupTime" type="time" value={values.pickupTime} onChange={set} error={errors.pickupTime} required />
                    <TextInput label="Return Date" name="returnDate" type="date" min={values.pickupDate} value={values.returnDate} onChange={set} error={errors.returnDate} required />
                    <TextInput label="Return Time" name="returnTime" type="time" value={values.returnTime} onChange={set} error={errors.returnTime} required />
                    <SelectInput label="Pickup Location" name="pickupLocation" value={values.pickupLocation} onChange={set} options={rentalLocations} />
                    <SelectInput label="Return Location" name="returnLocation" value={values.returnLocation} onChange={set} options={rentalLocations} />
                  </div>
                </div>

                <div className="card form-section" id="vehicle-section" style={{ scrollMarginTop: 90 }}>
                  <div className="form-section-head">
                    <span className="step-no"><Car size={20} /></span>
                    <div><h2>Vehicle selection</h2><p>Choose a category — we'll match you with an available vehicle.</p></div>
                  </div>
                  <Field error={errors.vehicleType}>
                    <div className="type-select" role="radiogroup" aria-label="Vehicle type">
                      {TYPES.map((t) => {
                        const on = values.vehicleType === t.key;
                        return (
                          <button type="button" key={t.key} role="radio" aria-checked={on} className={`type-option ${on ? 'on' : ''}`} onClick={() => set('vehicleType', t.key)}>
                            {on && <span className="t-check"><Check size={13} strokeWidth={3} /></span>}
                            <Car size={24} className="t-icon" />
                            <strong>{t.key}</strong>
                            <small>{t.text}</small>
                            <small style={{ color: 'var(--orange-700)', fontWeight: 700 }}>from {formatPrice(rentalFleet[t.key].rate)}/day</small>
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                </div>

                <div className="card form-section">
                  <div className="form-section-head">
                    <span className="step-no"><Sparkles size={20} /></span>
                    <div><h2>Optional extras</h2><p>Let us know anything that will make your trip easier.</p></div>
                  </div>
                  <div className="form-grid">
                    <SelectInput label="Number of Passengers" name="passengers" value={values.passengers} onChange={set} options={['1', '2', '3', '4', '5', '6', '7', '8+']} placeholder="Select" />
                    <SelectInput label="Special Requirements" name="special" value={values.special} onChange={set} options={['None', 'Tow bar', 'Roof racks', 'Unsealed road use', 'Airport meet & greet', 'Other (see notes)']} placeholder="None" />
                    <ToggleRow name="additionalDriver" title="Additional Driver" text="+$8 per day" checked={values.additionalDriver} onChange={set} />
                    <ToggleRow name="childSeat" title="Child Seat" text="+$10 per day" checked={values.childSeat} onChange={set} />
                    <TextArea label="Additional Notes" name="notes" value={values.notes} onChange={set} rows={3} placeholder="Flight number, travel plans, anything else we should know" />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg btn-block" style={{ marginTop: 26 }}>
                    <Search size={18} />Check Availability &amp; Request Rental
                  </button>
                  <p className="muted" style={{ textAlign: 'center', fontSize: 13, marginTop: 12 }}>No payment required. Your booking is only confirmed once our team contacts you.</p>
                </div>
              </form>

              <aside className="card aside-card">
                <h3>Your rental summary</h3>
                {quote ? (
                  <>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>{quote.vehicle.category}</p>
                    <p className="muted" style={{ fontSize: 14 }}>{quote.vehicle.name} or similar · <Users size={13} style={{ verticalAlign: -2 }} /> {quote.vehicle.seats}</p>
                    <div className="avail-rows" style={{ marginTop: 10 }}>
                      <div><span>{quote.days} {quote.days === 1 ? 'day' : 'days'} × {formatPrice(quote.vehicle.rate)}</span><strong>{formatPrice(quote.vehicle.rate * quote.days)}</strong></div>
                      {quote.extras.map(([l, c]) => <div key={l}><span>{l.split(' (')[0]}</span><strong>{formatPrice(c)}</strong></div>)}
                      <div style={{ borderBottom: 0 }}><span style={{ color: 'var(--ink)', fontWeight: 700 }}>Estimated total</span><strong style={{ fontSize: 20, color: 'var(--orange-700)' }}>{formatPrice(quote.total)}</strong></div>
                    </div>
                  </>
                ) : (
                  <p className="muted" style={{ fontSize: 14.5 }}>Select a vehicle type to see an indicative price.</p>
                )}
                <ul className="aside-list" style={{ marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
                  <li><Plane size={18} /><div><b>Airport & CBD pickup</b><span>Plus Winnellie, Palmerston & Casuarina.</span></div></li>
                  <li><ShieldCheck size={18} /><div><b>Standard cover included</b><span>Excess reduction options available.</span></div></li>
                  <li><Info size={18} /><div><b>Indicative pricing</b><span>Final price confirmed by our team.</span></div></li>
                </ul>
              </aside>
            </div>
          )}
        </div>
      </section>

      <ConfirmationModal
        open={!!done}
        onClose={() => { reset(); navigate('/'); }}
        title="Rental Request Submitted"
        message="Thank you. Your rental request has been received. Our Darwin Auto Drive team will confirm vehicle availability and contact you with the next steps."
        status="Pending Confirmation"
        reference={done?.ref}
        email={done && quote && {
          to: values.email,
          name: values.fullName,
          subject: 'Darwin Auto Drive — Your Rental Request Is Pending Confirmation',
          intro: 'We have received your rental request and our team is currently checking vehicle availability. Your booking is not yet confirmed — a member of our team will contact you shortly to confirm the vehicle, pricing and pickup details.',
          details: [
            ['Reference', done.ref],
            ['Vehicle', `${quote.vehicle.name} (${quote.vehicle.category})`],
            ['Pickup', `${values.pickupDate} ${values.pickupTime} — ${values.pickupLocation}`],
            ['Return', `${values.returnDate} ${values.returnTime} — ${values.returnLocation}`],
            ['Estimated total', formatPrice(quote.total)],
          ],
        }}
        actions={
          <>
            <button className="btn btn-primary btn-lg" onClick={() => { reset(); navigate('/'); }}>Return to Home</button>
            <button className="btn btn-outline btn-lg" onClick={reset}>Make another request</button>
          </>
        }
      />
    </>
  );
}
