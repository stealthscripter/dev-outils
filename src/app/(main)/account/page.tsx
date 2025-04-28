import { User } from "lucide-react";
import AccountNavBar from "./account-navbar";
import { prisma } from "@/lib/prisma";

export default async function Page() {
 
  return (
    <>
      <div className="border border-amber-700 w-full flex items-start justify-between flex-wrap gap-y-4 md:w-[80%] sm:w-[90%] mx-auto">
        <div className="flex items-center gap-x-3">
          <div className="border p-2 rounded-full">
            <User strokeWidth={0.5} size={40} />
          </div>
          <div>
            <h1 className="text-lg">test</h1>
            <p className="text-sm text-gray-500">test@gmail.com</p>
          </div>
        </div>

        {/* logout */}
        <button className="border border-amber-500 px-2 py-1 text-red-700 cursor-pointer">
          Logout
        </button>
      </div>

      <AccountNavBar className="w-full" />
    </>
  );
}
