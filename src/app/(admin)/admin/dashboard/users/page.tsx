import { prisma } from "@/lib/prisma";
import { DataTable } from "./users-table";

export default async function Page() {
  const users = await prisma.user.findMany({
    include: {
      sessions: {
        select: {
          id: true,
          token: true,
          ipAddress: true,
          expiresAt: true,
          createdAt: true,
          updatedAt: true,
          userAgent: true,
          userId: true,
        },
      },
    },
  });
  return <div>
    <DataTable data={users} />
  </div>;
}
