import { getMe } from "@/fakeapi/fakeapi";
import { useAuthState } from "@/stores/auth-store";
import { skipToken, useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  const { token } = useAuthState();

  const { data: user, ...rest } = useQuery({
    queryKey: ["me", token],
    queryFn: token ? () => getMe({ token }) : skipToken,
    staleTime: Infinity
  });

  return { user, ...rest };
}
