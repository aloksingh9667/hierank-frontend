'use client';

export default function NewsletterForm() {
  return (
    <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Enter your email"
        aria-label="Email address"
        className="h-10 rounded-lg border border-surface-container/20 bg-primary px-3.5 text-body-sm text-on-primary placeholder:text-surface-variant/70 focus:outline-none focus:ring-1 focus:ring-tertiary-fixed-dim"
      />
      <button
        type="submit"
        className="h-10 rounded-lg bg-tertiary-fixed text-label-prominent text-on-tertiary-fixed transition-colors hover:bg-tertiary-fixed-dim"
      >
        Subscribe
      </button>
    </form>
  );
}
