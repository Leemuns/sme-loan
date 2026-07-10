"use client";

import { useLoanStore } from "@/providers/LoanStoreProvider";
import { useRouter } from "next/navigation";
import { type SyntheticEvent } from "react";

export default function SummaryForm() {
  const router = useRouter();
  const { name, companyName, industryType } = useLoanStore((state) => state);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Submit data to fastapi backend");

    router.push("/loan/submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" value={name} readOnly />
      </div>
      <div>
        <label htmlFor="industryType">Industry type:</label>
        <input id="industryType" value={industryType} readOnly />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
