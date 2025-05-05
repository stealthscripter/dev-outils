import { redirect } from "next/navigation";
import { AccountBookmark } from "./account-bookmark";
import AccountNavBar from "./account-navbar";
import LogoutButton from "./logout-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// src/app/account/page.tsx
export default async function Page({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const { tab = "bookmarks" } = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  return (
    <>
      {/* Header and logout button */}
      <div className="w-full border px-72 flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <div>
            <h1 className="text-3xl font-semibold">{session.user.name}</h1>
            <p className="text-base text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <div className="w-full border px-72 mt-8">
        <AccountNavBar />
        {tab === "bookmarks" ? (
          <AccountBookmark userId={session.user.id} key={tab} />
        ) : null}

        {tab === "saved" ? (
          <div className="mt-4 text-center font-quicksand">
            <h1 className="text-muted-foreground">
              A saved website feature will be introduced soon
            </h1>
          </div>
        ) : null}
      </div>
    </>
  );
}
