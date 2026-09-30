import { CheckCircle2, Clock, Hourglass, Search, Circle } from 'lucide-react';

const MAP = {
  Available: { cls: 'badge-green', dot: true },
  'Under Offer': { cls: 'badge-amber', dot: true },
  'Coming Soon': { cls: 'badge-blue', dot: true },
  'Under Review': { cls: 'badge-amber', icon: Search },
  'Pending Confirmation': { cls: 'badge-amber', icon: Hourglass },
  Received: { cls: 'badge-green', icon: CheckCircle2 },
  'Vehicle Available': { cls: 'badge-green', icon: CheckCircle2 },
  'Not Confirmed': { cls: 'badge-blue', icon: Clock },
};

/** Status badge. `solid` adds a white background for use over images. */
export default function StatusBadge({ status, label, solid, large, prefix }) {
  const conf = MAP[status] || { cls: 'badge-orange', icon: Circle };
  const Icon = conf.icon;
  return (
    <span className={`badge ${conf.cls} ${conf.dot ? 'badge-dot' : ''} ${solid ? 'badge-solid' : ''} ${large ? 'badge-lg' : ''}`}>
      {Icon && <Icon size={large ? 16 : 14} />}
      {prefix && <span style={{ fontWeight: 500, opacity: 0.8 }}>{prefix}</span>}
      {label || status}
    </span>
  );
}
