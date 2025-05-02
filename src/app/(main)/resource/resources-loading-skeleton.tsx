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
    <div className="animate-pulse space-y-3 bg-card px-4 py-2">
      {/* upper one */}
      <div className="mb-3 flex items-center justify-end">
        <Skeleton className="h-4 w-24 rounded" />
      </div>
      {/* details */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>
      {/* tags */}
      <div className="mt-2">
        <Skeleton className="h-4 w-20 rounded" />
      </div>
    </div>
  );
}
