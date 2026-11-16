import { useState } from 'react';
import './FormField.css';

export default function FormField({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  as = 'input',
  options = [],
  placeholder = '',
  rows = 4,
  error,
}) {
  const [focused, setFocused] = useState(false);
  const hasValue = value !== undefined && value !== '' && value !== null;

  return (
    <div className={`form-field ${focused ? 'is-focused' : ''} ${hasValue ? 'has-value' : ''} ${error ? 'has-error' : ''}`}>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ''}
          className="form-input form-textarea"
        />
      ) : as === 'select' ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="form-input form-select"
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ''}
          className="form-input"
        />
      )}

      <label htmlFor={id} className="form-label">
        {label} {required && <span className="req">*</span>}
      </label>

      {/* Gold draw line on focus */}
      <span className="form-focus-line" aria-hidden="true" />

      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
