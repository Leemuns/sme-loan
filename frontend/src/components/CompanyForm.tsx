"use client";

import { useLoanStore } from "@/providers/loanStoreProvider";
import { useRouter } from "next/navigation";
import { type SyntheticEvent } from "react";

export default function ContactForm() {
  const router = useRouter();
  const { companyName, industryType, setField } = useLoanStore(
    (state) => state,
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Company name:", companyName);
    console.log("Industry type:", industryType);

    router.push("/loan/requirements");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="companyName">Company name:</label>
        <input
          id="companyName"
          value={companyName}
          onChange={(e) => setField({ companyName: e.target.value })}
          placeholder="Enter your company name"
        />
      </div>
      <div>
        <label htmlFor="industryType">Industry type:</label>
        <input
          id="industryType"
          value={industryType}
          onChange={(e) => setField({ industryType: e.target.value })}
          placeholder="Enter your industry type"
        />
      </div>
      <button type="submit">Next</button>
    </form>
  );
}
