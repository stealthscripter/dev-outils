import { redirect } from "next/navigation";
import { AccountBookmark } from "./account-bookmark";
import AccountNavBar from "./account-navbar";
import LogoutButton from "./logout-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AccountTabs } from "./account-tabs";
export const metadata = {
  title: "Account",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab = "bookmarks" } = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/login");

  return (
    <div className="w-full relative">
      {/* Header and logout button */}
      <div className="w-full md:px-72 flex flex-wrap mt-5 md:mt-0 justify-between items-center px-5">
        <div className="flex items-center gap-x-3">
          <div>
            <h1 className="md:text-3xl text-xl font-semibold">
              {session.user.name}
            </h1>
            <p className="md:text-base text-sm text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <div className="w-full md:px-72 mt-8 px-5">
        <AccountTabs userId={session.user.id} />
      </div>

      <div className="circlePosition w-[420px] h-[300px] bg-[#b891e8] rounded-full absolute -z-1 -top-24 left-0 -translate-x-1/2 -translate-y-1/2 dark:blur-[250px] blur-[180px]" />
      {/* <div className="circlePosition w-[420px] h-[300px] bg-[#b891e8] rounded-full absolute -z-1 -bottom-24 right-0 -translate-x-1/2 -translate-y-1/2 dark:blur-[70px] blur-[100px]" /> */}
    </div>
  );
}
