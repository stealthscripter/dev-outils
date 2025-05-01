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

function ResourceLoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-3 border border-amber-700 px-2 py-1 bg-yellow-200">
      {/* upper one */}
      <div className="border border-amber-700 mb-3 flex items-center justify-end">
        <Skeleton className="h-4 w-24 rounded" />
      </div>
      {/* details */}
      <div className="border border-amber-700 space-y-1">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-4 w-20 rounded" />
      </div>
      {/* tags */}
      <div className="border border-amber-600 mt-2">
        <Skeleton className="h-4 w-20 rounded" />
      </div>
    </div>
  );
}
