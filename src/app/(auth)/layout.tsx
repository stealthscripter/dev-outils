export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div className="bg-red-300">
        {children}
    </div>
  }