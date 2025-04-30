// app/components/LogoutButton.tsx
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onRequest: (ctx) => {
          toast.loading("Logging out...");
          setLoading(true)
        },
        onResponse: (ctx) => {
          toast.error("Logged out successfully");
          setLoading(false)
        },
      },
    });
  }

  return (
    <button
      onClick={() => handleLogout()}
      className="border border-amber-500 px-2 py-1 text-red-700 cursor-pointer"
    >
        {loading ? "Logging out..." : "Log out"}
    </button>
  );
}
