"use client";

import { useState, useId, useCallback } from "react";
import "./content-switcher.css";

type Size = "sm" | "md" | "lg";

interface SwitcherItem {
  label: string;
  content?: string;
}

interface ContentSwitcherProps {
  items: SwitcherItem[];
  size?: Size;
  onColor?: boolean;
  value?: number;
  onChange?: (index: number) => void;
}

export default function ContentSwitcher({
  items,
  size = "md",
  onColor = false,
  value,
  onChange,
}: ContentSwitcherProps) {
  const [internalSelected, setInternalSelected] = useState(value ?? 0);
  const id = useId();

  const selected = value ?? internalSelected;

  const handleSelect = useCallback(
    (index: number) => {
      if (value === undefined) setInternalSelected(index);
      onChange?.(index);
    },
    [value, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const dir = document.documentElement.dir === "rtl" ? -1 : 1;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSelect(Math.min(index + dir, items.length - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSelect(Math.max(index - dir, 0));
      } else if (e.key === "Home") {
        e.preventDefault();
        handleSelect(0);
      } else if (e.key === "End") {
        e.preventDefault();
        handleSelect(items.length - 1);
      }
    },
    [handleSelect, items.length]
  );

  return (
    <div className="content-switcher" role="tablist">
      <div className="content-switcher__items">
        {items.map((item, index) => {
          const isSelected = index === selected;
          const position =
            index === 0 ? "first" : index === items.length - 1 ? "last" : "mid";

          const className = [
            "content-switcher__item",
            `content-switcher__item--${position}`,
            `content-switcher__item--${size}`,
            onColor && "content-switcher__item--on-color",
            isSelected && "content-switcher__item--selected",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={index}
              type="button"
              role="tab"
              id={`${id}-tab-${index}`}
              aria-selected={isSelected}
              aria-controls={`${id}-panel-${index}`}
              tabIndex={isSelected ? 0 : -1}
              className={className}
              onClick={() => handleSelect(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
