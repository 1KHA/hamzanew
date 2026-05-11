"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/button/Button";
import Card from "@/app/components/card/Card";
import Carousel from "@/app/components/carousel/Carousel";
import Button from "@/app/components/button/Button";
import { useRouter } from "next/navigation";
import { NewsArticle } from "../_data/homeData";
import { st } from "@/app/_lib/static-text";

interface NewsSectionProps {
  articles: any[];
}

export default function NewsSection({ articles }: NewsSectionProps) {
  const router = useRouter();

  return (
    <section
      className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
      aria-label={st("news", "sectionAria")}
    >
      <div className="grid gap-[24px]">
        <div className="flex-between-center">
          <h2 className="display-sm-bold">{st("news", "heading")}</h2>
          <Button
            label={st("news", "showAll")}
            variant="secondary-outline"
            size="md"
            onClick={() => {
              router.push("/news");
            }}
          />
        </div>
        <p className="text-md-regular">
          {st("news", "description")}
        </p>
      </div>
      <div className="section-spacing-4xl" aria-label={st("news", "carouselAria")}>
        <Carousel itemsPerSlide={3} gap={20} autoPlay interval={4000}>
          {articles.slice(0, 6).map((article) => (
            <Card
              key={`news-${article.id}`}
              title={article.title}
              description={article.description}
              image={article.image}
              showPrimaryAction
              primaryActionLabel={st("news", "readMore")}
              buttonColor="secondary"
              showPrimaryIcon={false}
              linkPrimaryAction={`/news/details/${article.id}`}
            />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
