'use client';
const KEY = 'hbs_admin_token';
export const getToken = () => (typeof window === 'undefined' ? null : window.localStorage.getItem(KEY));
export const setToken = (t) => window.localStorage.setItem(KEY, t);
export const clearToken = () => window.localStorage.removeItem(KEY);
