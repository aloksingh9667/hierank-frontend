export default function Metric({ value, label, dark = false }) {
  return (
    <div className={dark ? 'border-b border-gold/40 pb-4' : 'border-b border-gold pb-4'}>
      <div className={`font-serif text-4xl font-semibold md:text-5xl ${dark ? 'text-white' : 'text-navy'}`}>{value}</div>
      <p className={`mt-2 text-sm leading-5 ${dark ? 'text-white/65' : 'text-muted'}`}>{label}</p>
    </div>
  );
}
