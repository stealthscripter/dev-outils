import { Bookmark } from "lucide-react";

export default function ResourceDetailHeader() {
  return (
    <div className="h-20 flex justify-between px-4 py-2 border border-amber-700 mb-5">
      <div className="flex space-x-2 items-center">
        <img src="sjs" className="size-15 object-cover rounded-2xl" />
        <div>
          <a
            href={""}
            target="_blank"
            className="text-2xl font-medium cursor-pointer hover:underline duration-300"
          >
            Color Palet Enginner
          </a>
          <p className="text-sm ms-1 text-gray-600">Video Editing</p>
        </div>
      </div>
      <div className="flex flex-col justify-between items-center">
        <button className="cursor-pointer">
          <Bookmark strokeWidth={0.5} />
        </button>
      </div>
    </div>
  );
}
