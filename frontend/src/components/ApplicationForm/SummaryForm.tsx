"use client";

import { useRouter } from "next/navigation";
import { type SyntheticEvent } from "react";

import { useLoan } from "@/hooks/useLoan";
import BusinessForm from "./BusinessForm";
import ContactForm from "./ContactForm";
import SummaryChunk from "./SummaryChunk";
import FinanceForm from "./FinanceForm";
import RequirementsForm from "./RequirementsForm";
import { Button } from "@mui/material";

export default function SummaryForm() {
  const router = useRouter();
  const fields = useLoan();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(fields);
    const res = await fetch("/api/loans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    if (!res.ok) throw new Error("Failed to add new loan");
    // return await res.json();
    router.push("/loan/completion");
  };

  return (
    <form onSubmit={handleSubmit}>
      <SummaryChunk path="/loan/business">
        <BusinessForm readOnly />
      </SummaryChunk>
      <SummaryChunk path="/loan/contact">
        <ContactForm readOnly />
      </SummaryChunk>
      <SummaryChunk path="/loan/finance">
        <FinanceForm readOnly />
      </SummaryChunk>
      <SummaryChunk path="/loan/requirements">
        <RequirementsForm readOnly />
      </SummaryChunk>
      <Button
        type="submit"
        variant="contained"
        size="small"
        color="info"
        sx={{ flexShrink: 0, mb: 2 }}
      >
        Submit Loan Application
      </Button>
    </form>
  );
}
