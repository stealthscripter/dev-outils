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
    styles: "border-r border-b border-amber-800",
  },
  {
    title: "Expand your reach with new payment options",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi adipisci tenetur dolorum placeat dolorem perspiciatis alias necessitatibus itaque fuga maiores.",
    styles: "border-b border-amber-800",
  },
  {
    title: "Secure transactions with built-in fraud protection",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem temporibus quia necessitatibus modi voluptate. Cumque, laboriosam.",
    styles: "md:border-r border-amber-800 md:border-b-0 border-b",
  },
  {
    title: "Automate tax collection and compliance",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos odio architecto voluptatem quidem praesentium optio!",
    styles: "border-amber-800 md:border-b-0",
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
      <div className="flex flex-col items-center space-y-10 text-center w-full">
        {/* Responsive title */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          [2025 guide] how to build a thriving B2B loan program
        </p>

        {/* Responsive main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium">
          Build better B2B <br className="hidden sm:block" /> lending products.
        </h1>

        {/* Responsive description */}
        <p className="text-base sm:text-lg md:text-xl mx-5 sm:mx-10 md:w-2/4 lg:w-3/4 sm:w-3/4">
          The most flexible loan management system for commercial lenders. Get
          everything you need to operate & scale secured, revolving,
          installment, and hybrid products. Your secret weapon for everything
          post-loan origination.
        </p>

        {/* Responsive button container */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-7 border border-amber-700 p-4">
          <button className="border cursor-pointer border-amber-900 text-base sm:text-lg px-4 py-2 font-normal w-full sm:w-auto">
            get started
          </button>
          <button className="border cursor-pointer border-amber-900 text-base sm:text-lg px-4 py-2 font-normal w-full sm:w-auto">
            explore fusionner os
          </button>
        </div>
      </div>
      {/* section 2 */}

      <div className="grid grid-cols-1 md:grid-cols-2 mt-20 border border-amber-700 text-start w-full">
        <article className="flex flex-col space-y-2 pb-20 col-span-full md:p-5 py-5">
          <p className="text-lg">optimized checkout forms</p>
          <h2 className="text-4xl font-semibold capitalize">
            embeds. Pop-ups. <br /> payments links.
          </h2>
          <p className="text-sm mt-2 w-full md:w-[45%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, consectetur voluptatum! Asperiores, officia voluptatem
            atque dolores quod consequatur in doloribus.
          </p>
          <p className="text-sm w-full md:w-[45%]">
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
            <h4 className="text-2xl font-medium">{article.title}</h4>
            <p className="text-sm">{article.content}</p>
          </article>
        ))}
      </div>

      {/* section 3 */}
      <div className="grid text-start md:grid-cols-2 md:mt-40 mt-14 w-full">
        <article className="md:p-5 py-5">
          <h2 className="text-4xl font-semibold">ready to track</h2>
          <p className="text-sm mt-2 leading-6">
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
                <AccordionTrigger className="font-normal text-lg cursor-pointer">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </article>
      </div>

      {/* section 4      */}
      <div className="text-center mt-14 flex flex-col space-y-2 md:p-5 border border-amber-800 my-40 py-32 w-full">
        <h1 className="text-4xl sm:text-4xl md:text-5xl font-semibold md:leading-12  ">
          Create flexible lending <br /> products.{" "}
          <span className="text-orange-700">With less work.</span>
        </h1>
        <p className="mt-3 text-lg md:text-xl">
          Purpose built for developers, our modern, low-code API lets <br /> you
          launch fast and scale with ease.{" "}
        </p>
      </div>
    </>
  );
}
