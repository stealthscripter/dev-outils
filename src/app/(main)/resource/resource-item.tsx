"use client";

import InfiniteScrollContainer from "@/components/infinite-scroll";
import kyInstance from "@/lib/ky";
import { websitePage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import ResourcesLoadingSkeleton, {
  InitalResourceLoadingSkeleton,
} from "./resources-loading-skeleton";
import { useSearchParams } from "next/navigation";
import BookmarkButton from "@/components/bookmark-button";

export default function ResourceItem() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "all";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["website-feed", "for-you", category],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get("/api/website", {
          searchParams: {
            ...(pageParam && { cursor: pageParam }),
            category,
          },
        })
        .json<websitePage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const websites = data?.pages.flatMap((page) => page.websites) || [];

  if (status === "pending") {
    return <InitalResourceLoadingSkeleton />;
  }

  if (status === "error") {
    return <p>An error occurred while loading websites</p>;
  }

  if (websites.length === 0) {
    return <p className="flex">There are no websites in this category</p>;
  }

  return (
    <InfiniteScrollContainer
      className="col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 md:gap-y-5 items-center"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {websites.map((website) => (
        <div className="px-4 py-2 bg-card rounded-xl" key={website.title}>
          {/* Upper section */}
          <div className="mb-3 flex items-center justify-end">
            <BookmarkButton
              websiteId={website.id}
              isBookmarked={website.isBookmarked}
            />
          </div>

          {/* Website details */}
          <div className="">
            <h1 className="text-lg font-medium hover:underline w-fit cursor-pointer">
              {website.title}
            </h1>
            <p className="text-zinc-500 text-sm leading-5 my-1">
              {website.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-2">{/* <Tag tags={website.tags ?? []} /> */}</div>
        </div>
      ))}

      {isFetchingNextPage && <ResourcesLoadingSkeleton />}
    </InfiniteScrollContainer>
  );
}
