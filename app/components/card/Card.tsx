import React, { ReactNode } from "react";
import { DgaIcon, DgaButton, DgaTag } from "platformscode-new-react";
import "./card.css";

interface CardProps {
  style?: React.CSSProperties;
  icon?: string;
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
  linkSecondaryAction?: () => void;
  buttonColor?: "primary-brand" | "secondary-outline" | string;
  tagLable?: string;
  children?: ReactNode;
  isImgCenter?: boolean;
}

const Card: React.FC<CardProps> = ({
  style,
  icon,
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
          <DgaIcon
            color="#067647"
            icon={icon}
            size={24}
            type="rounded"
            variant="stroke"
          />
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
            onClick={linkSecondaryAction}
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
                label={primaryActionLabel}
                size="md"
                variant={buttonColor as any}
                onClick={handlePrimaryClick}
              />
            )}
          </>
        )}
{/* scondery icon button  */}
        {
          buttonIconOnly && (
            <DgaButton
              tabIndex={0}
              iconOnly
              iconType="Circle"
              trailIcon
              trailIconProps={{ size: 16, type: "standard", variant: "stroke" }}
              label={primaryActionLabel}
              size="md"
              variant="secondary-outline"
              onClick={handlePrimaryClick}
            />
          )
        }
      </div>
    </div>
  );
};

export default Card;
