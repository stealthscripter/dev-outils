"use client"
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="inline-flex items-center hover:underline cursor-pointer">
      <ChevronLeft /><span className="text-sm">back</span>
    </button>
  );
}
