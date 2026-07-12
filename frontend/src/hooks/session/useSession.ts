import { useQuery } from "@tanstack/react-query";

import usersService from "@/services/users";

export default function useSession() {
  const result = useQuery({
    queryKey: ["sessionUser"],
    queryFn: usersService.getMe,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    sessionUser: result.data,
    status: result.status,
  };
}
