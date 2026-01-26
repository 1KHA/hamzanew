import React, { ReactNode } from "react";
import { DgaIcon, DgaButton, DgaTag } from "platformscode-new-react";
import "./card.css";
// import router from "next/router";
import { useRouter } from "next/navigation";
 interface CardProps {
  style?: React.CSSProperties;
  icon?: string;
  number?: string;
  title: string;
  description?: string;
  image?: string;
  imageWidth?: string | number;
  imageHeight?: string | number;
  external?: boolean;
  showPrimaryAction?: boolean;
  primaryActionLabel?: string;
  primaryTrailIconType?: string;
  linkPrimaryAction?: string;
  showPrimaryIcon?: boolean;
  buttonIconOnly?: boolean;
  overridePrimaryAction?: () => void;
  disablePrimaryAction?: boolean;
  logoImage?: boolean;
  showSecondaryAction?: boolean;
  secondaryActionLabel?: string;
  linkSecondaryAction?: string;
  buttonColor?: "primary-brand" | "secondary-outline" | string;
  tagLable?: string;
  children?: ReactNode;
  isImgCenter?: boolean;
}

const Card: React.FC<CardProps> = ({
  style,
  icon,
  number,
  title,
  description,
  image,
  imageWidth,
  imageHeight,
  external,
  showPrimaryAction = false,
  primaryActionLabel = "نص",
  primaryTrailIconType = "location-01",
  linkPrimaryAction,
  showPrimaryIcon = false,
  buttonIconOnly = false,
  overridePrimaryAction,
  disablePrimaryAction = false,
  logoImage = false,
  showSecondaryAction = false,
  secondaryActionLabel,
  linkSecondaryAction,
  buttonColor = "primary-brand",
  tagLable,
  children,
  isImgCenter = false,
}) => {
  const router = useRouter();
  // RTL detection - checking document direction
  const isRTL = typeof document !== "undefined" ? document.dir === "rtl" : true;

  const resolvedTrailIconType =
    primaryTrailIconType === "arrow"
      ? isRTL
        ? "arrow-left-02"
        : "arrow-right-02"
      : primaryTrailIconType;

  const handlePrimaryClick = () => {
    if (overridePrimaryAction) return overridePrimaryAction();
    if (!linkPrimaryAction) return;

    if (external) {
      window.open(linkPrimaryAction, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = linkPrimaryAction;
    }
  };
  console.log(linkSecondaryAction);

  return (
    <div className="card" style={style}>
      {/* image */}
      {image && (
        <div className="card-img-container">
          <img
            className={logoImage ? "" : "card-img"}
            src={image}
            width={imageWidth}
            height={imageHeight}
            alt={title}
            style={{
              objectFit: "cover",
              margin: isImgCenter ? "0 auto" : "unset",
              display: isImgCenter ? "block" : "inline-block",
            }}
          />
        </div>
      )}

      {/* optional icon */}
      {icon && (
        <div className="circular-green">
          <img
  alt=""
  width={24}
  height={24}
  className="inline-block"
  src={`/assets/icons/stroke-standard/link-01-stroke-standard.svg`}
/>
         </div>
      )}

      {/* optional icon */}
      {number && (
        <div className="circular-green-number">
          <span>{number}</span>
        </div>
      )}

      {/* content */}
      <div className="card-content">
        <div className="title">{title}</div>
        {description && <div className="disc">{description}</div>}
        {children}
      </div>

      {/* tag */}
      {tagLable && <DgaTag label={tagLable} size="md" variant="neutral" />}

      {/* actions */}
      <div
        className={`flex btn-card ${
          secondaryActionLabel ? "gap-[12px]" : "gap-0"
        }`}
      >
        {/* secondary button */}
        {showSecondaryAction && (
          <DgaButton
            tabIndex={0}
            trailIcon
            trailIconProps={{ size: 16, type: "standard", variant: "stroke" }}
            label={secondaryActionLabel}
            size="md"
            variant="secondary-outline"
            onClick={() => {
              if (!linkSecondaryAction) return;
              if (linkSecondaryAction.startsWith("http")) {
                window.open(linkSecondaryAction, external ? "_blank" : "_self");
              } else {
                router.push(linkSecondaryAction);
              }
            }}
          />
        )}

        {/* primary button */}
        {showPrimaryAction && (
          <>
            {buttonColor !== "primary-brand" ? (
              <div
                tabIndex={0}
                className={`${buttonColor} flex justify-between gap-[4px] cursor-pointer`}
                onClick={handlePrimaryClick}
              >
                {primaryActionLabel}

                
                <DgaIcon
                  color=""
                  icon={resolvedTrailIconType}
                  size={16}
                  type="standard"
                  variant="stroke"
                />
              </div>
            ) : (
              <DgaButton
                tabIndex={0}
                disabled={disablePrimaryAction}
                trailIcon={showPrimaryIcon}
                trailIconProps={{
                  size: 16,
                  type: "standard",
                  variant: "stroke",
                }}
                trailIconType={resolvedTrailIconType}
                size="md"
                variant={buttonColor as any}
                onClick={handlePrimaryClick}
              />
            )}
          </>
        )}
        {/* scondery icon button  */}
        {buttonIconOnly && (
          <DgaButton
            tabIndex={0}
            iconOnly
            iconType="Circle"
            trailIcon
            trailIconProps={{ size: 16, type: "standard", variant: "stroke" }}
            label={primaryActionLabel}
            size="md"
            variant="secondary-outline"
            onClick={() => {
              if (!linkSecondaryAction) return;
              if (linkSecondaryAction.startsWith("http")) {
                window.open(linkSecondaryAction, external ? "_blank" : "_self");
              } else {
                router.push(linkSecondaryAction);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
