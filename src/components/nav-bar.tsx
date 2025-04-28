"use client";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Monitor,
  Moon,
  Sun,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useTheme } from "next-themes";
import AccountNavBar from "@/app/(main)/account/account-navbar";
import AccountDropdown from "./account-dropdown";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="border border-amber-700 min-h-14 w-full p-5">
      
      {/* announcment */}
      <div className="border border-amber-700 flex justify-end">
        <AccountDropdown />
      </div>

      <div className="border border-amber-700">
          
      </div>

    </div>
  );
}
