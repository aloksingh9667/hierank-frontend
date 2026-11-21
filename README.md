# Hierank Business School — Frontend

Modern, high-performance web application and admissions portal for Hierank Business School, built with Next.js 14 (App Router) and Tailwind CSS.

## Features
- **Design System**: "Academic Prestige & Global Leadership" aesthetic (Playfair Display + Plus Jakarta Sans, Midnight Navy & Champagne Gold).
- **Public Website**:
  - Home showcase with interactive programme tabs, recruiter wall, testimonials, and lead forms.
  - Programme catalogue and detail pages (`/programmes/[slug]`).
  - Admissions portal with 4-step process and full online application form (`/admissions`).
  - Placements report with interactive sector breakdowns and recruiter stats (`/placements`).
  - Faculty directory, campus life gallery, news & events, campus tour booking.
- **Admin Dashboard** (`/admin`):
  - Overview stats for applications, enquiries, and tour bookings.
  - Status management for student applications, inquiries, and tour requests.
- **Resilience**: ISR revalidation (60s) with graceful fallback to empty states if API is unreachable.

## Tech Stack
- **Framework**: Next.js 14 (App Router, Server & Client Components)
- **UI Library**: React 18, Tailwind CSS, Lucide React Icons
- **Data Fetching**: Native Fetch with caching & revalidation

## Getting Started

### 1. Prerequisites
- Node.js 18+
- Running backend API (e.g. `hierank-backend` at `http://localhost:5000`)

### 2. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Install Dependencies & Run
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.
Admin login is available at [http://localhost:3000/admin](http://localhost:3000/admin).

## Available Scripts
- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Builds the production bundle.
- `npm run start`: Starts production server.
- `npm run lint`: Runs ESLint checks.
