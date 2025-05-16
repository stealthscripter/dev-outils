import { prisma } from "@/lib/prisma";
import { DataTable } from "./resource-table";

export default async function Page() {
  let websites: any = [];

  try {
    websites = await prisma.website.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            bookmarks: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch websites:", error);
    // websites remains as an empty array
  }

  return (
    <div>
      <DataTable data={websites} />
    </div>
  );
}
