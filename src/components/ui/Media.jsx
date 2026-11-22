import { GraduationCap } from 'lucide-react';
import clsx from 'clsx';

/** Shows a remote image when `src` exists, otherwise an on-brand navy placeholder (so the site looks complete before photos are uploaded). */
export default function Media({ src, alt = '', label, icon: Icon = GraduationCap, className }) {
  if (src) return <img src={src} alt={alt} loading="lazy" className={clsx('h-full w-full object-cover', className)} />;
  return (
    <div
      role="img"
      aria-label={alt || label || 'Illustration'}
      className={clsx('relative flex h-full w-full items-end overflow-hidden bg-gradient-to-br from-primary-container via-navy-700 to-secondary', className)}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: 'repeating-linear-gradient(135deg, #e5c188 0, #e5c188 1px, transparent 1px, transparent 18px)' }}
      />
      <Icon className="absolute right-6 top-6 h-14 w-14 text-tertiary-fixed-dim/70" strokeWidth={1.2} />
      {label && <span className="relative z-10 p-5 font-serif text-lg font-medium text-white/90">{label}</span>}
    </div>
  );
}
