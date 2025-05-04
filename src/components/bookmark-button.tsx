// components/BookmarkButton.tsx
"use client";

import kyInstance from "@/lib/ky";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
interface BookmarkButtonProps {
  websiteId: string;
  isBookmarked: boolean;
}

export default function BookmarkButton({
  websiteId,
  isBookmarked,
}: BookmarkButtonProps) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";

  const queryKey = ["website-feed", "for-you", category];

  const { mutate } = useMutation({
    mutationFn: () =>
      isBookmarked
        ? kyInstance.delete("/api/bookmark", {
            json: { websiteId },
          })
        : kyInstance.post("/api/bookmark", {
            json: { websiteId },
          }),

    onMutate: async () => {
      // Cancel ongoing queries to avoid race conditions
      await queryClient.cancelQueries({ queryKey });

      // Snapshot of previous data
      const previousData = queryClient.getQueryData<any>(queryKey);

      // Optimistically update the cache
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            websites: page.websites.map((website: any) =>
              website.id === websiteId
                ? { ...website, isBookmarked: !isBookmarked }
                : website
            ),
          })),
        };
      });

      return { previousData };
    },

    onError(error, variables, context) {
      // Rollback to previous data
      queryClient.setQueryData(queryKey, context?.previousData);
      toast.error("Something went wrong. Please try again.");
    },

    onSettled: () => {
      // Always refetch to ensure data consistency
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <button
      onClick={() => mutate()}
      className="cursor-pointer"
      aria-label={isBookmarked ? "Unbookmark" : "Bookmark"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isBookmarked ? "#a963ff" : "none"}
        stroke="#a963ff"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}
