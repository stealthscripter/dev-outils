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

export type WebsiteData = Prisma.WebsiteGetPayload<{
    include: typeof websiteDataInclude
}>


export interface websitePage {
    websites: WebsiteData[],
    nextCursor: string | null
}