import Tag from "@/components/tag";
import ResourceDetailHeader from "./resource-header";

export default function ResourceDetailCard() {
  return (
    <div className="border border-amber-700">
      <ResourceDetailHeader /> 
      <div className="flex flex-row px-4 mt-5 flex-wrap gap-x-5">
        <div className="basis-[55%]">
          <img src={"/"} className="w-full h-full" />
        </div>
        <div className="basis-[35%]">
          <div className="text-end">
            <p className="text-sm">Category</p>
            <h1 className="text-base font-medium">Video Editing</h1>
          </div>

          <div className="gap-x-2 gap-y-2 mt-2 flex justify-end">
            <Tag tags={["yes" , "hello world" , "xys"]} />
          </div>
        </div>
      </div>

      {/* description */}
      <div className="mt-10 text-sm leading-5.5 px-4">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
          esse dolore. Amet corrupti incidunt beatae eligendi velit illum cumque
          neque.
        </p>
      </div>
    </div>
  );
}
