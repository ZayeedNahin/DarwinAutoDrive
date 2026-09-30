import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Send, User, Car, ClipboardCheck, Camera, FileText, Lock, Clock, PhoneCall, BadgeCheck, Info } from 'lucide-react';
import { PageHero } from '../components/Hero.jsx';
import { TextInput, SelectInput, TextArea, Segmented, Checkbox, validate, makeRef } from '../components/FormFields.jsx';
import FileUpload from '../components/FileUpload.jsx';
import ConfirmationModal from '../components/ConfirmationModal.jsx';
import { IMAGES, makes, vehicleTypes, transmissions, fuelTypes, formatPrice } from '../data/vehicles.js';

const STEPS = [
  { key: 'customer', label: 'Your details', icon: User, title: 'Customer Information', text: 'How can our team reach you about this vehicle?' },
  { key: 'vehicle', label: 'Vehicle', icon: Car, title: 'Vehicle Information', text: 'Tell us about the car you would like to sell.' },
  { key: 'condition', label: 'Condition', icon: ClipboardCheck, title: 'Vehicle Condition', text: 'An honest description helps us review your vehicle faster.' },
  { key: 'media', label: 'Photos & video', icon: Camera, title: 'Upload Vehicle Media', text: 'Clear photos help us assess your vehicle before we call you.' },
  { key: 'docs', label: 'Documents', icon: FileText, title: 'Required Documents', text: 'Supporting documents allow our team to verify ownership.' },
];

const INITIAL = {
  fullName: '', email: '', phone: '', contactMethod: 'Phone',
  make: '', model: '', year: '', variant: '', km: '', rego: '', vin: '', vehicleType: '', transmission: '', fuel: '', askingPrice: '', location: '',
  condition: '', accident: '', serviceHistory: '', finance: '', issues: '', comments: '',
  consent: false,
};

const MEDIA = [
  { key: 'exterior', label: 'Exterior Photos', hint: 'Front, rear, both sides and ¾ angles' },
  { key: 'interior', label: 'Interior Photos', hint: 'Front seats, rear seats, boot / tray' },
  { key: 'dash', label: 'Dashboard / Odometer', hint: 'Clear shot of the odometer reading' },
  { key: 'additional', label: 'Additional Photos', hint: 'Damage, accessories, tyres, engine bay' },
  { key: 'video', label: 'Vehicle Video', accept: 'video/*', hint: 'Optional walkaround video — MP4 or MOV' },
];
const DOCS = [
  { key: 'licence', label: 'Driver Licence', required: true },
  { key: 'registration', label: 'Vehicle Registration', required: true },
  { key: 'insurance', label: 'Insurance Documents' },
  { key: 'ownership', label: 'Proof of Ownership', required: true },
  { key: 'other', label: 'Other Supporting Documents' },
];

const RULES = [
  {
    fullName: { required: true, message: 'Please enter your full name' },
    email: { required: true, email: true, message: 'Please enter your email' },
    phone: { required: true, phone: true, message: 'Please enter your phone number' },
    contactMethod: { required: true },
  },
  {
    make: { required: true, message: 'Select a make' },
    model: { required: true, message: 'Enter the model' },
    year: { required: true, message: 'Select a year' },
    km: { required: true, message: 'Enter the kilometres' },
    rego: { required: true, message: 'Enter the registration number' },
    vehicleType: { required: true, message: 'Select a vehicle type' },
    transmission: { required: true, message: 'Select a transmission' },
    fuel: { required: true, message: 'Select a fuel type' },
    location: { required: true, message: 'Enter the vehicle location' },
    vin: { custom: (v) => (v && v.replace(/\s/g, '').length !== 17 ? 'A VIN is 17 characters' : '') },
  },
  {
    condition: { required: true, message: 'Select the overall condition' },
    accident: { required: true, message: 'Please select an option' },
    serviceHistory: { required: true, message: 'Please select an option' },
    finance: { required: true, message: 'Please select an option' },
  },
  {},
  { consent: { required: true, message: 'Please confirm to submit your vehicle' } },
];

