import { useEffect } from 'react';
import { X } from 'lucide-react';

/** Accessible modal dialog. Closes on backdrop click and Escape. */
export default function Modal({ open, onClose, children, maxWidth = 640, labelledBy }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="modal" style={{ maxWidth }} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        {onClose && (
          <button className="modal-close" onClick={onClose} aria-label="Close dialog"><X size={20} /></button>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
