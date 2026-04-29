"use client";

import Card from "@/app/components/card/Card";
import Carousel from "@/app/components/carousel/Carousel";
import Button from "@/app/components/button/Button";
import { useRouter } from "next/navigation";
import { NewsArticle } from "../_data/homeData";

interface NewsSectionProps {
  articles: any[];
}

export default function NewsSection({ articles }: NewsSectionProps) {
  const router = useRouter();
  return (
    <section
      className="section-spacing-5xl custom-container gap-[32px] !flex flex-col"
      aria-label="الأخبار والمقالات"
    >
      <div className="grid gap-[24px]">
        <div className="flex-between-center">
          <h2 className="display-sm-bold">الاخبار والمقالات</h2>
          <Button
            label="عرض الكل"
            variant="secondary-outline"
            size="md"
            onClick={() => {
              router.push("/news");
            }}
          />
        </div>
        <p className="text-md-regular">
          نقدّم أحدث الأخبار والمقالات المتخصصة في اختبارات همزة وتطوير
          الاختبارات المعيارية للغة العربية
        </p>
      </div>
      <div className="section-spacing-4xl" aria-label="آخر الأخبار">
        <Carousel itemsPerSlide={3} gap={20} autoPlay interval={4000}>
          {articles.slice(0, 6).map((article) => (
            <Card
              key={`news-${article.id}`}
              title={article.title}
              description={article.description}
              image={article.image}
              showPrimaryAction
              primaryActionLabel="قراءة المزيد"
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
