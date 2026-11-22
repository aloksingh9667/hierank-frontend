'use client';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Field, FormAlert } from './Field';
import { formToObject, useSubmit } from './useSubmit';

const DEFAULT_PROGRAMMES = ['MBA', 'MCA', 'BBA', 'BCA'];

export default function EnquiryForm({ source = 'contact', programmes = DEFAULT_PROGRAMMES, defaultProgramme = '', dark = false, idPrefix = 'enq', submitLabel = 'Submit Enquiry' }) {
  const { loading, error, fieldErrors, result, submit, reset } = useSubmit('/enquiries');

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const ok = await submit({ ...formToObject(form), source });
    if (ok) form.reset();
  }

  if (result) {
    return (
      <div className="rounded-2xl border border-[#c6e3cd] bg-[#eef8f1] p-8 text-center shadow-sm" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[#1f6b3a]" />
        <h3 className="mt-3 font-serif text-headline-sm text-primary-container">Enquiry received</h3>
        <p className="mt-2 text-body-sm text-on-surface-variant">{result.message}</p>
        <button type="button" onClick={reset} className="link-arrow mt-4">Send another enquiry</button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`space-y-3 rounded-xl p-4 md:p-5 ${dark ? 'bg-surface-container-lowest shadow-modal' : 'border border-outline-variant/40 bg-surface-container-lowest shadow-sm'}`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name={`${idPrefix}-name`} error={fieldErrors.name} required>
          <input id={`${idPrefix}-name`} name="name" className="input" autoComplete="name" placeholder="Your full name" required />
        </Field>
        <Field label="Mobile number" name={`${idPrefix}-phone`} error={fieldErrors.phone} required>
          <input id={`${idPrefix}-phone`} name="phone" type="tel" className="input" autoComplete="tel" placeholder="+91 98XXXXXXXX" required />
        </Field>
        <Field label="Email" name={`${idPrefix}-email`} error={fieldErrors.email} required>
          <input id={`${idPrefix}-email`} name="email" type="email" className="input" autoComplete="email" placeholder="you@example.com" required />
        </Field>
        <Field label="Programme of interest" name={`${idPrefix}-programme`} error={fieldErrors.programme}>
          <select id={`${idPrefix}-programme`} name="programme" className="input" defaultValue={defaultProgramme}>
            <option value="">Select a programme</option>
            {programmes.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
      </div>
      <Field label="City" name={`${idPrefix}-city`} error={fieldErrors.city}>
        <input id={`${idPrefix}-city`} name="city" className="input" autoComplete="address-level2" placeholder="Where are you from?" />
      </Field>
      <Field label="Message" name={`${idPrefix}-message`} error={fieldErrors.message}>
        <textarea id={`${idPrefix}-message`} name="message" className="input" placeholder="How can our admissions council help?" maxLength={2000} />
      </Field>
      <FormAlert>{error}</FormAlert>
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}{loading ? 'Submitting…' : submitLabel}
      </button>
      <p className="text-center text-caption text-on-surface-variant">By submitting you agree to be contacted by HBS regarding your enquiry.</p>
    </form>
  );
}
