// app/api/website/route.ts
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { websiteDataInclude, WebsiteData, websitePage } from "@/lib/types";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const cursor = searchParams.get("cursor") || undefined;
    const categorySlug = searchParams.get("category") || "all";
    const pageSize = 10;

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    let categoryId: string | null = null;

    if (categorySlug !== "all") {
      const category = await prisma.category.findUnique({
        where: { slug: categorySlug, },
      });
      if (category) categoryId = category.id;
    }

    const websites = await prisma.website.findMany({
      include: websiteDataInclude,
      where: categoryId ? { categoryId } : {},
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    // Fetch bookmarks for current user if logged in
    let bookmarkedWebsiteIds: string[] = [];
    if (session?.user) {
      const bookmarks = await prisma.bookmark.findMany({
        where: { userId: session.user.id },
        select: { websiteId: true },
      });
      bookmarkedWebsiteIds = bookmarks.map((b) => b.websiteId);
    }

    // Add isBookmarked flag to each website
    const websitesWithBookmarkStatus: WebsiteData[] = websites.map((website) => ({
      ...website,
      isBookmarked: bookmarkedWebsiteIds.includes(website.id),
    }));

    const nextCursor = websites.length > pageSize ? String(websites[pageSize].id) : null;
    const data: websitePage = {
      websites: websitesWithBookmarkStatus.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}