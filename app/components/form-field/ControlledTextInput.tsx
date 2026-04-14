import {
  Controller,
  useFormContext,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import dynamic from "next/dynamic";

/**
 * Dynamically import DgaTextInput to avoid SSR issues (window is not defined).
 * This component from platformscode-new-react accesses window during initialization,
 * so we only render it on the client side.
 */
const DgaTextInput = dynamic(
  () => import("platformscode-new-react").then((mod) => mod.DgaTextInput),
  { ssr: false, loading: () => <input type="text" className="input__field" aria-hidden="true" /> }
);

/**
 * Props for the ControlledTextInput component.
 * @template TFieldValues The shape of the form values.
 */
interface ControlledTextInputProps<TFieldValues extends FieldValues> {
  /** The field name — must match a key in the form schema */
  name: FieldPath<TFieldValues>;
  /** HTML input type. Defaults to "text". */
  type?: string;
  /** Placeholder text inside the input. */
  placeholder?: string;
  /** Input size variant. Defaults to "lg". */
  size?: "sm" | "md" | "lg";
  /** Visual variant of the input. Defaults to "darker". */
  variant?: "lighter" | "default" | "darker";
  /** The id for the input element. */
  id?: string;
  /** Accessible description ID for the input. */
  "aria-describedby"?: string;
  /** Whether the field is required for screen readers. */
  "aria-required"?: boolean;
}

/**
 * ControlledTextInput
 *
 * A generalized, reusable wrapper around `DgaTextInput` that integrates with React Hook Form
 * via `Controller`. This component can be used with any form in the project that uses `FormProvider`.
 *
 * ✅ Type-safe: The `name` prop is checked against the form schema.
 * ✅ Automatic Error Handling: Reads errors from the form context and applies error styling.
 * ✅ Reliable: Works with components that don't forward refs (like those from external UI libraries).
 *
 * @example
 * ```tsx
 * // 1. Wrap your form in FormProvider
 * const methods = useForm<MySchema>();
 * <FormProvider {...methods}>
 *   <FormField label="First Name" error={methods.formState.errors.firstName?.message}>
 *     <ControlledTextInput<MySchema> name="firstName" />
 *   </FormField>
 * </FormProvider>
 * ```
 */
export default function ControlledTextInput<TFieldValues extends FieldValues>({
  name,
  type = "text",
  placeholder = "",
  size = "lg",
  variant = "darker",
  id,
  "aria-describedby": ariaDescribedBy,
  "aria-required": ariaRequired,
}: ControlledTextInputProps<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  // Extract the error for this specific field
  const fieldError = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DgaTextInput
          id={id}
          value={field.value ?? ""}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={!!fieldError}
          type={type as any}
          placeholder={placeholder}
          size={size as any}
          variant={variant}
          aria-invalid={!!fieldError}
          aria-describedby={ariaDescribedBy}
          aria-required={ariaRequired}
        />
      )}
    />
  );
}
