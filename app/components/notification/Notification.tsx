import React from "react";
import "./Notification.css";

type NotificationVariant =
  | "critical"
  | "warning"
  | "success"
  | "info"
  | "neutral";

interface NotificationProps {
  icon?: boolean;
  leadText?: string;
  content: string;
  variant: NotificationVariant;
  link?: boolean;
  textLink?: string;
  dismissable?: boolean;
  setNavigateTo?: string;
  navigateTo?: (link?: string) => void;
  dismissed?: () => void;
  className?: string;
}

const Notification: React.FC<NotificationProps> = ({
  icon = true,
  leadText,
  content,
  variant,
  link = false,
  textLink,
  dismissable = false,
  setNavigateTo,
  navigateTo,
  dismissed,
  className = "",
}) => {
  const icons: Record<NotificationVariant, string> = {
    success:
      "/assets/icons/stroke-standard/checkmark-circle-02-stroke-rounded.svg",
    info: "/assets/icons/stroke-standard/information-circle-stroke-rounded.svg",
    neutral:
      "/assets/icons/stroke-standard/information-circle-stroke-rounded.svg",
    warning: "/assets/icons/stroke-standard/alert-02-stroke-rounded.svg",
    critical: "/assets/icons/stroke-standard/alert-circle-stroke-rounded.svg",
  };

  const handleLinkClick = () => {
    if (navigateTo && setNavigateTo) {
      navigateTo(setNavigateTo);
    }
  };

  const handleDismiss = () => {
    if (dismissed) {
      dismissed();
    }
  };

  return (
    <div className={`notification notification--${variant} ${className}`} role="alert">
      <div className="notification__content">
        {icon && (
          <div className="notification__icon">
            <img
              alt=""
              width={24}
              height={24}
              className={`notification-icon-img notification-icon-img--${variant}`}
              src={icons[variant]}
            />
          </div>
        )}

        {leadText && (
          <strong className="notification__lead-text">{leadText}: </strong>
        )}

        <p>{content}</p>

        {link && textLink && (
          <a
            onClick={handleLinkClick}
            className="notification__link link link--md link--neutral link--inline"
          >
            <span className="link__label">{textLink}</span>
          </a>
        )}
      </div>

      {dismissable && (
        <div className="notification__dismiss">
          <button
            className="dga-btn dga-btn--close dga-btn--icon dga-btn--md"
            onClick={handleDismiss}
            aria-label="Dismiss notification"
          >
            <span className="dga-btn-icon">
              <img
                alt=""
                width={20}
                height={20}
                src="/assets/icons/stroke-standard/multiplication-sign-stroke-sharp.svg"
              />
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Notification;
