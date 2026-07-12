import { useQuery } from "@tanstack/react-query";

import loansService from "@/services/loans";

export default function useUserLoanApplications() {
  const result = useQuery({
    queryKey: ["userLoanApplications"],
    queryFn: loansService.getLoanApplicationsCurrentUser,
    staleTime: 1000 * 60 * 5,
  });

  return {
    loanApplications: result.data,
    status: result.status,
  };
}
