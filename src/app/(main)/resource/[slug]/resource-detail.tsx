"use client";

import { useQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
interface Website {
  id: string;
  name: string;
  slug: string;
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

export default function ResourceDetailCard() {
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading, isError, error } = useQuery<Website>({
    queryKey: ["website-detail", slug],
    queryFn: () => kyInstance.get(`/api/website/${slug}`).json(),
  });

  if (isLoading) {
    return (
      <div className="animate-pulse md:p-20 w-full md:flex gap-x-4 items-center">
        <Skeleton className="relative md:w-3xl h-96 rounded-md hidden md:flex" />

        <div className="flex-1 flex flex-col space-y-4">
          <Skeleton className="h-10 w-1/2 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />

          <div className="my-5 flex space-x-5">
            <Skeleton className="py-3 px-6 rounded-md w-32" />
          </div>
        </div>
      </div>
    );
  }
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>No website found.</p>;

  return (
    <div className="flex flex-col space-y-3">
      <h1 className="text-4xl uppercase font-general font-semibold">
        {data.name}
      </h1>
      <p className="font-quicksand text-muted-foreground">{data.description}</p>
      <p className="font-quicksand text-end text-muted-foreground">
        # {data.category.name}
      </p>

      <div className="my-5 flex space-x-5 font-quicksand">
        <button className="py-2 px-3 rounded-sm cursor-pointer text-white dark:text-black  border border-spans bg-spans font-semibold hover:opacity-80 duration-200">
          Visit Website
        </button>
      </div>
    </div>
  );
}
