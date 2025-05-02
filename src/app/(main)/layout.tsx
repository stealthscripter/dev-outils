import NavBar from "@/components/nav-bar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen items-start justify-start flex flex-col mx-auto">
      <NavBar />
      {children}
    </div>
  );
}
