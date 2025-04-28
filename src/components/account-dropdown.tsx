"use client";
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
import {
  ArrowRight,
  Check,
  ChevronDown,
  Monitor,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex hover:underline cursor-pointer focus-within:underline items-center gap-1.5 focus-visible:ring-0 focus:outline-none outline-none text-xs">
          <User size={24} strokeWidth={1.5} />
          <span className="text-base hidden md:inline-flex">
            outils.dev
          </span>
          <ChevronDown
            strokeWidth={1.5}
            className={`h-3 w-3 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-none mt-2 focus-visible:ring-0 focus:outline-none outline-none text-xs">
        <DropdownMenuItem className="py-1 px-2">Resource</DropdownMenuItem>
        <DropdownMenuItem className="py-1 px-2">Library</DropdownMenuItem>
        <DropdownMenuItem className="py-1 px-2">Newsletter</DropdownMenuItem>
        <DropdownMenuItem className="py-1 px-2">My Profile</DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-xs flex items-center gap-2 py-1 px-2">
            <Monitor className="mr-1 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="text-xs flex items-center gap-2 py-1 px-2"
                onClick={() => setTheme("system")}
              >
                <Monitor className="mr-2 size-4" />
                System default
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs flex items-center gap-2 py-1 px-2"
                onClick={() => setTheme("light")}
              >
                <Sun className="mr-2 size-4" />
                Light
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs flex items-center gap-2 py-1 px-2"
                onClick={() => setTheme("dark")}
              >
                <Moon className="mr-2 size-4" />
                Dark
                {theme === "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem className="py-1 px-2 flex items-center gap-2">
          <span>Login</span> <ArrowRight />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
