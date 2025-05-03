import ResourceItem from "./resource-item";
import ResourceSidebar from "./resource-sidebar";

export default function Page() {
  return (
    <>
      {/* section 1 */}

      {/* section 2 */}

      <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:mt-5 border border-spans min-h-64 items-center">
        {/* textdiv */}
        <div className="md:col-span-2 col-span-full flex flex-col justify-cente px-24 space-y-4">
          <p className="font-quicksand uppercase text-sm tracking-widest text-muted-foreground">Welcome To</p>
          <h1 className="text-5xl">Membership Toolbox</h1>
          <p className="font-quicksand leading-6 text-muted-foreground">
            The Ultimate List of 3rd Party Tools to Help You Launch and Grow a
            Membership Business.
          </p>
        </div>
      </div>

      <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:mt-5 min-h-screen items-start border border-spans">
        {/* Sidebar */}
        <div className="md:col-span-1 col-span-full border border-spans flex justify-center">
          <div className="sticky top-0 p-4">
            <ResourceSidebar />
          </div>
        </div>

        {/* Scrollable list */}
        <div className="md:col-span-3 col-span-full max-h-screen overflow-y-auto p-4">
          <ResourceItem />
        </div>
      </div>
    </>
  );
}
