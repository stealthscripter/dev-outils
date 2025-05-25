  // app/api/website/route.ts
  import { auth } from "@/lib/auth";
  import { prisma } from "@/lib/prisma";
  import { websiteDataInclude, WebsiteData, websitePage } from "@/lib/types";
  import { headers } from "next/headers";
  import { NextRequest } from "next/server";
  import { put } from "@vercel/blob";

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


  /// Admin Post

  export async function POST(req: NextRequest) {
      const formData = await req.formData();

      const name = formData.get("name") as string;
      const url = formData.get("url") as string;
      const description = formData.get("description") as string;
      const categoryId = formData.get("categoryId") as string;
      // Optional slug if passed from client
      const slug = (formData.get("slug") as string) || generateSlug(name);

      const icon = formData.get("icon") as File | null;

      let iconUrl = null;

      if (icon && icon.size > 0) {
          // Upload to Vercel Blob
          const buffer = Buffer.from(await icon.arrayBuffer());

          const blob = await put(`icons/${slug}-${icon.name}`, buffer, {
              contentType: icon.type,
              access: "public",
          });

          iconUrl = blob.url; // Get public URL of uploaded file
      }

      try {
          const website = await prisma.website.create({
              data: {
                  name,
                  url,
                  description,
                  slug,
                  categoryId,
                  iconUrl,
              },
          });


          return Response.json(website);
      } catch (error: any) {
          console.error(error);
          return Response.json({ message: "Failed to create website" }, { status: 500 });
      }
  }

  // Utility function to generate slug
  function generateSlug(text: string): string {
      return text
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
          .substring(0, 50);
  }




  export async function PUT(req: NextRequest) {
    const formData = await req.formData();

    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("categoryId") as string;
    const slug = (formData.get("slug") as string) || generateSlug(name);

    const icon = formData.get("icon") as File | null;

    if (!id) {
      return Response.json({ message: "Missing website ID" }, { status: 400 });
    }

    let iconUrl: string | undefined = undefined;

    if (icon && icon.size > 0) {
      // Upload new icon to Vercel Blob
      const buffer = Buffer.from(await icon.arrayBuffer());
      const blob = await put(`icons/${slug}-${icon.name}`, buffer, {
        contentType: icon.type,
        access: "public",
      });
      iconUrl = blob.url;
    }

    try {
      const updatedWebsite = await prisma.website.update({
        where: { id },
        data: {
          name,
          url,
          description,
          slug,
          categoryId,
          ...(iconUrl ? { iconUrl } : {}), // Only update iconUrl if new one was uploaded
        },
      });

      return Response.json(updatedWebsite);
    } catch (error) {
      console.error("Failed to update website:", error);
      return Response.json({ message: "Failed to update website" }, { status: 500 });
    }
  }
