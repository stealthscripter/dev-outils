import { prisma } from "@/lib/prisma";
import { DataTable } from "./category-table";

export default async function Page() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          websites: true,
        },
      },
    },
  });
  return (
    <div>
        <DataTable data={categories} />
    </div>
  );
}
