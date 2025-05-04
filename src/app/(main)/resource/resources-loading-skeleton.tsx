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
    <div className="animate-pulse p-4 rounded-sm font-quicksand border border-zinc-800 space-y-3">
      {/* Upper section */}
      <div className="mb-3 flex justify-between items-center">
        <div className="size-10 rounded bg-zinc-800" />
        <div className="h-4 w-6 rounded bg-zinc-800" />
      </div>

      {/* Website details */}
      <div className="space-y-2">
        <div className="h-4 w-36 rounded bg-zinc-800" />
        <div className="h-4 w-52 rounded bg-zinc-800" />
      </div>

      {/* Tags */}
      <div className="mt-2 flex gap-2">
        <div className="h-4 w-16 rounded bg-zinc-800" />
        <div className="h-4 w-12 rounded bg-zinc-800" />
      </div>
    </div>
  );
}
