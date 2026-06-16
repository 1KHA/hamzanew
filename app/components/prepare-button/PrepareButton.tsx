"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/button/Button";

interface PrepareButtonProps {
  label?: string;
  variant?: string;
  size?: "sm" | "md" | "lg";
  icon?: string;
  className?: string;
}

export default function PrepareButton({
  label = "التحضير للاختبار",
  variant = "primary-neutral--on-color",
  size = "lg",
  icon = "arrow-up-right-01",
  className,
}: PrepareButtonProps) {
  const router = useRouter();

  return (
    <Button
      label={label}
      variant={variant}
      size={size}
      icon={icon}
      className={className}
      onClick={() => router.push("/test-takers/hamza-meran-course")}
    />
  );
}
