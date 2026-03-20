"use client";

import { useState, useId } from "react";
import Image from "next/image";
import "./Accordion.css";

/* ── Types ────────────────────────────────────────────────────────────────── */

interface AccordionItemProps {
  /** Header title text */
  title: string;
  /** Panel content — accepts a string or any JSX */
  children: React.ReactNode;
  /** Size variant */
  size?: "lg" | "md" | "sm";
  /** Arrow position relative to the title */
  iconAlignment?: "leading" | "trailing";
  /** Remove outer border and use a "cut" line instead */
  flush?: boolean;
  /** Prevent interaction */
  disabled?: boolean;
  /** Start expanded */
  defaultExpanded?: boolean;
}

interface AccordionProps {
  items: Omit<AccordionItemProps, "children"> & { content: React.ReactNode }[];
  size?: AccordionItemProps["size"];
  iconAlignment?: AccordionItemProps["iconAlignment"];
  flush?: boolean;
}

/* ── AccordionItem ────────────────────────────────────────────────────────── */

function AccordionItem({
  title,
  children,
  size = "lg",
  iconAlignment = "trailing",
  flush = false,
  disabled = false,
  defaultExpanded = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);
  const panelId = useId();
  const headerId = useId();

  const toggle = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const itemClass = [
    "dga-accordion-item",
    `dga-accordion-item--${size}`,
    iconAlignment === "leading" ? "dga-accordion-item--icon-leading" : "",
    flush ? "dga-accordion-item--flush" : "",
    disabled ? "disabled" : "",
    isOpen ? "active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const arrow = (
    <span className="dga-accordion-item__arrow" aria-hidden="true">
      <Image
        src="/assets/icons/stroke-standard/arrow-down-01-stroke-rounded.svg"
        alt=""
        width={16}
        height={16}
      />
    </span>
  );

  return (
    <div className={itemClass}>
      <button
        id={headerId}
        type="button"
        className="dga-accordion-item__header"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-disabled={disabled}
        onClick={toggle}
      >
        {iconAlignment === "leading" && arrow}
        <span className="dga-accordion-item__title">{title}</span>
        {iconAlignment === "trailing" && arrow}
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className="dga-accordion-item__body"
        hidden={disabled ? true : undefined}
      >
        <div className="dga-accordion-item__body-inner">{children}</div>
      </div>
    </div>
  );
}

/* ── Accordion (list wrapper) ─────────────────────────────────────────────── */

export function Accordion({ items, size, iconAlignment, flush }: AccordionProps) {
  return (
    <ul className="dga-accordion-list">
      {items.map((item, index) => (
        <li key={index} className="dga-accordion-list__item">
          <AccordionItem
            title={item.title}
            size={size ?? item.size}
            iconAlignment={iconAlignment ?? item.iconAlignment}
            flush={flush ?? item.flush}
            disabled={item.disabled}
            defaultExpanded={item.defaultExpanded}
          >
            {item.content}
          </AccordionItem>
        </li>
      ))}
    </ul>
  );
}

export default AccordionItem;
