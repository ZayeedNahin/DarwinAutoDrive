import { Link } from 'react-router-dom';
import { CarFront } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty">
        <CarFront size={56} />
        <h1 style={{ fontSize: 40, fontWeight: 900, margin: '8px 0' }}>Wrong turn</h1>
        <p className="muted">We couldn't find that page or vehicle.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
          <Link to="/buy" className="btn btn-outline">Browse Cars</Link>
        </div>
      </div>
    </section>
  );
}
