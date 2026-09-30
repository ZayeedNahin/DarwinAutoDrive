import { Link, useNavigate } from 'react-router-dom';
import { Gauge, Settings2, Fuel, CarFront, MapPin, PlayCircle, Images } from 'lucide-react';
import SmartImage from './SmartImage.jsx';
import StatusBadge from './StatusBadge.jsx';
import { formatKm, formatPrice } from '../data/vehicles.js';

export default function VehicleCard({ vehicle: v }) {
  const navigate = useNavigate();
  return (
    <article className="vehicle-card">
      <Link to={`/buy/${v.id}`} className="vc-media" aria-label={`View ${v.title}`}>
        <SmartImage src={v.thumbs[0].replace('w=400', 'w=800')} alt={v.title} label={`${v.make} ${v.model}`} />
        <div className="vc-badges">
          <StatusBadge status={v.availability} solid />
          {v.hasVideo && <span className="vc-video"><PlayCircle size={14} />Video</span>}
        </div>
        <span className="vc-count"><Images size={13} />{v.images.length + (v.hasVideo ? 1 : 0)}</span>
      </Link>
      <div className="vc-body">
        <h3 className="vc-title"><Link to={`/buy/${v.id}`}>{v.year} {v.make} {v.model}</Link></h3>
        <p className="vc-sub">{v.variant}</p>
        <div className="vc-price">{formatPrice(v.price)}<small>Drive away</small></div>
        <div className="vc-specs">
          <span><Gauge size={15} />{formatKm(v.km)}</span>
          <span><Settings2 size={15} />{v.transmission}</span>
          <span><Fuel size={15} />{v.fuel}</span>
          <span><CarFront size={15} />{v.type}</span>
          <span style={{ gridColumn: '1 / -1' }}><MapPin size={15} />{v.location}</span>
        </div>
        <p className="vc-desc">{v.summary}</p>
        <div className="vc-actions">
          <Link to={`/buy/${v.id}`} className="btn btn-outline btn-sm">View Details</Link>
          <button className="btn btn-primary btn-sm" onClick={() => navigate(`/buy/${v.id}#enquire`)}>Enquire Now</button>
        </div>
      </div>
    </article>
  );
}
