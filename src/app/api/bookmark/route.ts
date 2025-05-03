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