import BackButton from "@/components/back-button";
import ResourceDetailCard from "./resource-detail";
import { Bookmark } from "lucide-react";
import Tag from "@/components/tag";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return (
    <div className="md:w-[80%] sm:w-[90%] w-full mx-auto border border-amber-700">
      {/* header */}
      <div className="min-h-20 flex justify-between border border-amber-700 flex-wrap gap-x-10 gap-y-4">
        <div className="flex space-x-2 items-center border border-amber-700">
          <img
            src="https://www.apple.com/newsroom/images/product/imac-pro/Apple-Shop-with-a-Specialist-hero_big.jpg.slideshow-large_2x.jpg"
            className="md:size-15 size-10 sm:size-12 object-cover rounded-2xl"
          />
          <div>
            <a
              href={""}
              target="_blank"
              className="md:text-xl text-base sm:text-xl font-medium cursor-pointer hover:underline duration-300"
            >
              Color Palet Enginner
            </a>
            <p className="text-xs md:text-sm text-gray-600">Video Editing</p>
          </div>
        </div>

        <button className="cursor-pointer border border-amber-700">
          <Bookmark strokeWidth={0.5} className="size-7" />
        </button>
      </div>

      {/* main */}

      <div className="flex flex-row items-start mt-5 flex-wrap gap-x-5 border border-amber-700">
        <div className="md:basis-[55%] sm:basis-[70%] border border-amber-700">
          <img
            src={
              "https://www.apple.com/newsroom/images/product/imac-pro/Apple-Shop-with-a-Specialist-hero_big.jpg.slideshow-large_2x.jpg"
            }
            className="w-full h-full"
          />
        </div>
        <div className="flex-grow border border-amber-700 flex flex-col md:items-end">
          <p className="md:text-sm text-xs">Category</p>
          <h1 className="md:text-base text-sm font-medium">Video Editing</h1>
          <div className="gap-x-2 gap-y-2 mt-2">
            <Tag tags={["yes", "hello world", "xys"]} />
          </div>
        </div>
      </div>

      {/* description */}
      <div className="text-sm leading-5.5 mt-3 border border-amber-700">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
          esse dolore. Amet corrupti incidunt beatae eligendi velit illum cumque
          neque.
        </p>
      </div>
    </div>
  );
}
