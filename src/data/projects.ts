import type { Project } from "@/types";

/**
 * NOTE: metrics mein sirf woh numbers hain jo resume se verify hote hain.
 * Baaki projects ke liye numbers add karne hain — README ka "Numbers to add" section dekho.
 */
export const projects: Project[] = [
  {
    slug: "loan-analytics-etl-bi-platform",
    title: "Loan Analytics ETL & BI Platform",
    tagline: "2.2M loan records, from raw extract to analytics-ready warehouse.",
    description:
      "End-to-end ETL/ELT pipeline on LendingClub loan-portfolio data that extracts, validates, transforms and loads 2.2M+ records into a warehouse, with dbt models, SQL views and a Superset dashboard layer on top.",
    role: "Data Engineer / Analyst",
    year: "2026",
    tools: [
      "Python",
      "Pandas",
      "SQL",
      "DuckDB",
      "PostgreSQL",
      "dbt",
      "Apache Superset",
    ],
    tags: ["ETL", "Data Warehouse", "BI", "Feature Engineering"],
    thumb: "/images/projects/loan-analytics-thumb.png",
    cover: "/images/projects/loan-analytics-full.png",
    metrics: [
      { label: "Loan records processed", value: 2.2, suffix: "M+", decimals: 1 },
      { label: "Portfolio KPIs delivered", value: 6 },
      { label: "Warehouses loaded", value: 2 },
    ],
    problem:
      "Loan data arrived as large raw extracts with missing values, duplicates, inconsistent datatypes and no schema guarantees — so no reliable portfolio reporting was possible without someone manually cleaning files first.",
    approach: [
      "Built modular Python/Pandas workflows splitting extraction, validation, transformation, feature engineering and warehouse loading into separate production-style stages.",
      "Handled data cleaning: missing-value imputation, duplicate removal, datatype conversion and schema validation.",
      "Applied business-rule validation on loan amount, interest rate and loan status before anything reached the warehouse.",
      "Loaded processed datasets into DuckDB and PostgreSQL to create an analytics-ready warehouse.",
      "Wrote dbt staging and mart models with reusable SQL transformations plus data-quality tests.",
      "Created SQL views and indexes to keep analytical queries and reporting fast.",
      "Engineered business features: loan-to-income ratio, borrower segmentation, loan age and risk categories.",
      "Built interactive Superset dashboards and automated the full pipeline run.",
    ],
    outcome:
      "A repeatable, automated pipeline producing a governed warehouse and six portfolio KPIs — Default Rate, Portfolio at Risk (PAR), Loan Approval Rate, Average Loan Amount, ROI by Loan Grade and Interest Rate Distribution — all queryable in SQL and visualised in Superset.",
    links: { repo: "https://github.com/im-adilkhan/LendingClub-Data-Pipeline_Analysis" },
    featured: true,
  },
  {
    slug: "recruitment-mis-dashboards",
    title: "Recruitment MIS & Performance Dashboards",
    tagline: "Real-time visibility into recruiter and sales performance.",
    description:
      "MIS reporting layer and interactive Power BI dashboards for a recruitment business — tracking recruiter output, sales performance and pipeline status from MySQL and Google Sheets sources.",
    role: "Data Analyst",
    year: "2024–2026",
    tools: ["Power BI", "MySQL", "Python", "Pandas", "Excel", "Google Sheets"],
    tags: ["MIS", "Power BI", "KPI Reporting", "Recruitment Analytics"],
    thumb: "/images/projects/recruitment-mis-thumb.png",
    cover: "/images/projects/recruitment-mis-full.png",
    metrics: [],
    problem:
      "Performance tracking lived across scattered spreadsheets — Master DSR files, CV-shared reports, call records and open-position trackers — each maintained by hand. Leadership had no single, current view of recruiter or sales performance.",
    approach: [
      "Consolidated recruitment data from MySQL and Google Sheets into structured, validated datasets.",
      "Performed data extraction, cleaning and analysis with MySQL and Python (Pandas, NumPy) to surface trends and cut inconsistencies.",
      "Built interactive Power BI dashboards for recruiter and sales performance monitoring.",
      "Added data validation processes and structured storage to reduce errors and improve reliability.",
      "Supplemented with Matplotlib and Seaborn visualisations for deeper ad-hoc analysis.",
    ],
    outcome:
      "Real-time dashboards replaced manual status reports, giving the team shared visibility into recruiter output, sales performance and pipeline status.",
    links: { repo: "https://github.com/im-adilkhan/Recruitment_Performance_Analysis" },
    featured: true,
  },
  {
    slug: "reporting-automation",
    title: "Reporting Workflow Automation",
    tagline: "Manual report building, replaced by scheduled scripts.",
    description:
      "Automated recurring MIS reporting with Python and Excel VBA, plus JavaScript-driven Google Sheets solutions for candidate tracking — removing repetitive manual work from the reporting cycle.",
    role: "Data Analyst",
    year: "2024–2026",
    tools: ["Python", "Excel VBA", "JavaScript", "Google Sheets", "MySQL"],
    tags: ["Automation", "VBA", "Apps Script", "Data Quality"],
    thumb: "/images/projects/reporting-automation-thumb.png",
    cover: "/images/projects/reporting-automation-full.png",
    metrics: [],
    problem:
      "Recurring reports were rebuilt by hand every cycle — slow, and every manual touch was another chance to introduce an error.",
    approach: [
      "Automated reporting workflows using Python scripts and Excel VBA macros.",
      "Built Google Sheets solutions driven by JavaScript for candidate tracking and reporting.",
      "Added validation steps so bad data was caught before it reached a report.",
      "Standardised report structure so outputs stayed consistent cycle to cycle.",
    ],
    outcome:
      "Reporting turnaround got faster and manual effort dropped, while data accuracy improved through automated validation.",
    featured: true,
  },
  {
    slug: "machine-learning-predictive-analysis",
    title: "Machine Learning & Predictive Analysis",
    tagline: "Exploratory analysis through to predictive models, in notebooks.",
    description:
      "A set of Jupyter notebooks covering exploratory data analysis and supervised machine learning with Scikit-learn — the modelling side of the analyst work, kept separate from the reporting stack.",
    role: "Data Analyst",
    year: "2025–2026",
    tools: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
    tags: ["Machine Learning", "EDA", "Scikit-learn", "Notebooks"],
    thumb: "/images/projects/machine-learning-thumb.png",
    cover: "/images/projects/machine-learning-full.png",
    metrics: [],
    problem:
      "Descriptive dashboards answer what happened, not what is likely to happen next. This work is where I move past reporting into prediction.",
    approach: [
      "Ran exploratory data analysis with Pandas and NumPy to understand distributions, missing data and relationships before modelling.",
      "Visualised findings with Matplotlib and Seaborn to check assumptions rather than to decorate.",
      "Built and evaluated supervised machine learning models with Scikit-learn for predictive insights.",
      "Kept the work in reproducible Jupyter notebooks so each step can be re-run and reviewed.",
    ],
    outcome:
      "A reproducible notebook workflow from raw data through EDA to trained models — the foundation for adding predictive insight on top of the descriptive reporting I build day to day.",
    links: { repo: "https://github.com/im-adilkhan/machine_learning" },
  },
  {
    slug: "attendance-management-system",
    title: "Attendance Management System",
    tagline: "Live photo capture, real-time attendance, no paperwork.",
    description:
      "An attendance system built on Google Apps Script and JavaScript with live photo capture at check-in, giving real-time tracking and removing manual entry errors.",
    role: "Data Analyst & AI Automation Engineer",
    year: "2026",
    tools: ["Google Apps Script", "JavaScript", "Google Workspace", "Google Sheets"],
    tags: ["Automation", "Apps Script", "Internal Tools"],
    thumb: "/images/projects/attendance-thumb.png",
    cover: "/images/projects/attendance-full.png",
    metrics: [],
    problem:
      "Attendance was recorded manually, which meant delayed records, no verification that the person marking attendance was actually present, and errors that surfaced only at payroll time.",
    approach: [
      "Built the capture flow in Google Apps Script with JavaScript for live photo capture at check-in.",
      "Wired records into a structured Google Sheets backend for real-time tracking.",
      "Added validation and trigger-based updates so records stayed current without manual intervention.",
    ],
    outcome:
      "Attendance became verifiable and real-time, and manual entry errors were eliminated from the process.",
  },
  {
    slug: "sales-fms-pms-automation",
    title: "Sales, FMS & PMS Workflow Automation",
    tagline: "Trigger-based workflows across sales, facilities and projects.",
    description:
      "End-to-end workflow automation across sales, facility management and project management using Google Workspace and Apps Script — automatic task assignment, real-time updates and trigger-based routing.",
    role: "Data Analyst & AI Automation Engineer",
    year: "2026",
    tools: ["Google Apps Script", "JavaScript", "Google Workspace", "AI Automation"],
    tags: ["Automation", "Workflow", "Apps Script"],
    thumb: "/images/projects/workflow-automation-thumb.png",
    cover: "/images/projects/workflow-automation-full.png",
    metrics: [],
    problem:
      "Sales follow-ups, facility tasks and project updates were coordinated manually over chat and email — work fell through the gaps and nobody had a reliable view of what was assigned to whom.",
    approach: [
      "Automated end-to-end sales process workflows using Google Workspace and Apps Script.",
      "Built FMS and PMS solutions with automatic task assignment and real-time status updates.",
      "Set up trigger-based workflows so the next step fired without anyone chasing it.",
      "Integrated AI-assisted automation across the sales, attendance and project modules.",
    ],
    outcome:
      "Operations and team coordination were streamlined, with less manual overhead and clearer data to make decisions from.",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
