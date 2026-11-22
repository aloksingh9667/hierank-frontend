const COLORS = ['#101D35', '#385F95', '#C5A46D', '#9DC3FF', '#7985A2', '#8A6D3B'];

export default function SectorBar({ data = [] }) {
  if (!data.length) return null;
  return (
    <div>
      <div className="flex h-3.5 overflow-hidden rounded-full bg-surface-container-low" role="img" aria-label="Placement sector distribution">
        {data.map((d, i) => (
          <div key={d.sector} style={{ width: `${d.percent}%`, background: COLORS[i % COLORS.length] }} title={`${d.sector} ${d.percent}%`} />
        ))}
      </div>
      <ul className="mt-5 grid gap-x-6 gap-y-2">
        {data.map((d, i) => (
          <li key={d.sector} className="flex items-center justify-between gap-3 border-b border-outline-variant/40 pb-2 text-body-sm">
            <span className="flex items-center gap-2.5 text-on-surface-variant">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
              {d.sector}
            </span>
            <span className="font-semibold text-primary-container">{d.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
