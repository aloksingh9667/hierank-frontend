export default function RecruiterWall({ recruiters = [] }) {
  if (!recruiters.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {recruiters.map((r) => (
        <li
          key={r._id || r.name}
          className="flex h-10 items-center rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 font-serif text-[13px] font-medium text-primary-container transition-all hover:border-tertiary-fixed-dim/60 hover:shadow-sm"
        >
          {r.logo ? <img src={r.logo} alt={r.name} className="max-h-6 w-auto" /> : r.name}
        </li>
      ))}
    </ul>
  );
}
