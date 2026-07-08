import { notFound } from "next/navigation";

import ContactForm from "@/components/ContactForm";
import CompanyForm from "@/components/CompanyForm";
import RequirementsForm from "@/components/RequirementsForm";
import SummaryForm from "@/components/SummaryForm";

type Step = "contact" | "company" | "requirements" | "summary" | "submitted";

export default async function Loan({
  params,
}: {
  params: Promise<{ step: Step }>;
}) {
  const { step } = await params;

  // const hasCompletedShipping = checkSomeCookieOrState();
  // if (step === 'payment' && !hasCompletedShipping) {
  //   redirect('/checkout/shipping');
  // }

  switch (step) {
    case "contact":
      return <ContactForm />;
    case "company":
      return <CompanyForm />;
    case "requirements":
      return <RequirementsForm />;
    case "summary":
      return <SummaryForm />;
    case "submitted":
      return <h1>Submitted</h1>;
    default:
      const _exhaustiveCheck: never = step;
      notFound();
  }
}
