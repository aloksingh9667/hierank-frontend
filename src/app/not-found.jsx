import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow mb-3">Error 404</p>
        <h1 className="h-lg">This page could not be found</h1>
        <p className="lead mt-4">The page you are looking for may have moved. Try one of the sections below.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/programmes" className="btn-secondary">View Programmes</Link>
        </div>
      </div>
    </section>
  );
}
