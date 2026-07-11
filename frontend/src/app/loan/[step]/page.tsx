import { notFound } from "next/navigation";

import BusinessForm from "@/components/ApplicationForm/BusinessForm";
import ContactForm from "@/components/ApplicationForm/ContactForm";
import FinanceForm from "@/components/ApplicationForm/FinanceForm";
import RequirementsForm from "@/components/ApplicationForm/RequirementsForm";
import DocumentsForm from "@/components/ApplicationForm/DocumentsForm";
import SummaryForm from "@/components/ApplicationForm/SummaryForm";

type Step =
  | "business"
  | "contact"
  | "finance"
  | "requirements"
  | "documents"
  | "summary"
  | "completion";

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
    case "finance":
      return <FinanceForm />;
    case "requirements":
      return <RequirementsForm />;
    case "documents":
      return <DocumentsForm />;
    case "summary":
      return <SummaryForm />;
    case "completion":
      return <h1>Submitted</h1>;
    default:
      const _exhaustiveCheck: never = step;
      notFound();
  }
}
