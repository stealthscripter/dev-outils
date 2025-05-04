"use client";

import { useQuery } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";
import { useParams } from "next/navigation";
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
      <div className="animate-pulse p-20 w-full flex gap-x-4 items-center">
        <div className="relative w-3xl h-96 bg-muted rounded-md" />

        <div className="flex-1 flex flex-col space-y-4">
          <div className="h-10 w-1/2 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-3/4 bg-muted rounded" />

          <div className="my-5 flex space-x-5">
            <div className="py-3 px-6 bg-muted rounded-md w-32" />
          </div>
        </div>
      </div>
    );
  }
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return <p>No website found.</p>;

  return (
    <>
      <div className="border border-spans p-20 w-full flex gap-x-4 items-center">
        <div className="relative w-3xl h-96 border border-spans">
          {/* <Image
          src={ionicon}
          alt="Icon"
          fill
          className="object-cover dark:invert" // this fixes distortion
          /> */}
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          <h1 className="text-4xl uppercase font-general font-semibold">
            {data.name}
          </h1>
          <p className="font-quicksand text-muted-foreground">
            {data.description}
          </p>

          <div className="my-5 flex space-x-5 font-quicksand">
            <button className="py-3 px-2 cursor-pointer  border border-spans bg-spans font-semibold">
              Visit Website
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
