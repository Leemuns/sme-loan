"use client";

import { useLoanStore } from "@/providers/LoanStoreProvider";
import { useRouter } from "next/navigation";
import { type SyntheticEvent } from "react";

export default function FinancialForm() {
  const router = useRouter();
  const { setField } = useLoanStore((state) => state);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    router.push("/loan/requirements");
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Financial</p>
      <button type="submit">Next</button>
    </form>
  );
}
