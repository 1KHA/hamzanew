import Link from "next/link";
import { MenuItemType } from "./menuData";
import NavigationSubmenu from "./NavigationSubmenu";

interface MenuItemProps {
  item: MenuItemType;
  isActive: boolean;
  isSubmenuOpen: boolean;
  onToggleSubmenu: () => void;
  onLinkClick: () => void;
}

export default function MenuItem({
  item,
  isActive,
  isSubmenuOpen,
  onToggleSubmenu,
  onLinkClick,
}: MenuItemProps) {
  const menuItemClass = `header-menu__item ${isActive ? "header-menu__item--active" : ""}`;

  if (item.hasSubmenu) {
    return (
      <li className="group">
        <button onClick={onToggleSubmenu} className={menuItemClass}>
          <span className="header-menu__item-label">{item.label}</span>
          <span className="header-menu__item-arrow">
            <img
              src="/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
              alt=""
              width={24}
              height={24}
              className={`inline-block transition-transform duration-300 ${
                isSubmenuOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>
        <NavigationSubmenu
          isOpen={isSubmenuOpen}
          columns={item.submenuColumns}
          onLinkClick={onLinkClick}
        />
      </li>
    );
  }

  return (
    <li>
      <Link href={item.href || "#"} onClick={onLinkClick} className={menuItemClass}>
        <span className="header-menu__item-label">{item.label}</span>
      </Link>
    </li>
  );
}