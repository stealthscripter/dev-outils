"use client";
import BookmarkCard from "@/components/bookmark-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookmarks } from "@/hooks/use-bookmark";
import { authClient } from "@/lib/auth-client";
import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface Website {
  id: string;
  name: string;
  url: string;
  description: string | null;
  imageUrl: string | null;
  iconUrl: string | null;
  category: {
    name: string;
  };
  tags: {
    name: string;
  }[];
}

export interface Bookmark {
  website: Website;
}

export function AccountBookmark() {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const { data, isLoading, isError, error } = useQuery<Bookmark[]>({
    queryKey: ["user-bookmarks", userId],
    queryFn: () => kyInstance.get(`/api/bookmark`).json(),
  });

  if (isLoading) {
    return (
      <div className="mt-4 grid grid-cols-4 gap-x-6 gap-y-1">
        <div className="col-span-full">
          <Skeleton className="h-4 w-40"  />
        </div>
        <div className="mt-2 flex justify-between items-start p-3 gap-x-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-start p-3 font-quicksand dark:border border-zinc-800"
            >
              <div className="flex items-center space-x-2">
                <Skeleton className="size-8" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <p className="text-destructive">Error: {error.message}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No bookmarks found.</p>;
  }

  return (
    <div className="mt-4 grid grid-cols-4 gap-x-6 gap-y-1 font-quicksand">
      <h1 className="text-muted-foreground col-span-full">Websites</h1>
      {data.map((bookmark, index) => (
        <BookmarkCard
          key={index}
          title={bookmark.website.name}
          url={bookmark.website.url}
          image_url={bookmark.website.imageUrl}
        />
      ))}
    </div>
  );
}
