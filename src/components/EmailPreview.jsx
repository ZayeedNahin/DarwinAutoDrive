import { CheckCheck, Info } from 'lucide-react';
import StatusTimeline from './StatusTimeline.jsx';

/**
 * Simulated email notification preview. No email is actually sent.
 * `details` is an array of [label, value] pairs shown in a summary box.
 */
export default function EmailPreview({
  to,
  name,
  subject = 'Darwin Auto Drive — Your Request Is Under Review',
  intro,
  details = [],
  timelineStep = 1,
  timelineSteps,
}) {
  const now = new Date().toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' });
  return (
    <div className="email" aria-label="Email confirmation preview">
      <div className="email-top">
        <span className="dots"><i /><i /><i /></span>
        <span className="email-sent"><CheckCheck size={16} />Email Sent</span>
      </div>
      <div className="email-headers">
        <div><span>From</span><b>Darwin Auto Drive &lt;no-reply@darwinautodrive.example&gt;</b></div>
        <div><span>To</span><b>{to || 'customer@example.com'}</b></div>
        <div><span>Subject</span><b>{subject}</b></div>
        <div><span>Sent</span><b style={{ fontWeight: 500 }}>{now}</b></div>
      </div>
      <div className="email-body">
        <div className="brand-line"><i />Darwin Auto Drive</div>
        <p>Hi {name ? name.split(' ')[0] : 'there'},</p>
        <p>Thank you for contacting Darwin Auto Drive.</p>
        <p>
          {intro ||
            'We have received your request and our team is currently reviewing the information provided. A member of our team will contact you shortly regarding the next steps.'}
        </p>
        {details.length > 0 && (
          <div className="kv">
            {details.map(([k, v]) => <div key={k}><span>{k}</span><b>{v}</b></div>)}
          </div>
        )}
        <StatusTimeline current={timelineStep} steps={timelineSteps} />
        <p style={{ marginTop: 14 }}>Kind regards,<br /><b>The Darwin Auto Drive Team</b></p>
      </div>
      <div className="email-note"><Info size={13} />Prototype simulation — no real email has been sent.</div>
    </div>
  );
}
