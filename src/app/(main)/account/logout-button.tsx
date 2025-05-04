// app/components/LogoutButton.tsx
"use client";

import { authClient } from "@/lib/auth-client";
import { useQueryClient } from "@tanstack/react-query";
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
      className="border border-spans px-3 py-1 cursor-pointer font-general font-medium"
    >
      {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
