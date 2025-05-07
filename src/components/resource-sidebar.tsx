"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  { title: "All", slug: "all" },
  { title: "Font & Typography", slug: "font-typography" },
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
    <div className="relative">
      <aside className="">
        <div className="font-quicksand">
          <p className="mb-5 md:ms-2 text-sm uppercase tracking-widest text-muted-foreground">
            categories
          </p>
          <ul className="text-sm flex md:flex-col flex-wrap mb-4 gap-x-4 md:gap-x-0 md:gap-y-2 gap-y-4 md:border-l-1 dark:border-zinc-700 border-zinc-200 md:px-5">
            {categories.map((item) => (
              <li
                key={item.slug}
                className={`relative md:px-1 py-2 cursor-pointer transition-all duration-300 md:border-0 ${
                  activeCategory === item.slug
                    ? "md:ms-4 md:before:absolute md:before:-left-3 md:before:top-1/2 md:before:-translate-y-1/2 md:before:w-2 md:before:h-2 md:before:bg-spans md:before:rounded-full bg- text-white md:bg-transparent md:text-foreground bg-spans px-2 md:px-0"
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
    </div>
  );
}
