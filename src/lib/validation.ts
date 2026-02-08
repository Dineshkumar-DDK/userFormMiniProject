import type { FormFieldConfig } from "@/types/user";

export interface ValidationErrors {
  [fieldName: string]: string;
}

export function validateField(
  value: string,
  config: FormFieldConfig
): string | null {
  const trimmed = value.trim();

  if (config.required && !trimmed) {
    return `${config.label} is required`;
  }

  if (!trimmed) return null;

  if (config.validation?.minLength && trimmed.length < config.validation.minLength) {
    return config.validation.message ?? `Minimum ${config.validation.minLength} characters`;
  }

  if (config.validation?.maxLength && trimmed.length > config.validation.maxLength) {
    return config.validation.message ?? `Maximum ${config.validation.maxLength} characters`;
  }

  if (config.validation?.pattern && !config.validation.pattern.test(trimmed)) {
    return config.validation.message ?? `Invalid ${config.label.toLowerCase()}`;
  }

  return null;
}

export function validateAllFields(
  values: Record<string, string>,
  fieldsConfig: FormFieldConfig[]
): ValidationErrors {
  const errors: ValidationErrors = {};

  for (const field of fieldsConfig) {
    const error = validateField(values[field.name] ?? "", field);
    if (error) {
      errors[field.name] = error;
    }
  }

  return errors;
}