const years = Array.from({ length: 27 }, (_, i) => String(2026 - i));

export default function SellCar() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [values, setValues] = useState(INITIAL);
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(null);

  const set = (k, v) => { setValues((s) => ({ ...s, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };
  const setFile = (k) => (list) => { setFiles((f) => ({ ...f, [k]: list })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };
  const scrollTop = () => document.getElementById('sell-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const check = (i) => {
    let errs = validate(values, RULES[i]);
    if (i === 3 && !(files.exterior?.length)) errs.exterior = 'Please add at least one exterior photo';
    if (i === 4) DOCS.filter((d) => d.required && !files[d.key]?.length).forEach((d) => { errs[d.key] = `${d.label} is required`; });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!check(step)) return;
    const n = step + 1;
    setStep(n); setMaxStep((m) => Math.max(m, n)); scrollTop();
  };
  const back = () => { setErrors({}); setStep((s) => s - 1); scrollTop(); };

  const submit = (e) => {
    e.preventDefault();
    if (!check(4)) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone({ ref: makeRef('SELL') }); }, 1300);
  };

  const reset = () => { setValues(INITIAL); setFiles({}); setStep(0); setMaxStep(0); setDone(null); };
  const S = STEPS[step];
  const fileCount = Object.values(files).reduce((n, l) => n + (l?.length || 0), 0);

  return (
    <>
      <PageHero
        image={IMAGES.sell}
        crumbs={[{ label: 'Sell Your Car' }]}
        eyebrow="Sell your car"
        title="Sell Your Car With Darwin Auto Drive"
        text="Tell us about your vehicle and our team will review your request and contact you to discuss the next steps."
      />

      <section className="section-sm" style={{ paddingBottom: 88 }}>
        <div className="container two-col">
          <form id="sell-form" onSubmit={submit} noValidate style={{ scrollMarginTop: 90 }}>
            <div className="stepper" aria-label="Form progress">
              {STEPS.map((s, i) => (
                <button type="button" key={s.key} className={i < step ? 'done' : i === step ? 'current' : ''} disabled={i > maxStep}
                  onClick={() => { if (i <= maxStep) { setErrors({}); setStep(i); } }} aria-current={i === step ? 'step' : undefined}>
                  <span className="bar"><i /></span>
                  <span className="s-label"><b>{i + 1}</b><em style={{ fontStyle: 'normal' }}>{s.label}</em></span>
                </button>
              ))}
            </div>

            <div className="card form-section">
              <div className="form-section-head">
                <span className="step-no"><S.icon size={20} /></span>
                <div>
                  <span className="muted" style={{ fontSize: 13, fontWeight: 600 }}>Step {step + 1} of {STEPS.length}</span>
                  <h2>{S.title}</h2>
                  <p>{S.text}</p>
                </div>
              </div>

              {step === 0 && (
                <div className="form-grid">
                  <TextInput label="Full Name" name="fullName" value={values.fullName} onChange={set} error={errors.fullName} required autoComplete="name" full />
                  <TextInput label="Email" name="email" type="email" value={values.email} onChange={set} error={errors.email} required autoComplete="email" />
                  <TextInput label="Phone Number" name="phone" type="tel" value={values.phone} onChange={set} error={errors.phone} required placeholder="04xx xxx xxx" autoComplete="tel" />
                  <Segmented label="Preferred Contact Method" name="contactMethod" value={values.contactMethod} onChange={set} options={['Phone', 'Email', 'SMS']} required full />
                </div>
              )}

              {step === 1 && (
                <div className="form-grid cols-3">
                  <SelectInput label="Make" name="make" value={values.make} onChange={set} options={[...makes, 'Holden', 'Nissan', 'Subaru', 'Volkswagen', 'Other'].sort()} error={errors.make} required />
                  <TextInput label="Model" name="model" value={values.model} onChange={set} error={errors.model} required placeholder="e.g. HiLux" />
                  <SelectInput label="Year" name="year" value={values.year} onChange={set} options={years} error={errors.year} required />
                  <TextInput label="Variant" name="variant" value={values.variant} onChange={set} placeholder="e.g. SR5 4x4" />
                  <TextInput label="Kilometres" name="km" type="number" min="0" inputMode="numeric" value={values.km} onChange={set} error={errors.km} required placeholder="e.g. 85000" />
                  <TextInput label="Registration Number" name="rego" value={values.rego} onChange={set} error={errors.rego} required placeholder="e.g. CA12BC" style={{ textTransform: 'uppercase' }} />
                  <TextInput label="VIN" name="vin" value={values.vin} onChange={set} error={errors.vin} placeholder="17-character VIN" maxLength={17} style={{ textTransform: 'uppercase' }} hint="Found on your rego papers" />
                  <SelectInput label="Vehicle Type" name="vehicleType" value={values.vehicleType} onChange={set} options={[...vehicleTypes, 'Wagon', 'Coupe', 'Convertible']} error={errors.vehicleType} required />
                  <SelectInput label="Transmission" name="transmission" value={values.transmission} onChange={set} options={transmissions} error={errors.transmission} required />
                  <SelectInput label="Fuel Type" name="fuel" value={values.fuel} onChange={set} options={fuelTypes} error={errors.fuel} required />
                  <TextInput label="Asking Price" name="askingPrice" type="number" min="0" inputMode="numeric" prefix="$" value={values.askingPrice} onChange={set} placeholder="Optional" />
                  <TextInput label="Vehicle Location" name="location" value={values.location} onChange={set} error={errors.location} required placeholder="Suburb, NT" />
                </div>
              )}

              {step === 2 && (
                <div className="form-grid">
                  <Segmented label="Overall Condition" name="condition" value={values.condition} onChange={set} options={['Excellent', 'Good', 'Fair', 'Needs work']} error={errors.condition} required full />
                  <Segmented label="Accident History" name="accident" value={values.accident} onChange={set} options={['No accidents', 'Minor repairs', 'Major repairs', 'Unsure']} error={errors.accident} required full />
                  <Segmented label="Service History" name="serviceHistory" value={values.serviceHistory} onChange={set} options={['Full history', 'Partial history', 'None']} error={errors.serviceHistory} required full />
                  <Segmented label="Existing Finance" name="finance" value={values.finance} onChange={set} options={['No', 'Yes', 'Unsure']} error={errors.finance} required full />
                  <TextArea label="Known Issues" name="issues" value={values.issues} onChange={set} rows={3} placeholder="Warning lights, mechanical issues, body damage, air-con performance…" />
                  <TextArea label="Additional Comments" name="comments" value={values.comments} onChange={set} rows={3} placeholder="Accessories, recent work, tyres, anything else we should know" />
                  {values.finance === 'Yes' && (
                    <div className="notice notice-amber full"><Info size={18} /><span>No problem — our team will talk you through payout options when we contact you.</span></div>
                  )}
                </div>
              )}

              {step === 3 && (
                <>
                  <div className="notice notice-blue" style={{ marginBottom: 22 }}>
                    <Info size={18} /><span><b>Prototype upload fields.</b> Files stay in your browser for preview only — nothing is uploaded or stored.</span>
                  </div>
                  <div className="upload-grid">
                    {MEDIA.map((m) => (
                      <FileUpload key={m.key} label={m.label} hint={m.hint} accept={m.accept || 'image/*'} multiple={m.key !== 'video'}
                        files={files[m.key] || []} onChange={setFile(m.key)} required={m.key === 'exterior'} error={errors[m.key]} />
                    ))}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <div className="notice notice-blue" style={{ marginBottom: 22 }}>
                    <Lock size={18} /><span><b>Prototype upload fields — for demonstration only.</b> Documents are not uploaded, verified or stored. Please don't use real identity documents in this demo.</span>
                  </div>
                  <div className="upload-grid">
                    {DOCS.map((d) => (
                      <FileUpload key={d.key} label={d.label} accept="image/*,.pdf" multiple={d.key === 'other' || d.key === 'insurance'}
                        files={files[d.key] || []} onChange={setFile(d.key)} required={d.required} error={errors[d.key]} />
                    ))}
                  </div>
                  <div style={{ marginTop: 26, padding: 18, borderRadius: 14, background: 'var(--bg)', border: '1px solid var(--border)' }}>
                    <Checkbox name="consent" checked={values.consent} onChange={set} error={errors.consent}>
                      I confirm that the information provided is accurate and I agree that Darwin Auto Drive may contact me regarding this vehicle.
                    </Checkbox>
                  </div>
                </>
              )}

              {Object.values(errors).some(Boolean) && (
                <div className="notice notice-amber" style={{ marginTop: 22 }} role="alert"><Info size={18} /><span>Please complete the highlighted fields to continue.</span></div>
              )}

              <div className="form-nav">
                {step > 0 ? <button type="button" className="btn btn-outline" onClick={back}><ArrowLeft size={17} />Back</button> : <span />}
                {step < STEPS.length - 1 ? (
                  <button type="button" className="btn btn-primary" onClick={next}>Continue<ArrowRight size={17} /></button>
                ) : (
                  <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
                    {submitting ? 'Submitting…' : <><Send size={18} />Submit Vehicle for Review</>}
                  </button>
                )}
              </div>
            </div>
          </form>

          <aside className="card aside-card">
            <h3>What happens next?</h3>
            <ul className="aside-list">
              <li><Send size={18} /><div><b>Submit your vehicle</b><span>Takes around 5 minutes.</span></div></li>
              <li><Clock size={18} /><div><b>We review it</b><span>Usually within one business day.</span></div></li>
              <li><PhoneCall size={18} /><div><b>We contact you</b><span>To verify details, documents and next steps.</span></div></li>
              <li><BadgeCheck size={18} /><div><b>Agree & complete</b><span>No obligation until you're happy.</span></div></li>
            </ul>
            {(values.make || values.model) && (
              <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
                <small className="muted" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', fontSize: 11.5 }}>Your submission</small>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, marginTop: 4 }}>{[values.year, values.make, values.model, values.variant].filter(Boolean).join(' ')}</p>
                <p className="muted" style={{ fontSize: 14 }}>
                  {values.km && `${(+values.km).toLocaleString('en-AU')} km`}{values.askingPrice && ` · Asking ${formatPrice(+values.askingPrice)}`}
                </p>
                {fileCount > 0 && <p className="muted" style={{ fontSize: 14 }}>{fileCount} file{fileCount > 1 ? 's' : ''} attached</p>}
              </div>
            )}
          </aside>
        </div>
      </section>

      <ConfirmationModal
        open={!!done}
        onClose={() => { reset(); navigate('/'); }}
        title="Request Received"
        message="Thank you for submitting your vehicle to Darwin Auto Drive. Our team will review the information provided and contact you to verify the vehicle details, documentation and next steps."
        status="Under Review"
        reference={done?.ref}
        email={done && {
          to: values.email,
          name: values.fullName,
          subject: 'Darwin Auto Drive — Your Request Is Under Review',
          details: [
            ['Reference', done.ref],
            ['Vehicle', [values.year, values.make, values.model, values.variant].filter(Boolean).join(' ')],
            ['Registration', values.rego.toUpperCase()],
            ['Files attached', String(fileCount)],
            ['Preferred contact', values.contactMethod],
          ],
        }}
        actions={
          <>
            <button className="btn btn-primary btn-lg" onClick={() => { reset(); navigate('/'); }}>Return to Home</button>
            <button className="btn btn-outline btn-lg" onClick={reset}>Submit another vehicle</button>
          </>
        }
      />
    </>
  );
}
