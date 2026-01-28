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
  if (!columns) return null;

  return (
    <div
      className={`sub-navs sub-navs-fixed transition-all duration-150 ease-out ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      style={{
        position: "absolute",
        top: "72px",
        left: 0,
        right: 0,
        zIndex: 1,
        transition: "opacity 0.15s ease-out, visibility 0.15s ease-out",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[24px] content">
        {columns.map((column, index) => (
          <SubmenuColumn key={index} column={column} onLinkClick={onLinkClick} />
        ))}
      </div>
    </div>
  );
}