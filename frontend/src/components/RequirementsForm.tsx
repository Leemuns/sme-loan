"use client";

import { useLoanStore } from "@/providers/loanStoreProvider";
import { useRouter } from "next/navigation";
import { type SyntheticEvent } from "react";

export default function ContactForm() {
  const router = useRouter();
  const { loanAmount, tenure, setField } = useLoanStore((state) => state);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Loan amount:", loanAmount);
    console.log("Tenure:", tenure);

    router.push("/loan/summary");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="loanAmount">Loan Amount:</label>
        <input
          id="loanAmount"
          type="number"
          value={loanAmount}
          onChange={(e) => setField({ loanAmount: Number(e.target.value) })}
          placeholder="Enter your loan amount"
        />
      </div>
      <div>
        <label htmlFor="tenure">Tenure:</label>
        <input
          id="tenure"
          type="number"
          value={tenure}
          onChange={(e) => setField({ tenure: Number(e.target.value) })}
          placeholder="Enter preferred tenure"
        />
      </div>
      <button type="submit">Next</button>
    </form>
  );
}
