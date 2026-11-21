'use client';
import { CLIENT_API } from './api';

export class ApiRequestError extends Error {
  constructor(message, status, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function request(path, { method = 'GET', body, token } = {}) {
  let res;
  try {
    res = await fetch(`${CLIENT_API}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiRequestError('Unable to reach the server. Please check your connection and try again.', 0);
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiRequestError(json.message || 'Something went wrong', res.status, json.details);
  return json;
}
