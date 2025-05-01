import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma";
import { websiteDataInclude, websitePage } from "@/lib/types";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {

        const cursor = req.nextUrl.searchParams.get("cursor") || undefined

        const pageSize = 10
        const session = await auth.api.getSession({
            headers: await headers(), // you need to pass the headers object.
        });
        // if (!session?.user) {
        //     return Response.json({error: "Unauthorized"})
        // }

        const websites = await prisma.website.findMany({
            include: websiteDataInclude,
            orderBy: {createdAt: "desc"},
            take: pageSize + 1,
            cursor: cursor ? {id: Number(cursor)} : undefined
        })

        const nextCursor = websites.length > pageSize ? websites[pageSize].id : null
        const data  = {
            websites: websites.slice(0 , pageSize),
            nextCursor
        }

        return Response.json(data)
    } catch (error) {
        console.error(error)
        return Response.json({
            error: "Internal server error"
        }, { status: 500 })
    }
}