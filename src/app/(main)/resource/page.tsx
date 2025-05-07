import { Suspense } from "react";
import ResourceItem from "../../../components/resource-item";
import ResourceSidebar from "../../../components/resource-sidebar";
import { InitalResourceLoadingSkeleton } from "../../../components/resources-loading-skeleton";

export default function Page() {
  return (
    <div className="relative">
      {/* Header Section */}
      <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:mt-5 min-h-64 items-center px-5 md:px-0">
        <div className="md:col-span-2 col-span-full flex flex-col justify-center md:px-24 space-y-4">
          <p className="font-quicksand uppercase text-sm tracking-widest text-muted-foreground">
            Welcome To
          </p>
          <h1 className="text-4xl md:text-5xl">
            Developers <br /> Toolbox
          </h1>
          <p className="font-quicksand leading-6 text-muted-foreground">
            The Ultimate List of 3rd-Party Tools to Instantly Improve Your
            Developer Workflow
          </p>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="w-full md:mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-start md:min-h-screen md:px-0 px-5">
        {/* Sidebar */}
        <div className="md:col-span-1 col-span-full flex md:justify-center">
          <div className="sticky top-0 pt-4">
            <Suspense fallback="Loading filters...">
              <ResourceSidebar />
            </Suspense>
          </div>
        </div>

        {/* Scrollable list */}
        <div className="md:col-span-3 col-span-full md:max-h-screen overflow-y-auto md:p-4">
          <Suspense fallback={<InitalResourceLoadingSkeleton />}>
            <ResourceItem />
          </Suspense>
        </div>
      </div>

      {/* Decorative Background Circles */}
      <div className="circlePosition w-[420px] h-[300px] bg-[#b891e8] rounded-full absolute -z-1 -top-24 left-0 -translate-x-1/2 -translate-y-1/2 dark:blur-[250px] blur-[180px]" />
      <div className="circlePosition w-[420px] h-[300px] bg-[#b891e8] rounded-full absolute -z-1 -bottom-24 right-0 -translate-x-1/2 -translate-y-1/2 dark:blur-[250px] blur-[180px]" />
    </div>
  );
}
