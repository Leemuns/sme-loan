import { useQuery } from "@tanstack/react-query";

import loansService from "@/services/loans";

export default function useLoanApplication(loanId: string) {
  const result = useQuery({
    queryKey: ["loanApplication"],
    queryFn: () => loansService.getLoanApplication(loanId),
    staleTime: 1000 * 60 * 5,
  });

  return {
    loanApplication: result.data,
    status: result.status,
  };
}
