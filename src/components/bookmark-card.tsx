import { Link2 } from "lucide-react";

interface bookmarkCardProps {
    title: string,
    url: string,
    image_url?: string | null
}

export default function BookmarkCard({title , url , image_url} : bookmarkCardProps) {
  return (
    <div className="mt-2 flex justify-between dark:border border-zinc-800 items-start p-3 font-quicksand">
      <div className="flex items-center space-x-2">
        <div className="size-8 bg-gray-600"></div>
        <div className="">
          <h1 className="hover:underline duration-200 cursor-pointer">{title}</h1>
          <p className="text-sm text-muted-foreground">{url}</p>
        </div>
      </div>
    </div>
  );
}
