"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import AccountDropdown from "./account-dropdown";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-14 w-full">
      {/* announcment */}
      <div className="md:flex justify-end flex md:p-5">
        <AccountDropdown />
      </div>
{/* 
      <div className="md:flex items-center justify-between border border-amber-700 p-4">
        <div className="items-center flex ">
          <img
            src="/path-to-your-logo.png"
            alt="Logo"
            className="h-8 w-auto mr-4"
          />
        </div>

        
        <div className="md:flex sm:flex space-x-4 md:text-lg hidden">
          <Link href={"/"} className="no-underline text-black hover:text-black">
            /home
          </Link>
          <Link
            href={"/resource"}
            className="no-underline text-black hover:text-black"
          >
            /resources
          </Link>
          <Link
            href={"/community"}
            className="no-underline text-black hover:text-black"
          >
            /community
          </Link>
          <Link
            href={"/support"}
            className="no-underline text-black hover:text-black"
          >
            /support
          </Link>
        </div>
      </div> */}
    </div>
  );
}
