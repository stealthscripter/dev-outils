// app/components/LogoutButton.tsx
"use client";

import { authClient } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onRequest: (ctx) => {
          setLoading(true);
        },
        onResponse: (ctx) => {
          toast.error("Logged out successfully");
          setLoading(false);
        },
      },
    });
  }

  return (
    <button
      onClick={() => {
        queryClient.clear();
        handleLogout();
      }}
      className="px-3 py-2 rounded-sm cursor-pointer font-general font-medium flex gap-x-2 items-center hover:bg-zinc-900"
    >
      <LogOut className="size-4" />
      <span className="text-sm">{loading ? "Logging out..." : "Log out"}</span>
    </button>
  );
}
