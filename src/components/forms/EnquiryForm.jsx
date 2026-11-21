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
      <div className="rounded-card border border-green-200 bg-green-50 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-700" />
        <h3 className="mt-3 font-serif text-xl text-navy">Enquiry received</h3>
        <p className="mt-2 text-sm text-ink/80">{result.message}</p>
        <button type="button" onClick={reset} className="link-arrow mt-4">Send another enquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={`space-y-4 rounded-card p-6 md:p-8 ${dark ? 'bg-white shadow-modal' : 'border border-navy/10 bg-white'}`}>
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
      <p className="text-center text-xs text-muted">By submitting you agree to be contacted by HBS regarding your enquiry.</p>
    </form>
  );
}
