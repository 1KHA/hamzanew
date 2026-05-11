"use client";
import Image from "next/image";
import "@/app/components/card/card.css";
import Button from "@/app/components/button/Button";
import { useRouter } from "next/navigation";
import Carousel from "@/app/components/carousel/Carousel";

function LatestNewsCard({ news }: any) {
  const router = useRouter();
  return (
    <article className="card">
      <div className="!flex !flex-col lg:!flex-row !justify-center !items-center !gap-[24px]">
        <div className="image-container !w-full lg:!w-1/2">
          <Image
            src={news.image}
            alt={news.title}
            width={600}
            height={250}
            className="card-img !rounded-[8px] !h-[300px]"
          />
        </div>
        <div className="!w-full lg:!w-1/2 !flex-none">
          <div className="!flex !flex-col !gap-[20px]">
            <h3 className="display-sm-bold">{news.title}</h3>
            <p className="text-md-regular">{(news.content?.substring(0, 120) ?? "") + "..."}</p>

            <Button
              variant="primary-neutral"
              size="md"
              label="قراءة المزيد"
              onClick={() => {
                router.push(`/news/details/${news.id}`);
              }}
              className="!w-full lg:!w-fit !mt-[4px]"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function LatestNews({
  news,
  coverage,
}: {
  news: any;
  coverage: string[];
}) {
  return (
    <section className="content !flex !flex-col !gap-[40px] !py-[32px] lg:!py-[64px]">
      <Carousel showDots={true} itemsPerSlide={1}>
        {news.slice(0, 4).map((news: any) => (
          <ul key={news.id}>
            <li>
              <LatestNewsCard news={news} />
            </li>
          </ul>
        ))}
      </Carousel>

      <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-[32px]">
        {/* Latest News */}
        <div className="!flex !flex-col !gap-[20px]">
          <h2 className="display-sm-bold">آخر الاخبار</h2>
          <div className="card">
            <Image
              src="/assets/image/photo4.jpg"
              alt="Latest News"
              width={590}
              height={395}
              className="card-img !rounded-[8px] !h-full"
            />
          </div>
        </div>

        {/* Latest  coverage*/}
        <div className="!flex !flex-col !gap-[20px]">
          <h2 className="display-sm-bold">آخر التغطيات</h2>
          <ul className="!grid !grid-cols-1 md:!grid-cols-2 !gap-[32px]">
            {coverage.map((image: string, index: number) => (
              <li key={index} className="card">
                <Image
                  src={image}
                  alt="Latest News"
                  width={260}
                  height={160}
                  className="card-img !rounded-[8px] !h-[160px]"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
