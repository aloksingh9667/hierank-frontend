import clsx from 'clsx';

export default function SectionHeading({ eyebrow, title, children, align = 'left', light = false, className }) {
  return (
    <div className={clsx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className={clsx('eyebrow mb-3', light && '!text-gold')}>{eyebrow}</p>}
      <h2 className={clsx('h-lg', light && '!text-white')}>{title}</h2>
      <div className={clsx('gold-rule mt-5', align === 'center' && 'mx-auto')} />
      {children && <p className={clsx('lead mt-5', light && '!text-white/70')}>{children}</p>}
    </div>
  );
}
