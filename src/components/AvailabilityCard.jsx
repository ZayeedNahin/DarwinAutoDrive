import { CalendarDays, Clock, Users, Briefcase, Info, ArrowLeft, Send } from 'lucide-react';
import SmartImage from './SmartImage.jsx';
import StatusBadge from './StatusBadge.jsx';
import { formatPrice } from '../data/vehicles.js';

const fmtDate = (d) => (d ? new Date(`${d}T00:00`).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '—');
const fmtTime = (t) => {
  if (!t) return '—';
  const [h, m] = t.split(':').map(Number);
  return new Date(2000, 0, 1, h, m).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit' });
};

/** Result card after the simulated availability check. */
export default function AvailabilityCard({ vehicle, request, days, extras, total, onRequest, onChooseAnother }) {
  return (
    <div className="card avail-card">
      <div className="avail-top">
        <div className="avail-media">
          <SmartImage src={vehicle.image} alt={vehicle.name} label={vehicle.name} />
          <StatusBadge status="Vehicle Available" solid large />
        </div>
        <div className="avail-info">
          <span className="eyebrow">{vehicle.category} · or similar</span>
          <h2>{vehicle.name}</h2>
          <p style={{ color: 'var(--green)', fontWeight: 600 }}>Available for your requested dates.</p>
          <div style={{ display: 'flex', gap: 16, marginTop: 10, color: 'var(--muted)', fontSize: 14 }}>
            <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Users size={16} />{vehicle.seats} seats</span>
            <span style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Briefcase size={16} />{vehicle.bags} bags</span>
          </div>
          <div className="avail-rows">
            <div><span>Vehicle</span><strong>{vehicle.name}</strong></div>
            <div><span><CalendarDays size={14} style={{ verticalAlign: -2 }} /> Rental dates</span><strong>{fmtDate(request.pickupDate)} → {fmtDate(request.returnDate)}</strong></div>
            <div><span><Clock size={14} style={{ verticalAlign: -2 }} /> Pickup time</span><strong>{fmtTime(request.pickupTime)} · {request.pickupLocation}</strong></div>
            <div><span><Clock size={14} style={{ verticalAlign: -2 }} /> Return time</span><strong>{fmtTime(request.returnTime)} · {request.returnLocation}</strong></div>
            <div><span>Indicative daily rate</span><strong>{formatPrice(vehicle.rate)} / day</strong></div>
            <div><span>Rental length</span><strong>{days} {days === 1 ? 'day' : 'days'}</strong></div>
            {extras.map(([label, cost]) => <div key={label}><span>{label}</span><strong>{formatPrice(cost)}</strong></div>)}
          </div>
          <div className="avail-total">
            <div><small>Estimated rental total</small><strong>{formatPrice(total)}</strong></div>
            <small style={{ textAlign: 'right' }}>incl. GST<br />indicative only</small>
          </div>
        </div>
      </div>
      <div className="avail-foot">
        <div className="notice notice-blue">
          <Info size={18} />
          <span><b>This booking is not automatically confirmed.</b> Requesting this vehicle sends your details to our team, who will confirm availability, final pricing and your licence details before your booking is secured. No payment is taken.</span>
        </div>
        <div className="avail-actions">
          <button className="btn btn-primary btn-lg" onClick={onRequest}><Send size={18} />Request This Vehicle</button>
          <button className="btn btn-outline btn-lg" onClick={onChooseAnother}><ArrowLeft size={18} />Choose Another Vehicle</button>
        </div>
      </div>
    </div>
  );
}
