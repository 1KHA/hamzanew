"use client";
import React, { ReactNode } from "react";
import { DgaIcon, DgaButton, DgaTag } from "platformscode-new-react";
import "./card.css";
// import router from "next/router";
import { useRouter } from "next/navigation";

// import Image from "../../../public/assets/icons/stroke-standard/link-01-stroke-rounded.svg";
interface CardProps {
  style?: React.CSSProperties;
  icon?: string;
  number?: string;
  title?: string;
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
      // window.location.href = linkPrimaryAction;
      router.push(linkPrimaryAction);
    }
  };
  console.log("*******", primaryActionLabel);
  console.log("resolvedTrailIconType=>", resolvedTrailIconType);

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
          {/* 
         <DgaIcon
                  color=""
                  icon={icon}
                  size={16}
                  type="standard"
                  variant="stroke"
                /> */}

          <img
            alt=""
            width={24}
            height={24}
            className="inline-block green-icon"
            src={`/assets/icons/stroke-standard/${icon}-stroke-rounded.svg`}
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
      {(title || description || children) && (
        <div className="card-content">
          {title && <div className="title">{title}</div>}
          {description && <div className="disc">{description}</div>}
          {children}
        </div>
      )}
      {/* <div className="card-content">
      { title && <div className="title">{title}</div>}
        {description && <div className="disc">{description}</div>}
        {children}
      </div> */}

      {/* tag */}
      {tagLable && <DgaTag label={tagLable} size="md" variant="neutral" />}

      {/* actions */}
      {(showSecondaryAction || showPrimaryAction || buttonIconOnly) && (
        <div
          className={`flex btn-card ${
            secondaryActionLabel ? "!gap-[12px]" : "!gap-0"
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
                  window.open(
                    linkSecondaryAction,
                    external ? "_blank" : "_self",
                  );
                } else {
                  router.push(linkSecondaryAction);
                }
              }}
            />
          )}

          {/* primary button */}
          {showPrimaryAction && (
            <>
              {external ? (
                <>
                  <button
                    className="dga-btn dga-btn--md dga-btn--primary-brand  !flex !justify-center !items-center !p-4 !cursor-pointer"
                    onClick={() => {
                      if (!linkSecondaryAction) return;
                      if (linkSecondaryAction.startsWith("http")) {
                        window.open(
                          linkSecondaryAction,
                          external ? "_blank" : "_self",
                        );
                      } else {
                        router.push(linkSecondaryAction);
                      }
                    }}
                  >
                    <span>{primaryActionLabel}</span>
                    <img
                      alt=""
                      width={24}
                      height={24}
                      className="inline-block white-icon"
                      src={`/assets/icons/stroke-standard/${resolvedTrailIconType}-stroke-rounded.svg`}
                    />
                  </button>
                </>
              ) : (
                <DgaButton
                  tabIndex={0}
                  disabled={disablePrimaryAction}
                  label={primaryActionLabel}
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

          {/* icon-only button */}
          {buttonIconOnly && (
            <button
              className="dga-btn dga-btn--lg dga-btn--secondary dir-start !flex !justify-center !items-center !p-4 !cursor-pointer"
              onClick={() => {
                if (!linkSecondaryAction) return;
                if (linkSecondaryAction.startsWith("http")) {
                  window.open(
                    linkSecondaryAction,
                    external ? "_blank" : "_self",
                  );
                } else {
                  router.push(linkSecondaryAction);
                }
              }}
            >
              <img
                alt=""
                width={24}
                height={24}
                className="inline-block"
                src={`/assets/icons/stroke-standard/${resolvedTrailIconType}-stroke-rounded.svg`}
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
