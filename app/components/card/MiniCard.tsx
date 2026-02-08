"use client";
import Tag from "../tag/Tag";
import "./card.css";
import Image from "next/image";

interface MiniCardProps {
  icon?: string;
  title?: string;
  description?: string;
}

const MiniCard: React.FC<MiniCardProps> = ({
  icon,
  title,
  description,
}) => {
  const isRTL = typeof document !== "undefined" ? document.dir === "rtl" : true;

  return (
    <>
      <div className="w-full! border-none! bg-white! p-[16px]! flex! flex-row! items-center! gap-[24px]! rounded-[16px]! relative! box-border! overflow-hidden!  text-center!">
        <div className="square-green">
          <Image
            src={`/assets/icons/stroke-standard/${icon}-stroke-rounded.svg`}
            alt="icon"
            width={28}
            height={28}
            className="white-icon"
          />
        </div>

        {/* <div className="grid! grid-cols-1! gap-[24px]!"> */}
          <div className="flex! flex-col! gap-[10px]!">
            <h2 className="title text-start!">{title}</h2>
            <p className="disc text-start!">{description}</p>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default MiniCard;
