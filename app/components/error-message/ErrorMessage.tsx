import Image from "next/image";
import "./ErrorMessage.css";
export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="invalid-feedback feedback-error" role="alert">
      <Image
        alt="help icon"
        aria-hidden="true"
        width={16}
        height={16}
        className="inline-block icon-critical"
        src="/assets/icons/stroke-standard/help-circle-stroke-rounded.svg"
      />
      <span>{message}</span>
    </div>
  );
}
