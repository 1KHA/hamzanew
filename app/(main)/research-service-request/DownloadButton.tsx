"use client";

import Button from "@/app/components/button/Button";

interface DownloadButtonProps {
  label: string;
  ariaLabel: string;
}

export default function DownloadButton({ label, ariaLabel }: DownloadButtonProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/research.pdf";
    link.download = "research.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      aria-label={ariaLabel}
      label={label}
      variant="primary-brand"
      size="md"
      icon="download-02"
      iconClass="white-icon"
      className="!w-fit"
      onClick={handleDownload}
    />
  );
}
