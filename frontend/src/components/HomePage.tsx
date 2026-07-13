"use client";

import { useRouter } from "next/navigation";
import { Button, Link } from "@mui/material";

import UserDashboard from "@/components/UserDashboard";
import useSession from "@/hooks/session/useSession";
import { useLoanStore } from "../providers/LoanStoreProvider";

export default function HomePage() {
  const router = useRouter();
  const { sessionUser, status } = useSession();
  const loanIsStarted = useLoanStore((state) => state.isStarted);
  const loanClearFields = useLoanStore((state) => state.clearFields);
  const loanSetField = useLoanStore((state) => state.setField);

  if (status === "pending") {
    return <p>Loading current user data</p>;
  } else if (status === "error") throw new Error("Error getting session");

  const handleNewApplication = () => {
    router.push("/loan-form/business");
    loanClearFields();
    loanSetField({ isStarted: true });
  };

  const handleContinueApplication = () => {
    router.push("/loan-form/business");
  };

  return (
    <div>
      <h1>Home page</h1>
      {sessionUser && <h3>Welcome {sessionUser.fullname}!</h3>}
      {sessionUser && (
        <p>
          Apply for a new loan
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={handleNewApplication}
            sx={{ ml: 1 }}
          >
            Start new application
          </Button>
        </p>
      )}
      {sessionUser && loanIsStarted && (
        <p>
          Or continue with current loan
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={handleContinueApplication}
            sx={{ ml: 1 }}
          >
            Continue application
          </Button>
        </p>
      )}
      {sessionUser && <UserDashboard />}

      {!sessionUser && (
        <Link href={"/login"}>
          Login/register first to start applying for loans
        </Link>
      )}
    </div>
  );
}
