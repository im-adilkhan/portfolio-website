export type Metric = {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  tools: string[];
  tags: string[];
  thumb: string;
  cover: string;
  /** Sirf woh numbers jo actually verifiable hain. Khaali bhi ho sakta hai. */
  metrics: Metric[];
  problem: string;
  approach: string[];
  outcome: string;
  links?: { live?: string; repo?: string; dashboard?: string };
  featured?: boolean;
};

export type SkillCategory =
  | "BI & Reporting"
  | "SQL & Databases"
  | "Programming"
  | "ETL & Data Eng"
  | "Automation";

export type Skill = {
  name: string;
  level: number; // 0-100, self-assessed
  category: SkillCategory;
  icon?: string; // path under /images/logos
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  months: number;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  location: string;
  coursework: string[];
};

export type Social = {
  label: string;
  href: string;
  handle: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};
