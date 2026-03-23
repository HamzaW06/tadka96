# Tadka 96 — Indian Fusion Restaurant Website

A complete, production-ready restaurant website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma (SQLite), and NextAuth.js v5.

## Features

- **Public site**: Homepage, full menu with filters, order page, about, contact
- **Admin dashboard**: Menu CRUD, settings management, contact submissions inbox
- **Fully seeded**: All menu items, categories, and default settings ready to go
- **Mobile-first**: Bottom nav on mobile, responsive grid layouts
- **Performance**: ISR caching, React Server Components, lazy image loading
- **Security**: NextAuth middleware protection, rate limiting, input validation (Zod)

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and set:
- `NEXTAUTH_SECRET` — generate a strong secret: `openssl rand -base64 32`
- `NEXTAUTH_URL` — your production URL (e.g. `https://tadka96.com`)
- `NEXT_PUBLIC_SITE_URL` — same as NEXTAUTH_URL

### 3. Set up the database
```bash
npx prisma db push
```

### 4. Seed the database
```bash
npm run db:seed
```
This creates:
- Default admin user: `admin@tadka96.com` / `Tadka96Admin!`
- All 8 menu categories
- All menu items (40+ items)
- Default restaurant settings

### 5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin dashboard.

---

## Admin Dashboard

URL: `/admin`
Default credentials:
- Email: `admin@tadka96.com`
- Password: `Tadka96Admin!`

⚠️ **Change the password immediately after first login!**

### Admin Features
- **Menu Management** (`/admin/menu`): Add/edit/delete items, toggle availability, upload photos
- **Settings** (`/admin/settings`): Edit hours, contact info, taglines, about text
- **Contact Submissions** (`/admin/contacts`): View, mark read/unread, reply via email, delete

---

## Project Structure

```
tadka96/
├── prisma/
│   ├── schema.prisma     — Database schema
│   └── seed.ts           — Seeds all menu data + admin user
├── src/
│   ├── app/              — Next.js App Router pages
│   │   ├── page.tsx      — Homepage
│   │   ├── menu/         — Menu page
│   │   ├── order/        — Order page
│   │   ├── about/        — About page
│   │   ├── contact/      — Contact page
│   │   ├── admin/        — Admin dashboard (protected)
│   │   └── api/          — API routes
│   ├── components/       — React components
│   ├── lib/              — Utilities, auth, Prisma client
│   └── styles/           — Global CSS
└── public/
    └── images/           — Static images + uploaded menu photos
```

---

## Deployment on Vercel

1. Push code to GitHub
2. Import repo in Vercel dashboard
3. Set environment variables:
   - `DATABASE_URL` — Use a production database (see note below)
   - `NEXTAUTH_SECRET` — Strong random string
   - `NEXTAUTH_URL` — Your Vercel URL
   - `NEXT_PUBLIC_SITE_URL` — Same as NEXTAUTH_URL
4. Deploy!

> **Note on SQLite + Vercel**: SQLite works locally and on long-running servers but NOT on Vercel (serverless — ephemeral filesystem). For Vercel deployment, switch to PostgreSQL:
> 1. Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) or [Neon](https://neon.tech) (free tier)
> 2. Change `prisma/schema.prisma` datasource: `provider = "postgresql"`
> 3. Update `DATABASE_URL` to your PostgreSQL connection string
> 4. Run `npx prisma db push` and `npm run db:seed`

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | SQLite: `file:./dev.db` or PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random secret for JWT signing |
| `NEXTAUTH_URL` | Full URL of your site |
| `NEXT_PUBLIC_SITE_URL` | Same as NEXTAUTH_URL (used for metadata) |

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Database**: SQLite via Prisma ORM
- **Auth**: NextAuth.js v5 (credentials provider)
- **Styling**: Tailwind CSS 3
- **Validation**: Zod
- **Images**: next/image with sharp

---

## Color Palette

| Color | Hex | Usage |
|---|---|---|
| Tikka Red | `#C0392B` | Primary / CTAs |
| Turmeric Gold | `#D4A017` | Secondary / Accents |
| Saffron Orange | `#E67E22` | Highlights |
| Dark Navy | `#1A1A2E` | Background |
| Card Navy | `#2C2C44` | Cards |

---

*"Where Flavor and Heart Meet" — Tadka 96*
