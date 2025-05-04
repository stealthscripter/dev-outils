"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const tabs = [
  { title: "bookmarks", slug: "bookmarks" },
  { title: "saved websites", slug: "saved" },
];

interface AccountNavBarProps {
    className?: string 
}
export default function AccountNavBar({className}: AccountNavBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "bookmarks";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <nav className={`border border-spans w-full font-general mx-auto ${className}`}>
      <ul className="flex space-x-7 cursor-pointer flex-wrap">
        {tabs.map((item) => (
          <li
            key={item.slug}
            className={`relative px-1 py-2 cursor-pointer transition-all duration-300 ${
              activeTab === item.slug
                ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-spans"
                : "text-muted-foreground"
            }`}
            onClick={() => handleFilter(item.slug)}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </nav>
  );
}
