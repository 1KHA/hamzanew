"use client";
import Tag from "../tag/Tag";
import "./card.css";
import Image from "next/image";

interface WideCardProps {
  icon?: string;
  title?: string;
  description?: string;
  tagLable?: string;
  trailIcon?: string;
}

const WideCard: React.FC<WideCardProps> = ({
  icon,
  title,
  description,
  tagLable,
  trailIcon,
}) => {
  const isRTL = typeof document !== "undefined" ? document.dir === "rtl" : true;

  return (
    <>
      <div className="w-full! border-none! bg-white! p-[16px]! flex! flex-row! items-center! gap-[24px]! rounded-[16px]! relative! box-border! overflow-hidden!  text-center!">
        <div className="circular-green">
          <Image
            src={`/assets/icons/stroke-standard/${icon}-stroke-rounded.svg`}
            alt="icon"
            width={28}
            height={28}
            className="green-icon"
          />
        </div>

        <div className="grid! grid-cols-1! gap-[24px]!">
          <div className="flex! flex-col! gap-[10px]!">
            <h2 className="title text-start!">{title}</h2>
            <p className="disc text-start!">{description}</p>
          </div>
          <div className="flex! justify-start!">
            <Tag
              label={tagLable}
              size="md"
              variant="neutral"
              trailIcon={{
                src: `/assets/icons/stroke-standard/${trailIcon}-stroke-rounded.svg`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WideCard;
