import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./DgaTabs.css";

// Interface for Icon Props
interface IconProps {
  variant?: string;
  size?: number;
  [key: string]: any;
}

// Interface for Tab Item
export interface TabItem {
  label: string;
  tabIcon?: string;
  iconProps?: IconProps;
  link?: string;
  onClick?: (e?: React.MouseEvent) => void;
  [key: string]: any;
}

// Interface for Component Props
export interface DgaTabsProps {
  size?: "sm" | "md" | "lg"; // lg was in original but mapped to others in JS, keeping for safety
  orientation?: "horizontal" | "vertical";
  tabsList?: TabItem[];
  external?: boolean;
  divider?: boolean;
  flush?: boolean;
  disabled?: boolean;
  activeTab?: number;
  onTabChange?: (index: number) => void;
  onItemClick?: () => void;
  className?: string; // extraClass
}

// Mock Icon Component
const DgaIcon: React.FC<
  { name: string; size?: number; variant?: string } & IconProps
> = ({ name, ...props }) => {
  // In a real app, this would dynamically load icons or map them
  if (name === "CircleIcon") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={props.variant === "stroke" ? "2" : "0"}
          fill={props.variant === "solid" ? "currentColor" : "none"}
        />
      </svg>
    );
  } else if (name === "MoreHorizontalCircle01Icon") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8 12H8.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 12H12.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 12H16.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return <span className="dga-icon-placeholder">{name}</span>;
};

export const DgaTabs: React.FC<DgaTabsProps> = ({
  size = "md",
  orientation = "horizontal",
  tabsList = [],
  external = false,
  divider = false,
  flush = false,
  disabled = false,
  activeTab: controlledActiveTab,
  onTabChange,
  onItemClick,
  className = "",
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(0);
  const activeTab =
    controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);

  const toggleMenu = () => {
    if (!disabled) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const handleTabClick = (e: React.MouseEvent, index: number, tab: TabItem) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    // Original logic: preventDefault for internal, or if explicitly handled
    if (!external || tab.onClick) {
      // If it's a real link (external) we might still want to prevent default if onClick is provided?
      // JS says: prevent default unconditional in rendering block.
      // We will mimic: always prevent default unless ONLY external link with no onClick.
      // But the Stencil code had: onClick: e => { e.preventDefault(); ... }
      // So it seems it behaves like a tab even if external=true, just renders an <a>.
      e.preventDefault();
    }

    // Update active tab
    if (controlledActiveTab === undefined) {
      setInternalActiveTab(index);
    }

    if (onTabChange) {
      onTabChange(index);
    }

    if (onItemClick) {
      onItemClick();
    }

    if (tab.onClick) {
      tab.onClick(e);
    }
  };

  const visibleTabs = tabsList.slice(0, 5);
  const overflowTabs = tabsList.slice(5);
  const showOverflow = orientation === "horizontal" && overflowTabs.length > 0;

  return (
    <ul
      className={`dga-tabs-list dga-tabs-list--${orientation} ${divider ? "dga-tabs-list--divider" : ""} ${flush ? "flush" : ""} ${className}`}
    >
      {visibleTabs.map((tab, index) => (
        <li
          key={index}
          style={{ width: orientation === "vertical" ? "100%" : "auto" }}
        >
          <a
            href={tab.link || "#"}
            className={`dga-tabs-list__item dga-tabs-list__item--${size} ${activeTab === index ? "dga-tabs-list__item--active" : ""} ${disabled ? "disabled" : ""}`}
            onClick={(e) => handleTabClick(e, index, tab)}
          >
            {tab.tabIcon && (
              <div className="dga-tabs-list__icon">
                <DgaIcon name={tab.tabIcon} {...tab.iconProps} />
              </div>
            )}
            <div className="dga-tabs-list__label">{tab.label}</div>
          </a>
        </li>
      ))}

      {showOverflow && (
        <li className="breadcrumb-item ellipsis" ref={menuRef}>
          <span
            className="more-button"
            onClick={toggleMenu}
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
            // disabled={disabled}
          >
            <Image
              src="/assets/icons/stroke-standard/more-horizontal-stroke-rounded.svg"
              alt="more icon"
              width={17}
              height={17}
              priority
            />
          </span>

          {isMenuOpen && (
            <div className="breadcrumb-dropdown">
              {/* 
                  Recursive usage for overflow menu.
               */}
              <DgaTabs
                size="md"
                orientation="vertical"
                flush={false}
                external={true}
                divider={true}
                tabsList={overflowTabs}
                activeTab={activeTab - 5}
                onTabChange={(index) => {
                  const newIndex = index + 5;
                  if (controlledActiveTab === undefined) {
                    setInternalActiveTab(newIndex);
                  }
                  if (onTabChange) {
                    onTabChange(newIndex);
                  }
                }}
                onItemClick={() => setIsMenuOpen(false)}
              />
            </div>
          )}
        </li>
      )}
    </ul>
  );
};
