import ResourceDetailCard from "./resource-detail";

export default async function Page() {
  return (
    <div className="relative w-full mt-40 flex justify-center items-center">
      <ResourceDetailCard />
      <div className="circlePosition w-[320px] h-[400px] bg-[#b891e8] rounded-full absolute -z-1 -top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:blur-[250px] blur-[180px]" />
    </div>
  );
}
