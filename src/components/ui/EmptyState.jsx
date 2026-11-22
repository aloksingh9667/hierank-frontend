export default function EmptyState({ title = 'Content coming soon', children }) {
  return (
    <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-lowest p-10 text-center">
      <p className="font-serif text-headline-sm text-primary-container">{title}</p>
      {children && <p className="mt-2 text-body-sm text-on-surface-variant">{children}</p>}
    </div>
  );
}
