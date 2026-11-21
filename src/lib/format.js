export const formatDate = (value, opts = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  value ? new Intl.DateTimeFormat('en-IN', opts).format(new Date(value)) : '';

export const formatINR = (amount) =>
  typeof amount === 'number' ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount) : null;

export const telHref = (phone = '') => `tel:${phone.replace(/[^\d+]/g, '')}`;
export const yearsSince = (year) => new Date().getFullYear() - Number(year || 2006);
