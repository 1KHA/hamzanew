"use client";
import React, { ReactNode } from "react";
import { DgaTag } from "platformscode-new-react";
import Button from "../button/Button";
import "./card.css";
import { useRouter } from "next/navigation";

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

  // Layout control props
  iconPosition?: "top" | "left" | "right";
  contentAlignment?: "start" | "center" | "end";

  // Title styling props
  titleClass?: string;
  titleColor?: string;
  titleWidth?: string | number;
  titleStyle?: React.CSSProperties;

  // Description styling props
  descriptionClass?: string;
  descriptionColor?: string;
  descriptionWidth?: string | number;
  descriptionStyle?: React.CSSProperties;
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

  // Layout defaults
  iconPosition = "top",
  contentAlignment = "start",

  // Title styling defaults
  titleClass = "text-lg-semibold",
  titleColor,
  titleWidth,
  titleStyle,

  // Description styling defaults
  descriptionClass = "text-sm-regular",
  descriptionColor,
  descriptionWidth,
  descriptionStyle,
}) => {
  const router = useRouter();
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
      router.push(linkPrimaryAction);
    }
  };

  const handleSecondaryClick = () => {
    if (!linkSecondaryAction) return;
    if (linkSecondaryAction.startsWith("http")) {
      window.open(linkSecondaryAction, external ? "_blank" : "_self");
    } else {
      router.push(linkSecondaryAction);
    }
  };

  const handleIconOnlyClick = () => {
    if (!linkPrimaryAction) return;
    if (linkPrimaryAction.startsWith("http")) {
      window.open(linkPrimaryAction, external ? "_blank" : "_self");
    } else {
      router.push(linkPrimaryAction);
    }
  };

  const getAlignmentClass = () => {
    switch (contentAlignment) {
      case "center":
        return "items-center text-center";
      case "end":
        return "items-end text-end";
      default:
        return "items-start text-start";
    }
  };

  const getLayoutClass = () => {
    if (iconPosition === "left") {
      return "w-full flex justify-between gap-3 items-center";
    } else if (iconPosition === "right") {
      return "flex flex-row-reverse gap-3 items-start";
    }
    return "flex flex-col";
  };

  const iconAndContentSection = (
    <>
      {icon && (
        <div
          className={`circular-green ${
            iconPosition !== "top" ? "flex-shrink-0" : ""
          }`}
        >
          <img
            alt=""
            width={24}
            height={24}
            className="inline-block green-icon"
            src={`/assets/icons/stroke-standard/${icon}-stroke-rounded.svg`}
          />
        </div>
      )}

      {number && (
        <div
          className={`circular-green-number ${
            iconPosition !== "top" ? "flex-shrink-0" : ""
          }`}
        >
          <span>{number}</span>
        </div>
      )}

      {(title || description || children) && (
        <div
          className={`card-content flex-1 flex flex-col ${getAlignmentClass()}`}
        >
          {title && (
            <div
              className={titleClass || "title"}
              style={{
                color: titleColor,
                width: titleWidth,
                ...titleStyle,
              }}
            >
              {title}
            </div>
          )}
          {description && (
            <div
              className={descriptionClass || "disc"}
              style={{
                color: descriptionColor,
                width: descriptionWidth,
                ...descriptionStyle,
              }}
            >
              {description}
            </div>
          )}
          {children}
        </div>
      )}
    </>
  );

  return (
    <div className="card" style={style}>
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

      <div className={getLayoutClass()}>{iconAndContentSection}</div>

      {tagLable && <DgaTag label={tagLable} size="md" variant="neutral" />}

      {(showSecondaryAction || showPrimaryAction || buttonIconOnly) && (
        <div
          className={`flex btn-card ${
            secondaryActionLabel ? "!gap-[12px]" : "!gap-0"
          }`}
        >
          {showSecondaryAction && (
            <Button
              label={secondaryActionLabel}
              onClick={handleSecondaryClick}
              variant="secondary-outline"
              size="md"
              icon="arrow-right-02"
              iconSize={16}
            />
          )}

          {showPrimaryAction && (
            <Button
              label={primaryActionLabel}
              onClick={handlePrimaryClick}
              variant={buttonColor}
              size="md"
              disabled={disablePrimaryAction}
              icon={showPrimaryIcon ? resolvedTrailIconType : undefined}
              iconSize={16}
              iconClass="white-icon"
            />
          )}

          {buttonIconOnly && (
            <Button
              onClick={handleSecondaryClick}
              variant="secondary"
              size="lg"
              iconOnly
              icon={resolvedTrailIconType}
              iconSize={24}
              className="dir-start"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Card;