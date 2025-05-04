"use server"
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session?.user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { websiteId } = await req.json();

        if (typeof websiteId !== "string") {
            return Response.json({ error: "Invalid website ID" }, { status: 400 });
        }

        // Use upsert to avoid duplicates
        await prisma.bookmark.upsert({
            where: {
                userId_websiteId: {
                    userId: session.user.id,
                    websiteId,
                },
            },
            create: {
                userId: session.user.id,
                websiteId,
            },
            update: {}, // No-op
        });

        return Response.json({ success: true });
    } catch (error) {
        console.error("Failed to bookmark:", error);
        return Response.json({ error: "Failed to bookmark" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if (!session?.user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { websiteId } = await req.json();
    if (typeof websiteId !== "string") {
        return Response.json({ error: "Invalid website ID" }, { status: 400 });
    }

    await prisma.bookmark.delete({
        where: {
            userId_websiteId: {
                userId: session.user.id,
                websiteId,
            },
        },
    });

    return Response.json({ success: true });
}


export async function GET(request: NextRequest) {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user?.id) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session?.user.id
   

    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: {
                userId,
            },
            include: {
                website: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        url: true,
                        description: true,
                        imageUrl: true,
                        iconUrl: true,
                        category: {
                            select: {
                                name: true,
                            },
                        },
                        tags: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (!bookmarks.length) {
            return Response.json({ message: 'No bookmarks found for this user' }, { status: 200 });
        }

        return Response.json(bookmarks, { status: 200 });
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }

}
