import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LucideMove } from "lucide-react";

const articles = [
  {
    title: "Boost productivity with the right tools",
    content:
      "Access a wide range of tools to simplify development, design, and deployment. Every tool is selected to solve real-world problems efficiently.",
    styles: "",
  },
  {
    title: "Expand your reach with new payment options",
    content:
      "Organize and bookmark your favorite tools in one place. Find what you need fast and stay focused on what matters most.",
    styles: "",
  },
  {
    title: "Secure and reliable resources",
    content:
      "Each tool is reviewed for performance, reliability, and security. Use only trusted resources to power your projects.",
    styles: "",
  },
  {
    title: "Keep evolving with the industry",
    content:
      "Stay ahead with constantly updated tools and frameworks. Keep your tech stack modern and your skills sharp.",
    styles: "",
  },
];
const accordionItems = [
  {
    title: "Discover & Explore",
    content:
      "Browse a curated collection of high-quality resources across various categories. Use search and filters to find exactly what you need, from tutorials to essential tools.",
    value: "item-1",
  },
  {
    title: "Save & Organize",
    content:
      "Bookmark your favorite resources and categorize them into custom folders. Keep everything neatly organized and easily accessible whenever you need it.",
    value: "item-2",
  },
  {
    title: "Share & Recommend",
    content:
      "Share valuable resources with others via social media or direct links. If you discover a useful resource that’s missing, recommend it to be added to the platform.",
    value: "item-3",
  },
];

export default function Home() {
  return (
    <div className="relative md:px-8 px-5">
      <div className="flex flex-col space-y-10 w-full md:mt-10 mt-10">
        <div className="md:p-5 md:w-1/2 w-full">
          <h1 className="md:text-4xl text-3xl font-semibold uppercase font-general">
            Dev <span>Outils </span> Pack
          </h1>

          {/* Responsive description */}
          <p className="font-quicksand mt-3 md:leading-6 leading-5 text-muted-foreground text-sm md:text-base">
            Here to save you from endless googling. whether you're a developer,
            designer, or devOps guru, we've got a treasure chest of tools you’ll
            pretend to use every day. Browse, click, and maybe actually improve
            your workflow or at least look like you did. Your future self will
            thank you. Probably.
          </p>
        </div>
      </div>
      {/* section 2 */}

      <div className="grid grid-cols-1 md:grid-cols-2 mt-20 text-start w-full font-quicksand">
        <article className="flex flex-col space-y-2 pb-20 col-span-full md:p-5 py-5">
          <p className="text-lg text-muted-foreground capitalize">
            developer first productivity tools
          </p>
          <h2 className="text-4xl font-semibold capitalize font-general">
            Embeddable widgets. <br />{" "}
            <span className="text-spans"> Open-source.</span>
          </h2>
          <p className="text-sm mt-2 w-full md:w-[45%] text-muted-foreground">
            Discover and integrate tools built to save you time—from UI
            components to deployment helpers—so you can focus on building.
          </p>
          <p className="text-sm w-full md:w-[45%] text-muted-foreground">
            Everything is open source and community-powered, helping you launch
            faster and stay in control of your workflow.
          </p>
        </article>

        {articles.map((article, index) => (
          <article
            key={index}
            className={`${article.styles} flex flex-col space-y-2 md:p-5 py-5`}
          >
            <h4 className="text-2xl font-medium font-general">
              {article.title}
            </h4>
            <p className="text-sm text-muted-foreground">{article.content}</p>
          </article>
        ))}
      </div>

      {/* section 3 */}
      <div className="grid text-start md:grid-cols-2 md:mt-40 mt-14 w-full font-quicksand">
        <article className="md:p-5 py-5">
          <h2 className="text-4xl font-semibold font-general">
            Essential Tools for Every Developer
          </h2>
          <p className="text-sm mt-2 leading-6 text-muted-foreground">
            A carefully curated selection of essential tools for developers,
            designers, and DevOps professionals. Explore, organize, and easily
            access the best resources to enhance your workflow and productivity.
          </p>
        </article>

        <article className="md:p-5 py-5">
          <Accordion type="single" collapsible className="w-full">
            {accordionItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="font-normal text-lg cursor-pointer font-general">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </article>
      </div>

      {/* section 4      */}
      <div className="text-center md:mt-14 flex flex-col space-y-2 md:my-40 md:pt-32 py-20 w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold md:leading-12 font-general capitalize">
          Discover essential <br />
          <span className="text-spans">dev outils </span>
          in one place.
        </h1>
        <p className="mt-3 md:text-lg font-quicksand text-muted-foreground">
          Curated for professionals, our platform brings together the best tools
          to <br />
          enhance your workflow and boost productivity with ease.
        </p>
      </div>

      <div className="circlePosition w-[420px] h-[400px] bg-[#b891e8] rounded-full md:absolute hidden -z-1 top-0 left-16 -translate-x-1/2 -translate-y-1/2 dark:blur-[250px] blur-[180px]" />
      <div className="circlePosition w-[420px] h-[400px] bg-[#b891e8] rounded-full absolute -z-1 top-0 right-0 -translate-x-1/2 -translate-y-1/2 dark:blur-[250px] blur-[180px]" />
      <div className="circlePosition w-[420px] h-[400px] bg-[#b891e8] rounded-full absolute -z-1 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 dark:blur-[250px] blur-[180px]" />
      <div className="circlePosition w-[800px] h-[400px] bg-[#b891e8] rounded-full absolute -z-1 bottom-0 right-0 dark:blur-[250px] blur-[180px]" />
    </div>
  );
}
