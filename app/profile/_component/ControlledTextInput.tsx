import { Controller, useFormContext } from "react-hook-form";
import { DgaTextInput } from "platformscode-new-react";
import type { UserProfileFormValues } from "../UserProfile";

/**
 * Props for the ControlledTextInput component.
 */
interface Props {
  /** The field name — must match a key in UserProfileFormValues (e.g. "email", "firstName_ar") */
  name: keyof UserProfileFormValues;
  /** HTML input type. Defaults to "text". Use "password" for password fields. */
  type?: string;
  /** Placeholder text inside the input. Defaults to empty string. */
  placeholder?: string;
  /** Input size variant. Defaults to "lg". */
  size?: "sm" | "md" | "lg";
}

/**
 * ControlledTextInput
 *
 * A reusable wrapper around `DgaTextInput` that integrates with React Hook Form
 * via `Controller`. Use this instead of `register()` because `DgaTextInput`
 * does not forward `ref` (which `register()` requires).
 *
 * ✅ Must be used inside a component wrapped with `<FormProvider>`.
 * ✅ Automatically reads errors from the form context and passes them to the input.
 * ✅ Validates on blur (inherits the form's `mode: "onBlur"` setting).
 *
 * @example Basic usage
 * ```tsx
 * <FormField label="الاسم الاول" required error={errors.firstName_ar?.message}>
 *   <ControlledTextInput name="firstName_ar" />
 * </FormField>
 * ```
 *
 * @example Password field
 * ```tsx
 * <FormField label="كلمة المرور" required error={errors.password?.message}>
 *   <ControlledTextInput name="password" type="password" />
 * </FormField>
 * ```
 *
 * @example Custom placeholder and size
 * ```tsx
 * <FormField label="البريد الالكتروني" required error={errors.email?.message}>
 *   <ControlledTextInput name="email" placeholder="مثال: user@example.com" size="md" />
 * </FormField>
 * ```
 */
export default function ControlledTextInput({
  name,
  type = "text",
  placeholder = "",
  size = "lg",
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext<UserProfileFormValues>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DgaTextInput
          value={field.value} // controlled value from RHF
          onChange={field.onChange} // notifies RHF when user types
          onBlur={field.onBlur} // triggers Zod validation on blur
          error={!!errors[name]} // shows error styling when field is invalid
          type={type as any}
          placeholder={placeholder}
          size={size as any}
          variant="darker"
        />
      )}
    />
  );
}
