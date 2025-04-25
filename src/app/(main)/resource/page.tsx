import ResourceList from "./resource-list";
import ResourceSidebar from "./resource-sidebar";

export default async function Page() {
  return (
    <>
      {/* section 1 */}
      <div className="border border-amber-900 w-full">
        <div className="text-center">
          <h1 className="md:text-5xl sm:text-4xl text-3xl font-medium">
            Resource Hub
          </h1>
          <h4 className="md:my-4 my-2 font-light">
            Ideas, templates, and tools for businesses that are going places
          </h4>
          <button className="border border-amber-700 w-fit mx-auto px-3 py-1.5">
            Discover Resource
          </button>
        </div>
      </div>

      {/* section 2 */}

      <div className="mt-10 border border-amber-800 w-full">
        <div className="text-center">
          <h2 className="md:text-3xl text-2xl  font-normal ">
            explore all our resources
          </h2>
          <p className="font-light mt-1 text-sm md:text-base">
            Discover a curated collection of tools, guides, and courses to
            elevate your skills and productivity.
          </p>
        </div>
      </div>

      <div className="w-full border border-amber-700 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:mt-5 min-h-screen">
        {/* Sidebar */}
        <div className="md:col-span-1 col-span-full border border-amber-700">
          <div className="sticky top-0 p-4">
            <ResourceSidebar />
          </div>
        </div>

        {/* Scrollable list */}
        <div className="md:col-span-3 col-span-full max-h-screen overflow-y-auto p-4">
          <ResourceList />
        </div>
      </div>
    </>
  );
}
