"use client";

import { useState } from "react";

interface AnnouncementProps {
  message: string;
}

export default function Announcement({ message }: AnnouncementProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative w-full px-4 py-3 border dark:border-zinc-800 shadow-lg flex items-center justify-center">
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => setVisible(false)}
        className="ml-4 dark:text-white cursor-pointer dark:hover:text-gray-200 text-lg font-bold focus:outline-none"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}
