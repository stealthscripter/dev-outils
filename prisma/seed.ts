import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { title: "Font & Typography", slug: "font-typography" },
  { title: "Icon Tools", slug: "icon-tools" },
  { title: "Design Inspiration", slug: "design-inspiration" },
];


async function main() {
  console.log("🌱 Starting seeding...");


  // Create categories and websites
  for (const category of categories) {
    const cat = await prisma.category.create({
      data: {
        name: category.title,
        slug: category.slug,
      },
    });

  }

  console.log("✅ All data seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
