import { User } from "lucide-react";
import AccountNavBar from "./account-navbar";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./logout-button";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session?.user) {
    redirect("/login");
  }
  return (
    <>
      <div className="border border-amber-700 w-full flex items-start justify-between flex-wrap gap-y-4 md:w-[80%] sm:w-[90%] mx-auto">
        <div className="flex items-center gap-x-3">
          <div className="border p-2 rounded-full">
            <User strokeWidth={0.5} size={40} />
          </div>
          <div>
            <h1 className="text-lg">{session?.user.name}</h1>
            <p className="text-sm text-gray-500">{session?.user.email}</p>
          </div>
        </div>

        {/* logout */}
        <LogoutButton />
      </div>

      <AccountNavBar className="w-full" />
    </>
  );
}
