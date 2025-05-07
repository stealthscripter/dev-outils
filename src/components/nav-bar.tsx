"use client";
import { useTheme } from "next-themes";
import { useState } from "react";
import AccountDropdown from "./account-dropdown";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-14 w-full">
      {/* announcment */}
      <div className="md:flex justify-end flex md:px-10 py-8 px-5">
        <AccountDropdown />
      </div>
    </div>
  );
}
