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
import { Check, ChevronDown, Monitor, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 focus-visible:ring-0 focus:outline-none outline-none">
          <User size={20} strokeWidth={1.5} />
          <span className="text-sm underline">outils.dev</span>
          <ChevronDown
            strokeWidth={1.5}
            className={`h-4 w-4 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-none mt-2 focus-visible:ring-0 focus:outline-none outline-none">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-xs">
            <Monitor className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="text-xs"
                onClick={() => setTheme("system")}
              >
                <Monitor className="mr-2 size-4" />
                System default
                {theme === "system" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs"
                onClick={() => setTheme("light")}
              >
                <Sun className="mr-2 size-4" />
                Light
                {theme === "light" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xs"
                onClick={() => setTheme("dark")}
              >
                <Moon className="mr-2 size-4" />
                Dark
                {theme === "dark" && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
