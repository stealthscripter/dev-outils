import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{ slug: string }>;
  }
) {
  const { slug } = await context.params;

  try {
    const website = await prisma.website.findUnique({
      where: {
        slug: slug,
      },
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
    });

    if (!website) {
      return Response.json({ error: 'Website not found' }, { status: 404 });
    }

    return Response.json(website, { status: 200 });
  } catch (error) {
    console.error('Error fetching website:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}