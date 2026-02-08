import type { FormFieldConfig } from '@/types/user'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { useCallback, useState } from 'react';
import { validateAllFields, validateField, type ValidationErrors } from '@/lib/validation';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

interface DyamicFormFactoryProps {
    fields: FormFieldConfig[];
    initialValues?: Record<string, string>;
    onSubmit: (values: Record<string, string>) => Promise<void>;
    submitLabel: string;
    isSubmitting?: boolean;
    onCancel?: () => void;
}

const DynamicFormFactory = ({
    fields,
    initialValues = {},
    onSubmit,
    submitLabel,
    isSubmitting = false,
    onCancel,
}: DyamicFormFactoryProps) => {
    const [values, setValues] = useState<Record<string, string>>(() => {
        const defaults: Record<string, string> = {};
        for (const field of fields) {
            defaults[field.name] = initialValues[field.name] ?? "";
        }
        return defaults;
    });
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const handleChange = useCallback(
        (name: string, value: string) => {
            setValues((prev) => ({ ...prev, [name]: value }));
            if (touched[name]) {
                const field = fields.find((f) => f.name === name);
                if (field) {
                    const error = validateField(value, field);
                    setErrors((prev) => {
                        const next = { ...prev };
                        if (error) next[name] = error;
                        else delete next[name];
                        return next;
                    });
                }
            }
        },
        [fields, touched]
    );

    const handleBlur = useCallback(
        (name: string) => {
            setTouched((prev) => ({ ...prev, [name]: true }));
            const field = fields.find((f) => f.name === name);
            if (field) {
                const error = validateField(values[name] ?? "", field);
                setErrors((prev) => {
                    const next = { ...prev };
                    if (error) next[name] = error;
                    else delete next[name];
                    return next;
                });
            }
        },
        [fields, values]
    );

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const allErrors = validateAllFields(values, fields);
        setErrors(allErrors);
        setTouched(
            fields.reduce((acc, f) => ({ ...acc, [f.name]: true }), {} as Record<string, boolean>)
        );

        if (Object.keys(allErrors).length > 0) return;

        await onSubmit(values);
    };

    return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => (
        <div
          key={field.name}
          className="space-y-2"
        >
          <Label htmlFor={field.name} className="text-sm font-medium text-foreground">
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </Label>
          <Input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={values[field.name] ?? ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            className={
              errors[field.name] && touched[field.name]
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
            disabled={isSubmitting}
          />
          {errors[field.name] && touched[field.name] && (
            <p
              className="text-sm text-destructive"
            >
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}

      <div className="flex gap-3 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

export default DynamicFormFactory