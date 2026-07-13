import { notFound } from "next/navigation";

import BusinessForm from "@/components/ApplicationForm/BusinessForm";
import ContactForm from "@/components/ApplicationForm/ContactForm";
import FinanceForm from "@/components/ApplicationForm/FinanceForm";
import RequirementsForm from "@/components/ApplicationForm/RequirementsForm";
import DocumentsForm from "@/components/ApplicationForm/DocumentsForm";
import SummaryForm from "@/components/ApplicationForm/SummaryForm";
import FormStepper from "@/components/ApplicationForm/FormStepper";
import { FormStep, FormStepValues } from "../../../types";

export default async function LoanForm({
  params,
}: {
  params: Promise<{ step: FormStep }>;
}) {
  const { step } = await params;

  const renderFormStep = () => {
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
        return (
          <h1>
            Submitted! You can view track/view your loan applications in the
            home page.
          </h1>
        );
      default:
        const _exhaustiveCheck: never = step;
        notFound();
    }
  };

  return (
    <>
      {step !== "completion" && (
        <FormStepper activeStep={FormStepValues.indexOf(step)} />
      )}
      {renderFormStep()}
    </>
  );
}
