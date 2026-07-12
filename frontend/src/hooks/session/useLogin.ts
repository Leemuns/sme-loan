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
  return async (credentials: UserCredentials) =>
    await loginMutation.mutateAsync(credentials);
}
