import { st } from "@/app/_lib/static-text";

interface LastModifiedProps {
  date: string;
  time: string;
  className?: string;
  variant?: "light" | "dark";
  label?: string;
  locale?: "ar" | "en";
}

const LastModified = ({
  date,
  time,
  className = "",
  variant = "light",
  label,
  locale,
}: LastModifiedProps) => {
  const textColor = variant === "dark" ? "!text-white" : "";
  const resolvedLabel = label ?? st("lastModified", "pageLabel", locale);
  const timeSuffix = st("lastModified", "timeSuffix", locale);

  return (
    <section className={`${className}`}>
      <p className={`!w-full text-sm-regular ${textColor}`}>
        {resolvedLabel}: {date} - {time} {timeSuffix}
      </p>
    </section>
  );
};

export default LastModified;
