"use client";

import InfiniteScrollContainer from "@/components/infinite-scroll";
import kyInstance from "@/lib/ky";
import { websitePage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Bookmark } from "lucide-react";
import ResourcesLoadingSkeleton from "./resources-loading-skeleton";

export default function ResourceItem() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["website-feed", "for-you"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/website",
          pageParam ? { searchParams: { cursor: pageParam } } : {}
        )
        .json<websitePage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const wesbites = data?.pages.flatMap((page) => page.websites) || [];

  if (status === "pending") {
    return <ResourcesLoadingSkeleton />;
  }

  if (status === "error") {
    return <p>An error occured while loading websites</p>;
  }

  return (
    <InfiniteScrollContainer
      className="border border-amber-700 col-span-3  grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-x-7 bg-yellow-50 gap-y-6 md:gap-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {wesbites.map((website) => (
        <div
          className="border border-amber-700 px-2 py-1 bg-yellow-200"
          key={website.title}
        >
          {/* upper one */}
          <div className="border border-amber-700 mb-3 flex items-center justify-end">
            <button className="cursor-pointer">
              <Bookmark strokeWidth={0.5} startOffset={0} size={24} />
            </button>
          </div>
          {/* details */}
          <div className="border border-amber-700">
            <h1 className="text-lg font-medium hover:underline w-fit cursor-pointer">
              {website.title}
            </h1>
            <p className="text-zinc-500 text-sm leading-5 my-1">
              {website.description}
            </p>
          </div>

          {/* tags */}
          <div className="border border-amber-600 mt-2">
            {/* <Tag tags={website.tags ?? []} /> */}
          </div>
        </div>
      ))}
      {isFetchingNextPage && <ResourcesLoadingSkeleton /> }
    </InfiniteScrollContainer>
  );
}
