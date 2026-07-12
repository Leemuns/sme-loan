import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "@/services/auth";

export default function useLogin() {
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(["sessionUser"], null);
    },
  });
  return async () => logoutMutation.mutateAsync();
}
