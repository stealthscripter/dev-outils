import { Link2 } from "lucide-react";
import Image from "next/image";

interface bookmarkCardProps {
  title: string;
  url: string;
  image_url?: string | null;
  iconUrl?: string | null;
}

export default function BookmarkCard({
  title,
  url,
  image_url,
  iconUrl
}: bookmarkCardProps) {
  return (
    <div className="mt-2 flex justify-between dark:border border-zinc-800 items-start p-3 font-quicksand">
      <div className="flex items-center space-x-2 overflow-hidden">
        <div className="size-8 relative">
          <Image
            src={iconUrl || ""}
            alt="Ionicons Logo"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col min-w-0">
          {" "}
          {/* 🔥 Prevent overflow */}
          <h1 className="hover:underline duration-200 cursor-pointer truncate max-w-xs">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground truncate max-w-xs hover:underline cursor-pointer">
            {url}
          </p>{" "}
          {/* 🔥 Truncate long URLs */}
        </div>
      </div>
    </div>
  );
}
