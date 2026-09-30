import { useState } from 'react';
import { Send, CheckCircle2, Mail } from 'lucide-react';
import { TextInput, SelectInput, TextArea, validate, makeRef } from './FormFields.jsx';
import EmailPreview from './EmailPreview.jsx';

const INITIAL = { name: '', email: '', phone: '', subject: '', message: '' };

/** General contact form with simulated submission + email preview. */
export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(null);
  const set = (k, v) => { setValues((s) => ({ ...s, [k]: v })); if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined })); };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate(values, {
      name: { required: true, message: 'Please enter your name' },
      email: { required: true, email: true, message: 'Please enter your email' },
      subject: { required: true, message: 'Please choose a subject' },
      message: { required: true, message: 'Please enter a message' },
    });
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent({ ...values, ref: makeRef('MSG') }); }, 900);
  };

  if (sent) {
    return (
      <div className="card card-pad">
        <div className="confirm-head">
          <div className="confirm-icon"><CheckCircle2 size={40} /></div>
          <h2>Message Sent</h2>
          <p>Thanks, {sent.name.split(' ')[0]}. Our team will reply within one business day.</p>
          <div className="confirm-meta"><span className="ref">Ref: {sent.ref}</span></div>
        </div>
        <div className="notice notice-orange" style={{ marginTop: 22 }}>
          <Mail size={18} /><span>A confirmation email has been sent to <b>{sent.email}</b>.</span>
        </div>
        <EmailPreview to={sent.email} name={sent.name} subject={`Darwin Auto Drive — We've received your message (${sent.subject})`}
          details={[['Reference', sent.ref], ['Subject', sent.subject]]} />
        <div className="confirm-actions">
          <button className="btn btn-outline" onClick={() => { setValues(INITIAL); setSent(null); }}>Send another message</button>
        </div>
      </div>
    );
  }

  return (
    <form className="card card-pad" onSubmit={submit} noValidate>
      <h2 style={{ fontSize: 24, fontWeight: 800 }}>Send us a message</h2>
      <p className="muted" style={{ margin: '6px 0 24px' }}>We usually respond within one business day.</p>
      <div className="form-grid">
        <TextInput label="Name" name="name" value={values.name} onChange={set} error={errors.name} required autoComplete="name" />
        <TextInput label="Email" name="email" type="email" value={values.email} onChange={set} error={errors.email} required autoComplete="email" />
        <TextInput label="Phone" name="phone" type="tel" value={values.phone} onChange={set} placeholder="04xx xxx xxx" autoComplete="tel" />
        <SelectInput label="Subject" name="subject" value={values.subject} onChange={set} error={errors.subject} required
          options={['Buying a vehicle', 'Selling my vehicle', 'Rental enquiry', 'General enquiry', 'Feedback']} />
        <TextArea label="Message" name="message" value={values.message} onChange={set} error={errors.message} required rows={5} placeholder="How can we help?" />
      </div>
      <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: 24 }} disabled={sending}>
        {sending ? 'Sending…' : <><Send size={18} />Send Message</>}
      </button>
    </form>
  );
}
