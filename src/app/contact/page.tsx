import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Adil Khan — Data Analyst working in MIS, Power BI, SQL, Python and ETL automation.",
};

export default function ContactPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <ContactSection />
    </div>
  );
}
