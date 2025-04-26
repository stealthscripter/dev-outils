import Tag from "@/components/tag";
import { Bookmark } from "lucide-react";
const resources = [
  {
    name: "website-01",
    description:
      "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod",
    tag: ["tag-1", "tag-4"],
  },
  {
    name: "website-02",
    description:
      "tempor incididunt ut labore et dolore magna aliqua quis nostrud exercitation",
    tag: ["tag-2", "tag-3", "tag-5"],
  },
  {
    name: "website-03",
    description:
      "ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute",
    tag: ["tag-1", "tag-3"],
  },
  {
    name: "website-04",
    description:
      "irure dolor in reprehenderit in voluptate velit esse cillum dolore eu",
    tag: ["tag-4", "tag-6"],
  },
  {
    name: "website-05",
    description:
      "fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa",
    tag: ["tag-2", "tag-5", "tag-6"],
  },
  {
    name: "website-06",
    description:
      "officia deserunt mollit anim id est laborum lorem ipsum dolor sit",
    tag: ["tag-1", "tag-4", "tag-6"],
  },
  {
    name: "website-07",
    description:
      "amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore",
    tag: ["tag-3", "tag-5"],
  },
  {
    name: "website-08",
    description:
      "duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore",
    tag: ["tag-1", "tag-2"],
  },
  {
    name: "website-09",
    description:
      "eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt",
    tag: ["tag-3", "tag-4"],
  },
  {
    name: "website-10",
    description:
      "culpa officia deserunt mollit anim id est laborum lorem ipsum dolor",
    tag: ["tag-5", "tag-6"],
  },
  {
    name: "website-11",
    description:
      "sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut",
    tag: ["tag-1", "tag-3"],
  },
  {
    name: "website-12",
    description:
      "labore et dolore magna aliqua quis nostrud exercitation ullamco laboris nisi",
    tag: ["tag-2", "tag-4"],
  },
  {
    name: "website-13",
    description: "ut aliquip ex ea commodo consequat duis aute irure dolor in",
    tag: ["tag-1", "tag-5"],
  },
  {
    name: "website-14",
    description:
      "reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur",
    tag: ["tag-3", "tag-6"],
  },
  {
    name: "website-15",
    description:
      "sint occaecat cupidatat non proident sunt culpa officia deserunt mollit anim",
    tag: ["tag-2", "tag-4"],
  },
  {
    name: "website-16",
    description:
      "id est laborum lorem ipsum dolor sit amet consectetur adipiscing elit",
    tag: ["tag-1", "tag-6"],
  },
  {
    name: "website-17",
    description:
      "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis",
    tag: ["tag-3", "tag-5"],
  },
  {
    name: "website-18",
    description:
      "nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    tag: ["tag-2", "tag-4"],
  },
  {
    name: "website-19",
    description:
      "duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore",
    tag: ["tag-1", "tag-3"],
  },
  {
    name: "website-20",
    description:
      "eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt",
    tag: ["tag-5", "tag-6"],
  },
];

export default function ResourceList() {
  return (
    <>
      <div className="border border-amber-700 col-span-3  grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-x-7 bg-yellow-50 gap-y-6 md:gap-y-5">
        {resources.map((resource) => (
          <div
            className="border border-amber-700 px-2 py-1 bg-yellow-200"
            key={resource.name}
          >
            {/* upper one */}
            <div className="border border-amber-700 mb-3 flex items-center justify-end">
              <button className="cursor-pointer">
                <Bookmark strokeWidth={0.5} startOffset={0} size={24} />
              </button>
            </div>
            {/* details */}
            <div className="border border-amber-700">
              <h1 className="text-lg font-medium hover:underline w-fit cursor-pointer">
                {resource.name}
              </h1>
              <p className="text-zinc-500 text-sm leading-5 my-1">
                {resource.description}
              </p>
            </div>

            {/* tags */}
            <div className="border border-amber-600 mt-2">
              <Tag tags={resource.tag ?? []} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
