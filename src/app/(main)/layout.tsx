import NavBar from "@/components/nav-bar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen border border-amber-800 items-start justify-start flex flex-col mx-auto max-w-7xl p-5">
      {/* <NavBar /> */}
      {children}
    </div>
  );
}
