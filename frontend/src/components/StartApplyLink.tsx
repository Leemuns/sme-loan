"use client";

import Link from "next/link";

import useSession from "@/hooks/session/useSession";

export default function StartApplyLink() {
  const { sessionUser, status } = useSession(); // TODO: handle status

  return (
    <div>
      {sessionUser ? (
        <Link href={`/loan/contact`}>new SME loan application</Link>
      ) : (
        <Link href={`/login`}>Login to start applying</Link>
      )}
    </div>
  );
}
