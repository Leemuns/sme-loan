"use client";

import { useLoanStore } from "@/providers/LoanStoreProvider";
import { useRouter } from "next/navigation";
import { type SyntheticEvent } from "react";

export default function ContactForm() {
  const router = useRouter();
  const { name, phone, setField } = useLoanStore((state) => state);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Phone:", phone);

    router.push("/loan/company");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setField({ name: e.target.value })}
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label htmlFor="phone">Phone Number:</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setField({ phone: e.target.value })}
          placeholder="Enter your phone number"
        />
      </div>
      <button type="submit">Next</button>
    </form>
  );
}
