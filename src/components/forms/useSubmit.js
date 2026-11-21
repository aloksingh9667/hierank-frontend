'use client';
import { useState } from 'react';
import { request } from '@/lib/client-api';

/** Handles loading / success / server-side validation errors for public forms. */
export function useSubmit(path) {
  const [state, setState] = useState({ loading: false, error: '', fieldErrors: {}, result: null });

  async function submit(body) {
    setState({ loading: true, error: '', fieldErrors: {}, result: null });
    try {
      const result = await request(path, { method: 'POST', body });
      setState({ loading: false, error: '', fieldErrors: {}, result });
      return result;
    } catch (err) {
      const fieldErrors = {};
      (err.details || []).forEach((d) => { if (d.field) fieldErrors[d.field] = d.message; });
      setState({ loading: false, error: err.message, fieldErrors, result: null });
      return null;
    }
  }
  const reset = () => setState({ loading: false, error: '', fieldErrors: {}, result: null });
  return { ...state, submit, reset };
}

export function formToObject(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  Object.keys(data).forEach((k) => { if (data[k] === '') delete data[k]; });
  return data;
}
