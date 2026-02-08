"use client"
import "../styles/Button.css";
import bg from "@/public/assets/image/cta-bottom-bg.png"

interface CtaSectionProps {
  title: string;
  // description: string;
  link?: string;
}

const CtaSection = ({ title, link }: CtaSectionProps) => {
  return (
    <section className="content !absolute !top-10 md:!top-20 !left-0 !right-0">
      <div className="!flex !flex-col !gap-[28px] bg-[#074D31] rounded-[16px] md:rounded-[24px] !px-[24px] md:!px-[80px] custom-container section-spacing-5xl "
      style={{
          // backgroundColor: "#074d31",
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0.923px -42.722px",
        }}
      >
        <div className="flex flex-col lg:flex-row md:justify-between lg:items-center gap-6">
          {/* <div className="flex flex-col md:flex-row items-center gap-[32px] text-center md:text-start"> */}
          <div className="flex flex-col gap-4">
            <h1 className="display-sm-bold !text-white">{title}</h1>

            <p className="text-md-regular !text-white !text-start ">
           نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك.
           <br />
           عزّز تجربتك وجهودك الدراسية، واستعد ليوم الاختبار بثقة واطمئنان.

            </p>
          </div>

          {/* </div> */}
        </div>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
          <button
            className="dga-btn dga-btn--lg dga-btn--primary-neutral--on-color w-full md:w-auto !flex !justify-center !items-center !p-4 !cursor-pointer gap-2"
            onClick={() => {
              window.open(link, "_blank", "noopener,noreferrer");
            }}
          >
            <span className="dga-btn-label">التحضير للاختبار</span>

            <img
              alt=""
              width="24"
              height="24"
              className="inline-block"
              src="/assets/icons/stroke-standard/arrow-up-right-01-stroke-rounded.svg"
            />
          </button>
        </div>

        {/* <Button
          label="التحضير للاختبار"
          variant="secondary-solid"
          size="lg"
          icon="arrow-up-right-01"
          iconSize={24}
        /> */}
      </div>
    </section>
  );
};

export default CtaSection;
