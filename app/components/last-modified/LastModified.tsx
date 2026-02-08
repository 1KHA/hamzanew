interface LastModifiedProps {
  date: string;
  time: string;
  className?: string;
  variant?: "light" | "dark";
  label?: string;
}

const LastModified = ({ date, time, className = "", variant = "light", label = "آخر تعديل للصفحة" }: LastModifiedProps) => {
  const textColor = variant === "dark" ? "!text-white" : "";

  return (
    <section
      className={`${className}`}
    >
      <p className={`!w-full text-sm-regular ${textColor}`}>
        {label}: {date} - {time} بتوقيت السعودية
      </p>
    </section>
  );
};

export default LastModified;
