"use client";
import Image from "next/image";
import { st } from "@/app/_lib/static-text";

function getTools() {
  return [
    {
      title: st("footer", "zoomIn"),
      icon: "/assets/icons/stroke-standard/zoom-in-area-stroke-rounded.svg",
      action: "zoom-in",
    },
    {
      title: st("footer", "zoomOut"),
      icon: "/assets/icons/stroke-standard/zoom-out-area-stroke-rounded.svg",
      action: "zoom-out",
    },
    {
      title: st("footer", "changeViewMode"),
      icon: "/assets/icons/stroke-standard/eye-stroke-rounded.svg",
      action: "view",
    },
  ];
}

const BASE_FONT = 16;
const STEP = 2;
const MIN = 12;
const MAX = 24;

export default function FooterAccessibilityTools() {
  const handleAction = (action: string) => {
    const html = document.documentElement;
    const current = parseFloat(html.style.fontSize) || BASE_FONT;
    if (action === "zoom-in")  html.style.fontSize = `${Math.min(current + STEP, MAX)}px`;
    if (action === "zoom-out") html.style.fontSize = `${Math.max(current - STEP, MIN)}px`;
    if (action === "view")     html.classList.toggle("high-contrast");
  };

  const tools = getTools();

  return (
    <div className="flex gap-[8px]" role="group" aria-label={st("footer", "accessibilityTools")}>
      {tools.map((tool) => (
        <button
          key={tool.action}
          type="button"
          className="border-green"
          aria-label={tool.title}
          onClick={() => handleAction(tool.action)}
        >
          <Image
            src={tool.icon}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </button>
      ))}
    </div>
  );
}
