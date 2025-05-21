"use client";

import { usePathname } from "next/navigation";
import Announcement from "./announcement";

export default function AnnouncementWrapper() {
  const pathname = usePathname();

  // Only show on homepage
  if (pathname !== "/") return null;

  return (
    <Announcement message="✨ New Feature Coming Soon: Users will be able to recommend websites! Recommendations will be reviewed by moderators or admins." />
  );
}
