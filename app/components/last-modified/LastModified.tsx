interface LastModifiedProps {
  date: string;
  time: string;
  className?: string;
}

const LastModified = ({ date, time, className = "" }: LastModifiedProps) => {
  return (
    <section
      className={`!flex !items-start !gap-2 !py-4 !mt-4 !h-[52px] ${className}`}
    >
      <p className="!w-full text-md-regular">
        تاريخ آخر تعديل: {date} - {time} بتوقيت السعودية
      </p>
    </section>
  );
};

export default LastModified;
