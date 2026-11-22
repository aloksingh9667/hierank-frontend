import clsx from 'clsx';

export default function SectionHeading({ eyebrow, title, children, align = 'left', light = false, className }) {
  return (
    <div className={clsx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={clsx(
          'mb-3 flex items-center gap-2 text-label-prestige-eyebrow uppercase tracking-widest',
          align === 'center' && 'justify-center',
          light ? 'text-tertiary-fixed-dim' : 'text-secondary',
        )}>
          <span className={clsx('h-[2px] w-8', light ? 'bg-tertiary-fixed-dim' : 'bg-secondary')} />
          {eyebrow}
        </p>
      )}
      <h2 className={clsx('h-lg', light && '!text-on-primary')}>{title}</h2>
      {children && <p className={clsx('mt-4 text-body-md md:text-body-lg', light ? 'text-surface-variant' : 'text-on-surface-variant')}>{children}</p>}
    </div>
  );
}
