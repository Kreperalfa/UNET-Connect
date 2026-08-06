// components/SelectField.jsx
import '../styles/SelectField.css';

export default function SelectField({ id, label, value, onChange, options, required = false }) {
  return (
    <div className="select-field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
