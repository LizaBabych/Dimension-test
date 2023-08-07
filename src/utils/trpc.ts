import { createTRPCNext } from "@trpc/next";
import { AppRouter } from "@/server";
import { httpBatchLink } from "@trpc/client";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `/api/trpc`,
        }),
      ],
    };
  },
  ssr: true,
});
