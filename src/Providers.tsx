import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryDelay: failureCount =>
        Math.min(Math.pow(2, failureCount) * 1000, 24000),
      retry: 3,
      networkMode: "always",
      staleTime: Infinity
    }
  }
});

(window as any).queryClient = queryClient;

export function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <>{children}</>
    </QueryClientProvider>
  );
}
