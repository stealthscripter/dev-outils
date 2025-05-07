import ResourceDetailCard from "../../../../components/resource-detail";

export default async function Page() {
  return (
    <div className="relative w-full md:mt-40 mt-32 flex justify-center items-center px-5 md:px-0">
      <ResourceDetailCard />
      <div className="circlePosition w-[320px] h-[400px] bg-[#b891e8] rounded-full absolute -z-1 -top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:blur-[250px] blur-[180px]" />
    </div>
  );
}
