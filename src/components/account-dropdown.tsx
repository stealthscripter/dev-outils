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
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Home,
  Monitor,
  Moon,
  Scroll,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const { data: session } = authClient.useSession();

  let displayTheme =
    theme === "system" ? "system" : theme === "dark" ? "dark" : "light";

  // Determine which icon to show
  let IconComponent = Sun; // Default

  if (theme === "system") {
    IconComponent = resolvedTheme === "dark" ? Moon : Sun;
  } else {
    IconComponent = theme === "dark" ? Moon : Sun;
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex hover:underline font-quicksand cursor-pointer focus-within:underline items-center gap-1.5 focus-visible:ring-0 focus:outline-none outline-none text-xs">
          <User size={24} strokeWidth={1.5} />
          <span className="text-base hidden md:inline-flex lowercase">
            {session?.user.name || "outils.dev"}
          </span>
          <ChevronDown
            strokeWidth={1.5}
            className={`h-3 w-3 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-none font-quicksand mt-2 focus-visible:ring-0 focus:outline-none outline-none text-xs border-none capitalize space-y-1">
        <DropdownMenuItem className="py-1 px-2" asChild>
          <Link href={"/"} className="flex">
            <Home />
            <span>home</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-1 px-2" asChild>
          <Link href={"/resource"} className="flex">
            <Scroll />
            <span>resource</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-1 px-2" asChild>
          <Link href={"/account"} className="flex">
            <Settings />
            <span>account</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm flex items-center gap-2 py-1 px-2">
            <IconComponent className="mr-1 size-4" />
            {displayTheme}
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="border-none dark:bg-zinc-900 font-quicksand">
              <DropdownMenuItem
                className="text-xs flex items-center gap-2 py-1 px-2"
                onClick={() => setTheme("system")}
              >
                <Monitor className="mr-2 size-4" />
                System
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
