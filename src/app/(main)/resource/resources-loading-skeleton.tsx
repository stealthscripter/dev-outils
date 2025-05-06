import { Skeleton } from "@/components/ui/skeleton";

export default function ResourcesLoadingSkeleton() {
  return (
    <>
      <ResourceLoadingSkeleton />
      <ResourceLoadingSkeleton />
      <ResourceLoadingSkeleton />
    </>
  );
}

export function InitalResourceLoadingSkeleton() {
  return (
    <div className="col-span-3 items-center grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-x-7 gap-y-6 md:gap-y-5">
      <ResourceLoadingSkeleton />
      <ResourceLoadingSkeleton />
      <ResourceLoadingSkeleton />
    </div>
  );
}

function ResourceLoadingSkeleton() {
  return (
    <div className="animate-pulse p-4 rounded-sm font-quicksand border dark:border-zinc-800 border-zinc-200 space-y-3">
      {/* Upper section */}
      <div className="mb-3 flex justify-between items-center">
        <Skeleton className="size-10 rounded" />
        <Skeleton className="h-4 w-6 rounded" />
      </div>

      {/* Website details */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-36 rounded" />
        <Skeleton className="h-4 w-52 rounded" />
      </div>

      {/* Tags */}
      <div className="mt-2 flex gap-2">
        <Skeleton className="h-4 w-16 rounded" />
        <Skeleton className="h-4 w-12 rounded" />
      </div>
    </div>
  );
}
