// Server-side data access (React Server Components). Every call degrades gracefully if the API is unreachable.
const SERVER_API = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
export const CLIENT_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function get(path, { revalidate = 60 } = {}) {
  try {
    const res = await fetch(`${SERVER_API}${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export const getProgrammes = async () => (await get('/programmes'))?.data ?? [];
export const getProgramme = async (slug) => (await get(`/programmes/${slug}`))?.data ?? null;
export const getFaculty = async () => (await get('/faculty?limit=100'))?.data ?? [];
export const getNews = async (category, limit = 12) =>
  (await get(`/news?limit=${limit}${category ? `&category=${category}` : ''}`))?.data ?? [];
export const getNewsItem = async (slug) => (await get(`/news/${slug}`))?.data ?? null;
export const getPlacementStats = async () => (await get('/placements/stats'))?.data ?? null;
export const getRecruiters = async () => (await get('/recruiters?limit=100'))?.data ?? [];
export const getTestimonials = async () => (await get('/testimonials'))?.data ?? [];
export const getCampus = async (type) => (await get(`/campus?limit=100${type ? `&type=${type}` : ''}`))?.data ?? [];
export const getSettings = async () => (await get('/settings'))?.data ?? {};
