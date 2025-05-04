import BackButton from "@/components/back-button";
import ResourceDetailCard from "./resource-detail";
import { ArrowRight, Bookmark } from "lucide-react";
import Tag from "@/components/tag";
import Image from "next/image";
import ionicon from "@/../public/ionicons_large.png";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return (
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
          ionicons
        </h1>
        <p className="font-quicksand text-muted-foreground">
          A beautiful and round icon set, very easy to use, and 100% free even
          for commercial usage.
        </p>

        <div className="my-5 flex space-x-5 font-quicksand">
          <button className="py-3 px-2 cursor-pointer  border border-spans bg-spans font-semibold">
            Visit Website
          </button>
        </div>
      </div>
    </div>
  );
}
