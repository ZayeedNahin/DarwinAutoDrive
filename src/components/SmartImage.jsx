import { useState } from 'react';
import { Car } from 'lucide-react';

/** Image with a branded placeholder fallback if the remote image can't load. */
export default function SmartImage({ src, alt = '', label, className, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div className={`img-fallback ${className || ''}`} role="img" aria-label={alt}>
        <Car size={36} />
        <span>{label || alt || 'Darwin Auto Drive'}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} {...rest} />;
}
