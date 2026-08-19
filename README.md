# Adil Khan — Data Analyst Portfolio

Personal portfolio site — MIS reporting, Power BI dashboards, SQL/Python analysis aur ETL automation ka kaam dikhane ke liye.

**Live repo:** https://github.com/im-adilkhan/portfolio-website

> Ye site **vibecoded** hai — design aur code Claude Code ke saath pair karke banaye gaye hain. Content, numbers aur project details sab real hain (resume-verified); AI ne UI, animations aur plumbing likhi hai.

---

## Stack

| Layer | Kya use hua |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 3 (CSS variables se theming) |
| Animation | Framer Motion, GSAP, Lenis (smooth scroll) |
| Charts | Recharts |
| Forms | Zod validation + Resend (email) |
| Icons | lucide-react |

Koi database ya alag backend nahi — contact form ek Next.js route handler (`/api/contact`) se Resend ko email bhejta hai.

---

## Setup

```bash
npm install
cp .env.example .env.local   # phir keys bhar do
npm run dev
```

http://localhost:3000

### Scripts

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # build serve karo
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

---

## Env vars

| Key | Kya hai |
|---|---|
| `RESEND_API_KEY` | resend.com/api-keys se |
| `CONTACT_FROM_EMAIL` | Resend pe verified domain ka address (testing: `onboarding@resend.dev`) |
| `CONTACT_TO_EMAIL` | Jahan contact form ke messages aayenge |
| `NEXT_PUBLIC_SITE_URL` | Prod URL — OG metadata ke liye |

`.env.local` gitignored hai, kabhi commit mat karna.

---

## Structure

```
src/
├─ app/                 # routes — /, /about, /projects, /projects/[slug], /contact
│  ├─ api/contact/      # Resend route handler
│  └─ globals.css       # theme tokens + grid-paper / label-mono / axis-rule
├─ components/
│  ├─ animations/       # SplitText, TypingRoles, CountUp, MagneticButton...
│  ├─ charts/           # Recharts wrappers + chartTheme (SERIES palette)
│  ├─ layout/           # Navbar, Footer, SmoothScroll
│  ├─ sections/         # Hero, About, Skills, Projects, Experience, Contact
│  └─ ui/               # Button, Card, Badge, Input, SectionHeading...
├─ data/                # saara content yahan hai — code mein nahi
├─ hooks/  lib/  types/
```

---

## Theme — analytics console

Site jaan-bujh kar ek **BI dashboard** ki tarah padhti hai, generic creative portfolio ki tarah nahi:

- **Graph paper** background — 24px fine + 120px major gridlines (`.grid-paper`)
- **Dashboard panels** — squared corners, corner crop-ticks, optional mono header strip (`Card`)
- **Monospace readouts** — saare numbers `tabular-nums`, micro-labels `.label-mono`
- **Axis rules** — section headings ke neeche dashed chart axis (`.axis-rule`)
- **Ek hi palette** — chart colors (`chartTheme.ts` ka `SERIES`) hi UI chrome mein bhi use hote hain, to KPI tiles / skill bars / legends sab charts se match karte hain

Colors `src/app/globals.css` ke CSS variables mein hain — wahan badlo, poori site update ho jayegi.

---

## Content kahan badalna hai

| Chahiye | File |
|---|---|
| Naam, bio, phone, socials, resume link | `src/data/socials.ts` |
| Projects | `src/data/projects.ts` |
| Skills, stats, chart data | `src/data/skills.ts` |
| Experience, education, testimonials | `src/data/experience.ts` |
| Colors | `src/app/globals.css` |
| Chart colors | `src/components/charts/chartTheme.ts` |

Testimonials array khaali hai to woh section render hi nahi hota — asli quotes mile to `experience.ts` mein daal do, section apne aap aa jayega.

---

## Charts

Har chart real data se aata hai, dummy numbers nahi:

- `SkillRadarChart` — `skills.ts` ke levels ka category-wise average (self-assessed)
- `ToolsUsagePieChart` — hands-on time ka self-reported split
- `ExperienceBarChart` — har role mein kitne months (resume se calculated)
- `PipelineCard` — Loan Analytics project ke actual pipeline stages

Palette dark surface pe colorblind-safe hai.

---

## Animations

| Component | Kya karta hai |
|---|---|
| `SplitText` | Character-by-character reveal |
| `TypingRoles` | Rotating role headline |
| `MagneticButton` | Mouse ke paas khinchta hai |
| `CountUp` | Scroll pe 0 → target (decimals support) |
| `Card` | 3D tilt + cursor glow + corner ticks |
| `ScrollReveal` | Scroll-linked parallax |
| `CustomCursor` | Dot + ring cursor |
| `SmoothScroll` | Lenis smooth scrolling |

Sab `prefers-reduced-motion` respect karte hain.

---

## ⚠️ Abhi bharna baaki hai

1. **LinkedIn URL** — `src/data/socials.ts` mein abhi guessed hai, asli daalo.
2. **`public/resume.pdf`** — apna resume PDF yahan rakho (navbar ka Resume button isi pe jaata hai).
3. **Project screenshots** — `public/images/projects/`, filenames `src/data/projects.ts` mein already likhe hain.
4. **Avatar** — `public/images/profile/avatar.png`.
5. **Numbers** — abhi sirf resume-verified numbers site pe hain (2.2M records, 6 KPIs, 2 warehouses, months per role). Baaki 4 projects ke metrics khaali hain — asli numbers yaad aayein to `metrics: []` bhar do, warna tags dikhte rahenge. Jo helpful honge:
   - Recruitment MIS: kitne dashboards? kitne recruiters track hote the? kitne records?
   - Reporting Automation: pehle kitne ghante lagte the vs ab? kitne reports automate hue?
   - Attendance System: kitne employees use karte hain?
   - Sales/FMS/PMS: kitne workflows automate hue?

---

## Deploy

Vercel pe repo import karo, env vars daalo, done. `/api/contact` apne aap serverless function ban jaata hai.

---

## Contact

**Adil Khan** — Data Analyst, Noida
adilkhan468916@gmail.com · [GitHub](https://github.com/im-adilkhan)
