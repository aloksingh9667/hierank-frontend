export function Field({ label, name, error, required, children, hint }) {
  return (
    <div>
      <label htmlFor={name} className="label">{label}{required && <span className="text-red-600"> *</span>}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}

export function FormAlert({ type = 'error', children }) {
  if (!children) return null;
  const styles = type === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-green-200 bg-green-50 text-green-800';
  return <div role={type === 'error' ? 'alert' : 'status'} className={`rounded-control border px-4 py-3 text-sm ${styles}`}>{children}</div>;
}
