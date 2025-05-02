import { Prisma } from "@prisma/client";

export const websiteDataInclude = {
    category: {
        select: {
            name: true,
            slug: true,
        },
    },
    tags: {
        select: {
            name: true,
        },
    },
} satisfies Prisma.WebsiteInclude;

// lib/types.ts
export type WebsiteData = Prisma.WebsiteGetPayload<{
    include: typeof websiteDataInclude
}> & {
    isBookmarked: boolean; // Add computed field
};

export interface websitePage {
    websites: WebsiteData[],
    nextCursor: string | null
}