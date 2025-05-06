import ResourceItem from "./resource-item";
import ResourceSidebar from "./resource-sidebar";

export default function Page() {
  return (
    <div className="relative">

      <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:mt-5 min-h-64 items-center">
        {/* textdiv */}
        <div className="md:col-span-2 col-span-full flex flex-col justify-cente md:px-24 space-y-4">
          <p className="font-quicksand uppercase text-sm tracking-widest text-muted-foreground">
            Welcome To
          </p>
          <h1 className="text-5xl">Developers Toolbox</h1>
          <p className="font-quicksand leading-6 text-muted-foreground">
            The Ultimate List of 3rd-Party Tools to Instantly Improve Your
            Developer Workflow
          </p>
        </div>
      </div>

      <div className="w-full md:mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-start md:min-h-screen">
        {/* Sidebar */}
        <div className="md:col-span-1 col-span-full flex md:justify-center">
          <div className="sticky top-0 pt-4">
            <ResourceSidebar />
          </div>
        </div>

        {/* Scrollable list */}
        <div className="md:col-span-3 col-span-full md:max-h-screen overflow-y-auto md:p-4">
          <ResourceItem />
        </div>
      </div>

      <div className="circlePosition w-[420px] h-[300px] bg-[#b891e8] rounded-full absolute -z-1 -top-24 left-0 -translate-x-1/2 -translate-y-1/2 dark:blur-[250px] blur-[180px]" />
      <div className="circlePosition w-[420px] h-[300px] bg-[#b891e8] rounded-full absolute -z-1 -bottom-24 right-0 -translate-x-1/2 -translate-y-1/2 dark:blur-[250px] blur-[180px]" />
    </div>
  );
}
