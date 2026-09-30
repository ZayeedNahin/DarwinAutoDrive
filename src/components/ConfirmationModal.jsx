import { CheckCircle2, Mail } from 'lucide-react';
import Modal from './Modal.jsx';
import StatusBadge from './StatusBadge.jsx';
import EmailPreview from './EmailPreview.jsx';

/**
 * Confirmation modal shown after a simulated submission.
 * Includes status badge, reference number, email-sent notice and email preview.
 */
export default function ConfirmationModal({ open, onClose, title, message, status, reference, email, actions }) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={660} labelledBy="confirm-title">
      <div className="confirm-head">
        <div className="confirm-icon"><CheckCircle2 size={40} /></div>
        <h2 id="confirm-title">{title}</h2>
        <p>{message}</p>
        <div className="confirm-meta">
          {status && <StatusBadge status={status} prefix="Status:" large />}
          {reference && <span className="ref">Ref: {reference}</span>}
        </div>
      </div>
      <div className="notice notice-orange" style={{ marginTop: 22 }}>
        <Mail size={18} />
        <span>A confirmation email has been sent to your registered email address{email?.to ? <> (<b>{email.to}</b>)</> : ''}.</span>
      </div>
      {email && <EmailPreview {...email} />}
      {actions && <div className="confirm-actions">{actions}</div>}
    </Modal>
  );
}
