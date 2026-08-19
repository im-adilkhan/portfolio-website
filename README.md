# Adil Khan — Data Analyst Portfolio

Next.js 15 (App Router) + TypeScript + Tailwind + Framer Motion + Recharts.
Contact form Resend ke through email bhejta hai — koi alag backend nahi.

## Setup

```bash
npm install
cp .env.example .env.local   # phir keys bhar do
npm run dev
```

http://localhost:3000

## Env vars

| Key | Kya hai |
|---|---|
| `RESEND_API_KEY` | resend.com/api-keys se |
| `CONTACT_FROM_EMAIL` | Verified domain ka address (testing: `onboarding@resend.dev`) |
| `CONTACT_TO_EMAIL` | Jahan messages aayenge — `adilkhan468916@gmail.com` |
| `NEXT_PUBLIC_SITE_URL` | Prod URL, OG metadata ke liye |

## ⚠️ Abhi bharna baaki hai

1. **LinkedIn + GitHub URL** — `src/data/socials.ts` mein abhi guessed hain, asli daalo.
2. **`public/resume.pdf`** — apna resume PDF yahan rakho (navbar ka Resume button isi pe jaata hai).
3. **Project screenshots** — `public/images/projects/` mein, filenames `src/data/projects.ts` mein already likhe hain.
4. **Avatar** — `public/images/profile/avatar.png`.
5. **Numbers** — abhi sirf resume-verified numbers site pe hain (2.2M records, 6 KPIs, 2 warehouses, months per role). Baaki 4 projects ke metrics khaali hain — inke liye asli numbers yaad aayein to `metrics: []` bhar do, warna tags dikhte rahenge. Jo numbers helpful honge:
   - Recruitment MIS: kitne dashboards? kitne recruiters track hote the? kitne records?
   - Reporting Automation: pehle kitne ghante lagte the vs ab? kitne reports automate hue?
   - Attendance System: kitne employees use karte hain?
   - Sales/FMS/PMS: kitne workflows automate hue?

## Content kahan badalna hai

| Chahiye | File |
|---|---|
| Naam, bio, phone, socials, resume link | `src/data/socials.ts` |
| Projects | `src/data/projects.ts` |
| Skills, stats, chart data | `src/data/skills.ts` |
| Experience, education, testimonials | `src/data/experience.ts` |
| Colors | `src/app/globals.css` (CSS vars) |
| Chart colors | `src/components/charts/chartTheme.ts` |

Testimonials array khaali hai to woh section render hi nahi hota — asli quotes mile to `experience.ts` mein daal do, section apne aap aa jayega.

## Animations

| Component | Kya karta hai |
|---|---|
| `SplitText` | Character-by-character reveal |
| `TypingRoles` | Rotating role headline |
| `MagneticButton` | Mouse ke paas khinchta hai |
| `CountUp` | Scroll pe 0 → target (decimals support) |
| `Card` | 3D tilt + cursor glow |
| `ScrollReveal` | Scroll-linked parallax |
| `CustomCursor` | Dot + ring cursor |
| `SmoothScroll` | Lenis smooth scrolling |

Sab `prefers-reduced-motion` respect karte hain.

## Charts

Colors ek validated palette se hain (colorblind-safe on dark surface). Har chart real data se aata hai:

- `SkillRadarChart` — `skills.ts` ke levels ka category-wise average (self-assessed)
- `ToolsUsagePieChart` — hands-on time ka self-reported split
- `ExperienceBarChart` — har role mein kitne months (resume se calculated)
- `PipelineCard` — Loan Analytics project ke actual pipeline stages

## Deploy

Vercel pe repo import karo, env vars daalo, done. `/api/contact` serverless function ban jaata hai.
