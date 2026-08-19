import type { Skill, SkillCategory } from "@/types";

/** level = self-assessed proficiency. Apne hisaab se adjust kar lena. */
export const skills: Skill[] = [
  // BI & Reporting
  { name: "Power BI", level: 90, category: "BI & Reporting", icon: "/images/logos/powerbi.svg" },
  { name: "Advanced Excel", level: 92, category: "BI & Reporting" },
  { name: "Google Sheets", level: 90, category: "BI & Reporting" },
  { name: "Apache Superset", level: 75, category: "BI & Reporting" },

  // SQL & Databases
  { name: "SQL", level: 90, category: "SQL & Databases", icon: "/images/logos/sql.svg" },
  { name: "MySQL", level: 88, category: "SQL & Databases" },
  { name: "PostgreSQL", level: 80, category: "SQL & Databases" },
  { name: "DuckDB", level: 74, category: "SQL & Databases" },

  // Programming
  { name: "Python", level: 88, category: "Programming", icon: "/images/logos/python.svg" },
  { name: "Pandas / NumPy", level: 88, category: "Programming" },
  { name: "Matplotlib / Seaborn", level: 82, category: "Programming" },
  { name: "Scikit-learn", level: 70, category: "Programming" },
  { name: "C++", level: 62, category: "Programming" },

  // ETL & Data Engineering
  { name: "ETL / ELT pipelines", level: 85, category: "ETL & Data Eng" },
  { name: "Data cleaning & validation", level: 92, category: "ETL & Data Eng" },
  { name: "Feature engineering", level: 80, category: "ETL & Data Eng" },
  { name: "dbt", level: 72, category: "ETL & Data Eng" },

  // Automation
  { name: "Excel VBA", level: 85, category: "Automation" },
  { name: "Google Apps Script", level: 88, category: "Automation" },
  { name: "JavaScript", level: 78, category: "Automation" },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  "BI & Reporting",
  "SQL & Databases",
  "Programming",
  "ETL & Data Eng",
  "Automation",
];

/** Radar chart — category-wise average of the levels above */
export const skillRadarData = SKILL_CATEGORIES.map((category) => {
  const group = skills.filter((s) => s.category === category);
  return {
    category,
    level: Math.round(group.reduce((sum, s) => sum + s.level, 0) / group.length),
  };
});

/** Pie chart — self-reported split of hands-on time. Apne hisaab se badal lena. */
export const toolsUsage = [
  { name: "SQL & databases", value: 30 },
  { name: "Python / Pandas", value: 25 },
  { name: "Power BI & Excel", value: 25 },
  { name: "Automation scripting", value: 15 },
  { name: "Other", value: 5 },
];

export const stats = [
  { label: "Years of experience", value: 2, suffix: "+" },
  { label: "Loan records processed", value: 2.2, suffix: "M+", decimals: 1 },
  { label: "Projects shipped", value: 6 },
  { label: "Tools & technologies", value: 20, suffix: "+" },
];
