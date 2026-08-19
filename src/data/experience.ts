import type { Education, Experience, Testimonial } from "@/types";

export const experience: Experience[] = [
  {
    company: "Aggarwal Vikram and Associates",
    role: "Data Analyst & AI Automation Engineer",
    period: "May 2026 — Present",
    months: 4,
    location: "Delhi, India",
    summary:
      "Building internal automation across sales, attendance and project operations on Google Workspace, with AI-assisted workflows on top.",
    highlights: [
      "Built an Attendance Management System with live photo capture using Google Apps Script and JavaScript, enabling real-time tracking and removing manual entry errors.",
      "Automated end-to-end sales process workflows using Google Workspace and Apps Script to improve productivity, sales performance and customer engagement.",
      "Developed FMS & PMS solutions with automatic task assignment, real-time updates and trigger-based workflows to streamline operations and team coordination.",
      "Integrated AI-assisted automation across sales, attendance and project modules to support data-driven decisions and cut manual overhead.",
    ],
    stack: ["Google Apps Script", "JavaScript", "Google Workspace", "AI Automation"],
  },
  {
    company: "Reliable Allied Services (Diamond Ore Consulting Pvt. Ltd.)",
    role: "Data Analyst",
    period: "Jul 2024 — Apr 2026",
    months: 21,
    location: "Noida, India",
    summary:
      "Owned MIS reporting and dashboards for a recruitment business — extraction and cleaning through to real-time performance monitoring.",
    highlights: [
      "Developed and maintained MIS reports and interactive dashboards using Power BI, Excel and Google Sheets for performance tracking.",
      "Performed data extraction, cleaning and analysis using MySQL and Python (Pandas, NumPy) to identify trends and reduce data inconsistencies.",
      "Automated reporting workflows using Python and Excel VBA, reducing manual effort and improving reporting speed.",
      "Designed dashboards and visualisations using Power BI, Matplotlib and Seaborn to support data-driven decision-making.",
      "Conducted exploratory data analysis and implemented machine learning models using Scikit-learn for predictive insights.",
      "Built and automated Google Sheets solutions using JavaScript for candidate tracking, improving accuracy and reducing manual work.",
      "Implemented data validation processes and structured storage to minimise errors and improve reliability.",
      "Developed real-time dashboards for recruiter and sales performance monitoring, improving team visibility and productivity.",
    ],
    stack: ["Power BI", "MySQL", "Python", "Pandas", "Excel VBA", "JavaScript"],
  },
  {
    company: "Reliable Allied Services (Diamond Ore Consulting Pvt. Ltd.)",
    role: "Data Analyst Intern",
    period: "Apr 2024 — Jul 2024",
    months: 3,
    location: "Noida, India",
    summary:
      "Supported recruitment operations reporting — master datasets, pipeline tracking and weekly performance analysis.",
    highlights: [
      "Maintained and organised Master DSR datasets and CV-shared reports categorised by recruiters and Key Account Managers.",
      "Prepared and analysed performance data for the weekly Rewards & Recognition program.",
      "Managed and updated consolidated call records and open-position tracking reports to monitor pipeline status.",
      "Assisted in data cleaning, validation and reporting using Excel, Google Sheets and MySQL.",
      "Completed the internship with performance exceeding expectations across 90 working days.",
    ],
    stack: ["Excel", "Google Sheets", "MySQL"],
  },
];

export const education: Education[] = [
  {
    school: "Dr. A.P.J. Abdul Kalam Technical University — BBDIT College",
    degree: "Bachelor of Computer Applications (BCA)",
    period: "2025 — 2027",
    location: "Ghaziabad, UP",
    coursework: [
      "Data Analysis",
      "Algorithms",
      "Database Management Systems",
      "Computer Systems",
      "Machine Learning",
      "C++",
      "Object-Oriented Programming",
    ],
  },
];

/** Khaali hai to Testimonials section render hi nahi hoga. Asli quotes mile to yahan daal do. */
export const testimonials: Testimonial[] = [];
