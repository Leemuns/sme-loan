import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/auth";
import { UserCredentials } from "../../types";

export default function useLogin() {
  const queryClient = useQueryClient();
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessionUser"] });
    },
  });
  return (credentials: UserCredentials) => loginMutation.mutate(credentials);
}

// TODO: should prob make this async so I can await the login results.
