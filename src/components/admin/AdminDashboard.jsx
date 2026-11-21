'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { LayoutDashboard, FileText, Mail, CalendarCheck, LogOut, Loader2, Search } from 'lucide-react';
import { request } from '@/lib/client-api';
import { clearToken, getToken } from '@/lib/auth';
import { formatDate } from '@/lib/format';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'applications', label: 'Applications', icon: FileText },
  { id: 'enquiries', label: 'Enquiries', icon: Mail },
  { id: 'tours', label: 'Campus Tours', icon: CalendarCheck },
];

const STATUS = {
  applications: ['submitted', 'under_review', 'shortlisted', 'interview', 'offered', 'enrolled', 'rejected', 'withdrawn'],
  enquiries: ['new', 'contacted', 'closed'],
  tours: ['requested', 'confirmed', 'completed', 'cancelled'],
};

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setTokenState] = useState(null);
  const [tab, setTab] = useState('overview');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const t = getToken();
    if (!t) { router.replace('/admin/login'); return; }
    request('/auth/me', { token: t }).then((r) => { setUser(r.user); setTokenState(t); }).catch(() => { clearToken(); router.replace('/admin/login'); });
  }, [router]);

  if (!token) return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-navy" /></div>;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="bg-navy p-5 text-white md:w-64 md:shrink-0">
        <p className="font-serif text-xl">HBS Admin</p>
        <p className="mb-6 text-xs text-white/60">{user?.name} · {user?.role}</p>
        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={clsx('flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-2.5 text-left text-sm font-semibold', tab === t.id ? 'bg-white/15 text-gold' : 'text-white/75 hover:bg-white/10')}>
              <t.icon className="h-4 w-4" />{t.label}
            </button>
          ))}
          <button onClick={() => { clearToken(); router.replace('/admin/login'); }} className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-semibold text-white/75 hover:bg-white/10 md:mt-8"><LogOut className="h-4 w-4" />Sign out</button>
        </nav>
      </aside>
      <main className="flex-1 overflow-x-auto p-5 md:p-8">
        {tab === 'overview' ? <Overview token={token} /> : <LeadTable key={tab} kind={tab} token={token} />}
      </main>
    </div>
  );
}

function Overview({ token }) {
  const [s, setS] = useState(null);
  useEffect(() => { request('/admin/stats', { token }).then((r) => setS(r.data)).catch(() => {}); }, [token]);
  if (!s) return <Loader2 className="h-6 w-6 animate-spin text-navy" />;
  const cards = [['Applications', s.applications], ['Last 30 days', s.applicationsLast30Days], ['Enquiries', s.enquiries], ['New enquiries', s.newEnquiries], ['Pending tours', s.pendingTours]];
  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl text-navy">Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{cards.map(([l, v]) => <div key={l} className="rounded-card border border-navy/10 bg-white p-5"><p className="font-serif text-4xl text-navy">{v}</p><p className="mt-1 text-sm text-muted">{l}</p></div>)}</div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Breakdown title="Applications by status" data={s.applicationsByStatus} />
        <Breakdown title="Applications by programme" data={s.applicationsByProgramme} />
      </div>
    </div>
  );
}

function Breakdown({ title, data }) {
  const entries = Object.entries(data || {});
  const max = Math.max(1, ...entries.map(([, v]) => v));
  return (
    <div className="rounded-card border border-navy/10 bg-white p-6">
      <h2 className="mb-4 font-serif text-lg text-navy">{title}</h2>
      {entries.length ? <ul className="space-y-3">{entries.map(([k, v]) => <li key={k}><div className="flex justify-between text-sm"><span className="capitalize">{k.replace('_', ' ')}</span><b>{v}</b></div><div className="mt-1 h-2 rounded-full bg-tint"><div className="h-2 rounded-full bg-gold" style={{ width: `${(v / max) * 100}%` }} /></div></li>)}</ul> : <p className="text-sm text-muted">No data yet.</p>}
    </div>
  );
}

function LeadTable({ kind, token }) {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1, total: 0 });
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    const params = new URLSearchParams({ page, limit: 15 });
    if (q) params.set('q', q);
    if (status) params.set('status', status);
    try {
      const r = await request(`/admin/${kind}?${params}`, { token });
      setRows(r.data); setMeta(r.meta);
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  }, [kind, token, q, status, page]);

  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t); }, [load]);

  async function changeStatus(row, next) {
    const path = kind === 'applications' ? `/admin/applications/${row._id}/status` : `/admin/${kind}/${row._id}`;
    try {
      await request(path, { method: 'PATCH', token, body: { status: next } });
      setRows((rs) => rs.map((r) => (r._id === row._id ? { ...r, status: next } : r)));
    } catch (e) { setError(e.message); }
  }

  const cols = {
    applications: [['No.', (r) => r.applicationNo], ['Applicant', (r) => <><b>{r.applicant?.fullName}</b><br /><span className="text-xs text-muted">{r.applicant?.email} · {r.applicant?.phone}</span></>], ['Programme', (r) => r.programmeCode], ['Applied', (r) => formatDate(r.createdAt)]],
    enquiries: [['Name', (r) => <><b>{r.name}</b><br /><span className="text-xs text-muted">{r.email} · {r.phone}</span></>], ['Programme', (r) => r.programme || '—'], ['Message', (r) => <span className="line-clamp-2 max-w-xs text-xs">{r.message || '—'}</span>], ['Received', (r) => formatDate(r.createdAt)]],
    tours: [['Name', (r) => <><b>{r.name}</b><br /><span className="text-xs text-muted">{r.email} · {r.phone}</span></>], ['Visit date', (r) => `${formatDate(r.preferredDate)} (${r.timeSlot})`], ['Visitors', (r) => r.visitors], ['Requested', (r) => formatDate(r.createdAt)]],
  }[kind];

  return (
    <div className="space-y-5">
      <h1 className="font-serif text-3xl capitalize text-navy">{kind === 'tours' ? 'Campus tours' : kind}</h1>
      <div className="flex flex-wrap gap-3">
        <div className="relative"><Search className="absolute left-3 top-3.5 h-4 w-4 text-muted" /><input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search name, email, phone…" className="input w-72 !pl-9" /></div>
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="input w-52"><option value="">All statuses</option>{STATUS[kind].map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}</select>
      </div>
      {error && <p className="rounded-control bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <div className="overflow-x-auto rounded-card border border-navy/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-tint text-xs uppercase tracking-eyebrow text-muted"><tr>{cols.map(([h]) => <th key={h} className="px-4 py-3">{h}</th>)}<th className="px-4 py-3">Status</th></tr></thead>
          <tbody className="divide-y divide-line">
            {loading && <tr><td colSpan={cols.length + 1} className="p-6 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></td></tr>}
            {!loading && !rows.length && <tr><td colSpan={cols.length + 1} className="p-8 text-center text-muted">No records found.</td></tr>}
            {!loading && rows.map((r) => (
              <tr key={r._id} className="align-top">
                {cols.map(([h, fn]) => <td key={h} className="px-4 py-3">{fn(r)}</td>)}
                <td className="px-4 py-3"><select value={r.status} onChange={(e) => changeStatus(r, e.target.value)} className="rounded-lg border border-line bg-white px-2 py-1.5 text-xs font-semibold capitalize">{STATUS[kind].map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}</select></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>{meta.total} records</span>
        <div className="flex items-center gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-line bg-white px-3 py-1.5 disabled:opacity-40">Previous</button>
          <span>Page {meta.page} of {meta.pages}</span>
          <button disabled={page >= meta.pages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-line bg-white px-3 py-1.5 disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>
  );
}
