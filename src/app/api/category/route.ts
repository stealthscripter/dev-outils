import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            select: { id: true, name: true },
        });
        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, slug } = body;

        if (!name || !slug) {
            return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
        }

        const existing = await prisma.category.findUnique({
            where: { slug },
        });

        if (existing) {
            return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
        }

        const newCategory = await prisma.category.create({
            data: {
                name,
                slug,
            },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error("[CATEGORY_ADD]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}