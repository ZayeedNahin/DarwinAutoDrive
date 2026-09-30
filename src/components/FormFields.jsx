import { AlertCircle, Check } from 'lucide-react';

/** Wrapper providing label, hint and error for any control. */
export function Field({ label, name, required, hint, error, full, children, className = '' }) {
  return (
    <div className={`field ${error ? 'has-error' : ''} ${full ? 'full' : ''} ${className}`}>
      {label && <label htmlFor={name}>{label}{required && <span className="req">*</span>}</label>}
      {children}
      {error ? <span className="error" role="alert"><AlertCircle size={13} />{error}</span> : hint && <span className="hint">{hint}</span>}
    </div>
  );
}

export function TextInput({ label, name, value, onChange, error, required, hint, full, prefix, ...rest }) {
  const input = (
    <input id={name} name={name} className="input" value={value ?? ''} onChange={(e) => onChange(name, e.target.value)}
      aria-invalid={!!error} {...rest} />
  );
  return (
    <Field label={label} name={name} required={required} hint={hint} error={error} full={full}>
      {prefix ? <div className="input-wrap"><span className="prefix">{prefix}</span>{input}</div> : input}
    </Field>
  );
}

export function SelectInput({ label, name, value, onChange, options, placeholder = 'Select…', error, required, hint, full }) {
  return (
    <Field label={label} name={name} required={required} hint={hint} error={error} full={full}>
      <select id={name} name={name} className="select" value={value ?? ''} onChange={(e) => onChange(name, e.target.value)} aria-invalid={!!error}>
        <option value="">{placeholder}</option>
        {options.map((o) => {
          const val = typeof o === 'string' ? o : o.value;
          const lab = typeof o === 'string' ? o : o.label;
          return <option key={val} value={val}>{lab}</option>;
        })}
      </select>
    </Field>
  );
}

export function TextArea({ label, name, value, onChange, error, required, hint, full = true, rows = 4, ...rest }) {
  return (
    <Field label={label} name={name} required={required} hint={hint} error={error} full={full}>
      <textarea id={name} name={name} className="textarea" rows={rows} value={value ?? ''} onChange={(e) => onChange(name, e.target.value)} {...rest} />
    </Field>
  );
}

/** Pill-style radio group. */
export function Segmented({ label, name, value, onChange, options, error, required, full }) {
  return (
    <Field label={label} required={required} error={error} full={full}>
      <div className="segmented" role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <label key={o} className={value === o ? 'on' : ''}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(name, o)} />
            {value === o && <Check size={15} />}{o}
          </label>
        ))}
      </div>
    </Field>
  );
}

/** Switch row for boolean options. */
export function ToggleRow({ name, title, text, checked, onChange }) {
  return (
    <label className={`toggle-row ${checked ? 'on' : ''}`}>
      <span><strong>{title}</strong>{text && <small>{text}</small>}</span>
      <span className="switch">
        <input type="checkbox" checked={!!checked} onChange={(e) => onChange(name, e.target.checked)} />
        <span />
      </span>
    </label>
  );
}

export function Checkbox({ name, checked, onChange, children, error }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label className="check">
        <input type="checkbox" name={name} checked={!!checked} onChange={(e) => onChange(name, e.target.checked)} />
        <span>{children}</span>
      </label>
      {error && <span className="error" role="alert"><AlertCircle size={13} />{error}</span>}
    </div>
  );
}

// ---- Validation helpers ----
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v || '');
export const isPhone = (v) => (v || '').replace(/\D/g, '').length >= 8;

export function validate(values, rules) {
  const errors = {};
  for (const [key, rule] of Object.entries(rules)) {
    const v = values[key];
    if (rule.required && (v === undefined || v === null || String(v).trim() === '' || v === false)) {
      errors[key] = rule.message || 'This field is required';
    } else if (rule.email && v && !isEmail(v)) {
      errors[key] = 'Enter a valid email address';
    } else if (rule.phone && v && !isPhone(v)) {
      errors[key] = 'Enter a valid phone number';
    } else if (rule.custom) {
      const msg = rule.custom(v, values);
      if (msg) errors[key] = msg;
    }
  }
  return errors;
}

export const makeRef = (prefix) => `${prefix}-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`;
