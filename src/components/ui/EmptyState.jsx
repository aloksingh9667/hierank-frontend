export default function EmptyState({ title = 'Content coming soon', children }) {
  return (
    <div className="rounded-card border border-dashed border-navy/20 bg-white p-10 text-center">
      <p className="font-serif text-xl text-navy">{title}</p>
      {children && <p className="mt-2 text-sm text-muted">{children}</p>}
    </div>
  );
}
