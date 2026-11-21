'use client';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Field, FormAlert } from './Field';
import { formToObject, useSubmit } from './useSubmit';

export default function TourForm({ programmes = ['MBA', 'MCA', 'BBA', 'BCA'] }) {
  const { loading, error, fieldErrors, result, submit, reset } = useSubmit('/tours');
  const today = new Date().toISOString().slice(0, 10);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = formToObject(form);
    if (data.visitors) data.visitors = Number(data.visitors);
    if (await submit(data)) form.reset();
  }

  if (result) {
    return (
      <div className="rounded-card border border-green-200 bg-green-50 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-700" />
        <h3 className="mt-3 font-serif text-xl text-navy">Tour requested</h3>
        <p className="mt-2 text-sm">{result.message}</p>
        <button type="button" onClick={reset} className="link-arrow mt-4">Request another visit</button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-card border border-navy/10 bg-white p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="tour-name" error={fieldErrors.name} required><input id="tour-name" name="name" className="input" required /></Field>
        <Field label="Mobile number" name="tour-phone" error={fieldErrors.phone} required><input id="tour-phone" name="phone" type="tel" className="input" required /></Field>
        <Field label="Email" name="tour-email" error={fieldErrors.email} required><input id="tour-email" name="email" type="email" className="input" required /></Field>
        <Field label="Preferred date" name="tour-date" error={fieldErrors.preferredDate} required><input id="tour-date" name="preferredDate" type="date" min={today} className="input" required /></Field>
        <Field label="Time slot" name="tour-slot" error={fieldErrors.timeSlot}>
          <select id="tour-slot" name="timeSlot" className="input" defaultValue="morning"><option value="morning">Morning (10 am – 12 pm)</option><option value="afternoon">Afternoon (2 pm – 4 pm)</option></select>
        </Field>
        <Field label="Number of visitors" name="tour-visitors" error={fieldErrors.visitors}>
          <input id="tour-visitors" name="visitors" type="number" min="1" max="10" defaultValue="1" className="input" />
        </Field>
      </div>
      <Field label="Programme of interest" name="tour-programme">
        <select id="tour-programme" name="programmeInterest" className="input" defaultValue=""><option value="">Not decided</option>{programmes.map((p) => <option key={p}>{p}</option>)}</select>
      </Field>
      <FormAlert>{error}</FormAlert>
      <button type="submit" disabled={loading} className="btn-primary w-full">{loading && <Loader2 className="h-4 w-4 animate-spin" />}{loading ? 'Booking…' : 'Book Campus Tour'}</button>
    </form>
  );
}
