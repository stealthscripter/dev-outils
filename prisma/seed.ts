// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const categories = [
  { title: "Font & Typography", slug: "font-typography" },
  { title: "Color Palettes", slug: "color-palettes" },
  { title: "Stock & Image", slug: "stock-and-image" },
  { title: "Icon Tools", slug: "icon-tools" },
  { title: "Design Inspiration", slug: "design-inspiration" },
];

async function main() {
  console.log("🌱 Starting seeding...");

  // 1. Create categories
  for (const category of categories) {
    const cat = await prisma.category.create({
      data: {
        name: category.title,
        slug: category.slug,
      },
    });

    // 2. Generate 15–30 websites per category
    const websiteCount = faker.number.int({ min: 15, max: 30 });

    for (let i = 0; i < websiteCount; i++) {
      const title = faker.company.name();
      const url = faker.internet.url();
      const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

      await prisma.website.create({
        data: {
          title,
          url,
          slug: `${slug}-${faker.string.alphanumeric(5)}`,
          imageUrl: faker.image.urlPicsumPhotos(),
          description: faker.company.catchPhrase(),
          categoryId: cat.id,
        },
      });
    }

    console.log(`✅ Seeded ${websiteCount} websites under "${category.title}"`);
  }

  console.log("✅ All data seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
