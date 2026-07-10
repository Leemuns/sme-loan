"use client";

import { type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import { useLoanStore } from "@/providers/LoanStoreProvider";

export default function RequirementsForm() {
  const router = useRouter();
  const { setField } = useLoanStore((state) => state);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    router.push("/loan/summary");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Next</button>
    </form>
  );
}
