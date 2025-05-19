"use client";
import BookmarkButton from "@/components/bookmark-button";
import InfiniteScrollContainer from "@/components/infinite-scroll";
import kyInstance from "@/lib/ky";
import { websitePage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ionicon from "../../public/icons/ionicon.png";
import ResourcesLoadingSkeleton, {
  InitalResourceLoadingSkeleton,
} from "./resources-loading-skeleton";
import clsx from "clsx";

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
    return (
      <p className="flex font-quicksand text-muted-foreground">
        There are no websites in this category
      </p>
    );
  }

  return (
    <div className="relative col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-x-4 gap-y-6 md:gap-y-5 md:items-stretch items-center pb-20">
      {websites.map((website) => (
        <div
          className="p-4 rounded-sm font-quicksand dark:border dark:border-zinc-800 border border-zinc-200"
          key={website.name}
        >
          {/* Upper section */}
          <div className="mb-3 flex justify-between">
            <div className="size-10 relative">
              <Image
                src={website.iconUrl || ionicon}
                alt="Ionicons Logo"
                fill
                className="object-cover"
              />
            </div>
            <BookmarkButton
              websiteId={website.id}
              isBookmarked={website.isBookmarked}
            />
          </div>

          {/* Website details */}
          <div className="">
            <Link
              href={website.url}
              target="_blank"
              className="text-lg font-medium hover:underline w-fit cursor-pointer font-general capitalize"
            >
              {website.name}
            </Link>
            <p className="text-zinc-500 text-sm leading-5 my-1">
              {website.description}
            </p>
          </div>

          {/* Tags */}
          <div className="mt-2">{/* <Tag tags={website.tags ?? []} /> */}</div>
        </div>
      ))}
      {hasNextPage && !isFetchingNextPage && (
        <div className="absolute bottom-0 w-fit left-0 right-0 flex justify-center border hover:outline py-2 bg-opacity-80 dark:bg-opacity-80">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={clsx("w-full max-w-xs px-5 cursor-pointer")}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {isFetchingNextPage && <ResourcesLoadingSkeleton />}
    </div>
  );
}
