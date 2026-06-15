import {
  Controller,
  useFormContext,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import TextInput from "@/app/components/text-input/TextInput";

interface ControlledTextInputProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  type?: string;
  placeholder?: string;
  size?: "md" | "lg";
  variant?: "lighter" | "default" | "darker";
  id?: string;
  maxLength?: number;
  "aria-describedby"?: string;
  "aria-required"?: boolean;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export default function ControlledTextInput<TFieldValues extends FieldValues>({
  name,
  type = "text",
  placeholder = "",
  size = "lg",
  variant = "darker",
  id,
  maxLength,
  "aria-describedby": ariaDescribedBy,
  "aria-required": ariaRequired,
  onInput,
}: ControlledTextInputProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const fieldError = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextInput
          id={id}
          value={field.value ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={!!fieldError}
          type={type as "text" | "number" | "password" | "email" | "tel" | "search" | "url"}
          placeholder={placeholder}
          size={size}
          variant={variant}
          maxLength={maxLength}
          aria-describedby={ariaDescribedBy}
          required={ariaRequired}
          onInput={onInput}
        />
      )}
    />
  );
}
