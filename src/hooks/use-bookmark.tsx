"use client"
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/ky-client";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
}

export function useBookmarks() {
  return useQuery<Bookmark[], Error>({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      const data = await apiClient.get("bookmarks").json<Bookmark[]>();
      return data;
    },
  });
}