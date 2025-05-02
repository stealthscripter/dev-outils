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

const sampleTags = [
  "UI", "UX", "Free", "Premium", "Tools", "Assets",
  "Inspiration", "Prototyping", "Open Source", "Design"
];

async function main() {
  console.log("🌱 Starting seeding...");

  // Seed Tags
  const tagRecords = await Promise.all(
    sampleTags.map(tag =>
      prisma.tag.upsert({
        where: { name: tag },
        update: {},
        create: { name: tag },
      })
    )
  );

  // Create categories and websites
  for (const category of categories) {
    const cat = await prisma.category.create({
      data: {
        name: category.title,
        slug: category.slug,
      },
    });

    const websiteCount = faker.number.int({ min: 8, max: 15 });

    for (let i = 0; i < websiteCount; i++) {
      const title = faker.company.name();
      const url = faker.internet.url();
      const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

      const selectedTags = faker.helpers.arrayElements(tagRecords, faker.number.int({ min: 1, max: 3 }));

      await prisma.website.create({
        data: {
          title,
          url,
          slug: `${slug}-${faker.string.alphanumeric(5)}`,
          imageUrl: faker.image.urlPicsumPhotos(),
          description: faker.lorem.words(faker.number.int({ min: 20, max: 40 })),
          categoryId: cat.id,
          tags: {
            connect: selectedTags.map(tag => ({ id: tag.id })),
          },
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
