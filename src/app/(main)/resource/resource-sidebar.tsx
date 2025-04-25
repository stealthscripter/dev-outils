"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  { title: "All", slug: "all" },
  { title: "Font & Typography", slug: "font-typography" },
  { title: "Color Palettes", slug: "color-palettes" },
  { title: "Stock & Image", slug: "stock-and-image" },
  { title: "Icon Tools", slug: "icon-tools" },
  { title: "Design Inspiration", slug: "design-inspiration" },
];

interface ResourceNavigationProps {
  className?: string;
}

export default function ResourceSidebar({
  className,
}: ResourceNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <aside className={className}>
        <div className="border border-amber-700 ">
          <ul className="text-sm flex md:flex-col bg-yellow-50 flex-wrap mb-4 gap-x-4 md:gap-x-0 md:gap-y-2 gap-y-4 md:border-l-2 border-amber-700 md:px-5">
            {categories.map((item) => (
              <li
                key={item.slug}
                className={`relative px-1 py-2 cursor-pointer transition-all duration-300 border border-amber-700 md:border-0 ${
                  activeCategory === item.slug
                    ? "md:ms-4 md:before:absolute md:before:-left-3 md:before:top-1/2 md:before:-translate-y-1/2 md:before:w-1.5 md:before:h-1.5 md:before:bg-amber-500 md:before:rounded-full bg-amber-700 text-white md:bg-transparent md:text-foreground"
                    : ""
                }`}
                onClick={() => handleFilter(item.slug)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
