import { notFound } from "next/navigation";

import BusinessForm from "@/components/ApplicationForm/BusinessForm";
import ContactForm from "@/components/ApplicationForm/ContactForm";
import FinancialForm from "@/components/ApplicationForm/FinanceForm";
import RequirementsForm from "@/components/ApplicationForm/RequirementsForm";
import DocumentsForm from "@/components/ApplicationForm/DocumentsForm";
import SummaryForm from "@/components/ApplicationForm/SummaryForm";

type Step =
  | "business"
  | "contact"
  | "financial"
  | "requirements"
  | "documents"
  | "summary"
  | "confirmation";

export default async function Loan({
  params,
}: {
  params: Promise<{ step: Step }>;
}) {
  const { step } = await params;

  switch (step) {
    case "business":
      return <BusinessForm />;
    case "contact":
      return <ContactForm />;
    case "financial":
      return <FinancialForm />;
    case "requirements":
      return <RequirementsForm />;
    case "documents":
      return <DocumentsForm />;
    case "summary":
      return <SummaryForm />;
    case "confirmation":
      return <h1>Submitted</h1>;
    default:
      const _exhaustiveCheck: never = step;
      notFound();
  }
}
