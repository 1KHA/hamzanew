import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import type { SubmenuColumn as SubmenuColumnType, SubmenuItem } from "./menuData";

// Icon Component
const IconImage = ({ src, alt = "" }: { src: string; alt?: string }) => (
  <img src={src} alt={alt} width={24} height={24} className="inline-block" />
);

// Submenu Link Component
const SubmenuLink = ({ item, onClick }: { item: SubmenuItem; onClick: () => void }) => (
  <li>
    <Link href={item.href} onClick={onClick} className="sub-link sub-menu__link">
      <div className="flex gap-[16px] items-center">
        <IconImage src={item.icon} />
        <span>{item.label}</span>
      </div>
    </Link>
  </li>
);

// Submenu Column Component
const SubmenuColumn = ({
  column,
  onLinkClick,
}: {
  column: SubmenuColumnType;
  onLinkClick: () => void;
}) => (
  <div className="sub-nav-title">
    <div className="p-[12px]">{column.title}</div>
    <ul className="grid gap-[4px]">
      {column.items.map((item, index) => (
        <SubmenuLink key={index} item={item} onClick={onLinkClick} />
      ))}
    </ul>
  </div>
);

// Main Submenu Component
interface NavigationSubmenuProps {
  isOpen: boolean;
  columns?: SubmenuColumnType[];
  onLinkClick: () => void;
}

export default function NavigationSubmenu({ isOpen, columns, onLinkClick }: NavigationSubmenuProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const [animating, setAnimating] = useState(false);
  const lastColumnsRef = useRef<SubmenuColumnType[] | undefined>(undefined);

  // Keep a snapshot of the last valid columns so content stays visible during close animation
  if (columns) {
    lastColumnsRef.current = columns;
  }

  const renderColumns = columns || lastColumnsRef.current;

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setShouldRender(false);
    }
  };

  if (!shouldRender || !renderColumns) return null;

  return (
    <div
      ref={contentRef}
      className="sub-navs sub-navs-fixed"
      onTransitionEnd={handleTransitionEnd}
      style={{
        position: "absolute",
        top: "72px",
        left: 0,
        right: 0,
        zIndex: 1,
        overflow: "hidden",
        opacity: animating ? 1 : 0,
        transform: animating ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[24px] content">
        {renderColumns.map((column, index) => (
          <SubmenuColumn key={index} column={column} onLinkClick={onLinkClick} />
        ))}
      </div>
    </div>
  );
}