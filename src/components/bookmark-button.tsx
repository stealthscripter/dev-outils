"use client";

import { authClient } from "@/lib/auth-client";
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

  const { data: session } = authClient.useSession(); // Get session status

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
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData<any>(queryKey);

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
      queryClient.setQueryData(queryKey, context?.previousData);
      toast.error("Something went wrong. Please try again.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  // Show login prompt if user is not authenticated
  const handleBookmarkToggle = () => {
    if (!session) {
      toast.error("Please log in to bookmark this website.");
      return;
    }

    mutate();
  };

  return (
    <button
      onClick={handleBookmarkToggle}
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