// pages/index.js
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const articles = [
  {
    title: "Sell globally with Stripe Tax",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus similique unde voluptatibus obcaecati repellat totam exercitationem quod magnam aspernatur fugiat!",
    styles: ""
  },
  {
    title: "Expand your reach with new payment options",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi adipisci tenetur dolorum placeat dolorem perspiciatis alias necessitatibus itaque fuga maiores.",
    styles: "",
  },
  {
    title: "Secure transactions with built-in fraud protection",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem temporibus quia necessitatibus modi voluptate. Cumque, laboriosam.",
    styles: "",
  },
  {
    title: "Automate tax collection and compliance",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos odio architecto voluptatem quidem praesentium optio!",
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
    <>
      <div className="flex flex-col space-y-10 w-full">
        <div className="md:p-5 w-1/2">
          <h1 className="text-3xl font-semibold uppercase font-general">
            Dev <span>Outils </span> Pack
          </h1>

          {/* Responsive description */}
          <p className="font-quicksand mt-3 leading-6 text-muted-foreground">
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
          <p className="text-lg text-muted-foreground">
            optimized checkout forms
          </p>
          <h2 className="text-4xl font-semibold capitalize font-general">
            embeds. Pop-ups. <br /> payments links.
          </h2>
          <p className="text-sm mt-2 w-full md:w-[45%] text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, consectetur voluptatum! Asperiores, officia voluptatem
            atque dolores quod consequatur in doloribus.
          </p>
          <p className="text-sm w-full md:w-[45%] text-muted-foreground">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus
            similique unde voluptatibus obcaecati repellat totam exercitationem
            quod magnam aspernatur fugiat!
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
            ready to track
          </h2>
          <p className="text-sm mt-2 leading-6 text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia saepe
            impedit itaque aliquid? Iusto quasi reiciendis eveniet ullam,
            perspiciatis est, mollitia sunt sapiente nesciunt, assumenda
            expedita facilis beatae laboriosam.
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
      <div className="text-center mt-14 flex flex-col space-y-2 md:p-5 my-40 py-32 w-full">
        <h1 className="text-4xl sm:text-4xl md:text-5xl font-semibold md:leading-12 font-general">
          Create flexible lending <br /> products.{" "}
          <span className="text-spans">With less work.</span>
        </h1>
        <p className="mt-3 text-lg md:text-xl font-quicksand text-muted-foreground">
          Purpose built for developers, our modern, low-code API lets <br /> you
          launch fast and scale with ease.{" "}
        </p>
      </div>
    </>
  );
}
