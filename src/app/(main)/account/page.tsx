import { User } from "lucide-react";
import AccountNavBar from "./account-navbar";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "./logout-button";
import { redirect } from "next/navigation";
import BookmarkCard from "@/components/bookmark-card";
import { AccountBookmark } from "./account-bookmark";

export default async function Page({
  params, // route parameters (unused here)
  searchParams, // query parameters
}: {
  params: { tab?: string };
  searchParams: { tab?: string };
}) {
  const { tab } = (await searchParams) || "bookmarks"; // Use fallback value
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <div className="w-full border border-spans font-general px-72 flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <div>
            <h1 className="text-3xl font-semibold">{session?.user.name}</h1>
            <p className="text-base text-muted-foreground">{session?.user.email}</p>
          </div>
        </div>
        {/* logout */}
        <LogoutButton />
      </div>

      <div className="w-full border border-spans px-72 mt-8">
        <AccountNavBar />
        {tab === "bookmarks" ? <AccountBookmark /> : null}

        {tab === "saved" ? (
          <div className="mt-4 text-center font-quicksand">
            <h1 className="text-muted-foreground">
              a saved website feature will be introduced soon
            </h1>
          </div>
        ) : null}
      </div>
    </>
  );
}
