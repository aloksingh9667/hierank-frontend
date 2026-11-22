import clsx from 'clsx';

export default function Metric({ value, label, caption, dark = false }) {
  return (
    <div className={clsx('border-b pb-3', dark ? 'border-tertiary-fixed-dim/40' : 'border-gold')}>
      <div className={clsx('font-serif text-[26px] md:text-[32px] font-semibold leading-tight tracking-tight', dark ? 'text-tertiary-fixed-dim' : 'text-primary-container')}>{value}</div>
      <p className={clsx('mt-1 font-serif text-[14px] md:text-title-editorial font-medium', dark ? 'text-surface-bright' : 'text-primary-container')}>{label}</p>
      {caption && <p className={clsx('mt-0.5 text-caption', dark ? 'text-surface-variant/80' : 'text-on-surface-variant')}>{caption}</p>}
    </div>
  );
}
