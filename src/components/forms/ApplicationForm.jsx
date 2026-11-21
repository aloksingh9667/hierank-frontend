'use client';
import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Field, FormAlert } from './Field';
import { useSubmit } from './useSubmit';

const EXAMS = ['NONE', 'CAT', 'MAT', 'CMAT', 'XAT', 'GMAT', 'CUET', 'UGAT', 'HAT'];

export default function ApplicationForm({ programmes = [], defaultProgramme = '' }) {
  const { loading, error, fieldErrors, result, submit } = useSubmit('/applications');
  const [consent, setConsent] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget).entries());
    const num = (v) => (v === '' || v === undefined ? undefined : Number(v));
    const str = (v) => (v === '' ? undefined : v);
    await submit({
      programme: f.programme,
      applicant: {
        fullName: f.fullName, email: f.email, phone: f.phone, dateOfBirth: str(f.dateOfBirth), gender: str(f.gender), city: str(f.city), state: str(f.state),
      },
      academic: {
        lastQualification: str(f.lastQualification), institution: str(f.institution), percentage: num(f.percentage), passingYear: num(f.passingYear),
        entranceExam: str(f.entranceExam), entranceScore: num(f.entranceScore),
      },
      statementOfPurpose: str(f.statementOfPurpose),
      consent,
    });
  }

  if (result?.data) {
    return (
      <div className="rounded-card border border-green-200 bg-green-50 p-8 text-center md:p-12" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-700" />
        <h3 className="mt-4 font-serif text-2xl text-navy">Application submitted</h3>
        <p className="mt-2 text-ink/80">Thank you! Your application for <strong>{result.data.programme}</strong> has been received.</p>
        <p className="mx-auto mt-5 inline-block rounded-control border border-gold/50 bg-white px-6 py-3">
          <span className="block text-xs uppercase tracking-eyebrow text-muted">Application number</span>
          <span className="font-serif text-2xl text-navy">{result.data.applicationNo}</span>
        </p>
        <p className="mt-5 text-sm text-ink/70">Please keep this number for future reference. Our admissions desk will contact you about the next steps.</p>
      </div>
    );
  }

  const e = fieldErrors;
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8 rounded-card border border-navy/10 bg-white p-6 shadow-card md:p-10">
      <fieldset className="space-y-4">
        <legend className="mb-2 font-serif text-xl text-navy">1. Programme</legend>
        <Field label="Programme applying for" name="programme" error={e.programme} required>
          <select id="programme" name="programme" className="input" defaultValue={defaultProgramme} required>
            <option value="" disabled>Select a programme</option>
            {programmes.map((p) => <option key={p.slug} value={p.slug}>{p.code} — {p.name}</option>)}
          </select>
        </Field>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-2 font-serif text-xl text-navy">2. Personal details</legend>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name" name="fullName" error={e['applicant.fullName']} required><input id="fullName" name="fullName" className="input" autoComplete="name" required /></Field>
          <Field label="Email" name="email" error={e['applicant.email']} required><input id="email" name="email" type="email" className="input" autoComplete="email" required /></Field>
          <Field label="Mobile number" name="phone" error={e['applicant.phone']} required><input id="phone" name="phone" type="tel" className="input" autoComplete="tel" required /></Field>
          <Field label="Date of birth" name="dateOfBirth" error={e['applicant.dateOfBirth']}><input id="dateOfBirth" name="dateOfBirth" type="date" className="input" /></Field>
          <Field label="Gender" name="gender" error={e['applicant.gender']}>
            <select id="gender" name="gender" className="input" defaultValue=""><option value="">Select</option><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option><option value="prefer_not_to_say">Prefer not to say</option></select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="City" name="city"><input id="city" name="city" className="input" /></Field>
            <Field label="State" name="state"><input id="state" name="state" className="input" /></Field>
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-2 font-serif text-xl text-navy">3. Academic background</legend>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Last qualification" name="lastQualification"><input id="lastQualification" name="lastQualification" className="input" placeholder="e.g. B.Com / 12th (Science)" /></Field>
          <Field label="School / University" name="institution"><input id="institution" name="institution" className="input" /></Field>
          <Field label="Aggregate percentage" name="percentage" error={e['academic.percentage']}><input id="percentage" name="percentage" type="number" step="0.01" min="0" max="100" className="input" /></Field>
          <Field label="Year of passing" name="passingYear" error={e['academic.passingYear']}><input id="passingYear" name="passingYear" type="number" min="1990" max="2100" className="input" /></Field>
          <Field label="Entrance exam" name="entranceExam"><select id="entranceExam" name="entranceExam" className="input" defaultValue="NONE">{EXAMS.map((x) => <option key={x} value={x}>{x === 'NONE' ? 'None / Not appeared' : x}</option>)}</select></Field>
          <Field label="Entrance score / percentile" name="entranceScore"><input id="entranceScore" name="entranceScore" type="number" step="0.01" min="0" className="input" /></Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-2 font-serif text-xl text-navy">4. Statement of purpose</legend>
        <Field label="Why do you want to join HBS? (optional)" name="statementOfPurpose" error={e.statementOfPurpose}>
          <textarea id="statementOfPurpose" name="statementOfPurpose" className="input min-h-[140px]" maxLength={3000} />
        </Field>
      </fieldset>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/80">
        <input type="checkbox" checked={consent} onChange={(ev) => setConsent(ev.target.checked)} className="mt-0.5 h-5 w-5 rounded border-muted accent-navy" />
        <span>I declare that the information provided is correct and I consent to Hierank Business School contacting me about my application.</span>
      </label>
      {e.consent && <p className="field-error">{e.consent}</p>}
      <FormAlert>{error}</FormAlert>
      <button type="submit" disabled={loading || !consent} className="btn-primary w-full md:w-auto md:px-10">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}{loading ? 'Submitting…' : 'Submit Application'}
      </button>
    </form>
  );
}
