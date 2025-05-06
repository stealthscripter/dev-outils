// app/auth/layout.tsx
import NavBar from "@/components/nav-bar";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh overflow-hidden items-start justify-start flex flex-col relative">
      <NavBar />
      {children}
      <div className="circlePosition w-[420px] h-[400px] bg-[#b891e8] rounded-full absolute z-1 top-11/12 left-16 -translate-x-1/2 -translate-y-1/2 blur-[250px]" />
    </div>
  );
}
