import { useRef, useState } from 'react';
import { UploadCloud, FileText, Film, X, CheckCircle2, FlaskConical } from 'lucide-react';

const fmtSize = (b) => (b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1e3))} KB`);

/**
 * Prototype drag-and-drop upload area.
 * Files are held in browser memory only (object URLs for previews) and are never uploaded or stored.
 */
export default function FileUpload({ label, hint, accept = 'image/*', multiple = true, files = [], onChange, required, error }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef(null);

  const addFiles = (list) => {
    const incoming = Array.from(list).map((file) => ({
      id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 7)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));
    onChange(multiple ? [...files, ...incoming] : incoming.slice(0, 1));
  };

  const remove = (id) => {
    const f = files.find((x) => x.id === id);
    if (f?.preview) URL.revokeObjectURL(f.preview);
    onChange(files.filter((x) => x.id !== id));
  };

  const acceptText = accept.includes('video') ? 'MP4, MOV up to 200MB' : accept.includes('pdf') ? 'PDF, JPG, PNG up to 10MB' : 'JPG, PNG, HEIC up to 10MB each';

  return (
    <div className={`upload ${error ? 'field has-error' : ''}`}>
      <div className="upload-head">
        <strong>{label}{required && <span style={{ color: 'var(--orange-600)' }}> *</span>}</strong>
        <span className="proto-tag"><FlaskConical size={11} />Prototype</span>
      </div>
      <div
        className={`dropzone ${drag ? 'drag' : ''}`}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), inputRef.current?.click())}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files); }}
      >
        <span className="dz-icon">{accept.includes('video') ? <Film size={22} /> : <UploadCloud size={22} />}</span>
        <p><b>Click to upload</b> or drag and drop</p>
        <small>{hint || acceptText}</small>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} hidden
          onChange={(e) => { if (e.target.files?.length) addFiles(e.target.files); e.target.value = ''; }} />
      </div>
      {error && <span className="error" role="alert">{error}</span>}
      {files.length > 0 && (
        <div className="file-list">
          {files.map((f) => (
            <div className="file-item" key={f.id}>
              <span className="f-thumb">
                {f.preview ? <img src={f.preview} alt="" /> : f.type.startsWith('video') ? <Film size={20} /> : <FileText size={20} />}
              </span>
              <span className="f-meta">
                <strong>{f.name}</strong>
                <small>{fmtSize(f.size)} · <span className="ok"><CheckCircle2 size={12} />Attached (not uploaded)</span></small>
              </span>
              <button type="button" onClick={() => remove(f.id)} aria-label={`Remove ${f.name}`}><X size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
