export default function RecruiterWall({ recruiters = [] }) {
  if (!recruiters.length) return null;
  return (
    <ul className="flex flex-wrap gap-3">
      {recruiters.map((r) => (
        <li key={r._id || r.name} className="flex h-14 items-center rounded-control border border-navy/10 bg-white px-6 font-serif text-base font-medium text-navy transition hover:border-gold/50 hover:shadow-card">
          {r.logo ? <img src={r.logo} alt={r.name} className="max-h-8 w-auto" /> : r.name}
        </li>
      ))}
    </ul>
  );
}
