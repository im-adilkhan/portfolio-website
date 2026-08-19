import type { Social } from "@/types";

export const profile = {
  name: "Adil Khan",
  role: "Data Analyst",
  roles: [
    "Data Analyst",
    "MIS & Reporting",
    "Power BI Developer",
    "ETL Engineer",
    "Automation Engineer",
  ],
  headline: "Data Analyst | MIS | Power BI | SQL | Python | ETL & Data Automation",
  location: "Noida, India",
  email: "adilkhan468916@gmail.com",
  phone: "+91 93110 52015",
  bio: "I turn messy operational data into MIS reports, dashboards and automated pipelines that teams actually run on — 2+ years across recruitment analytics, reporting automation and end-to-end ETL.",
  available: true,
  resume: "/resume.pdf",
  avatar: "/images/profile/avatar.png",
};

// TODO(adil): LinkedIn URL abhi placeholder hai — apna asli profile link daal do
export const socials: Social[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adil-khan",
    handle: "/in/adil-khan",
  },
  { label: "GitHub", href: "https://github.com/im-adilkhan", handle: "@im-adilkhan" },
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
  { label: "Phone", href: "tel:+919311052015", handle: profile.phone },
];

export const navLinks = [
  { label: "Home", href: "/", section: "home" },
  { label: "About", href: "/about", section: "about" },
  { label: "Projects", href: "/projects", section: "projects" },
  { label: "Contact", href: "/contact", section: "contact" },
];
