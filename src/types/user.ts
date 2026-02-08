export interface User {
  id: string;
  [key: string]: string;
}


export type FieldType = "text" | "email" | "date" | "tel" | "textarea"

export interface FormFieldConfig {
    name: string,
    label: string,
    placeholder: string,
    id: string,
    defaultValue?: string,
    type: FieldType,
    required: boolean,
    validation?: {
        maxLength?: number,
        minLength?: number,
        message?: string,
        pattern?: RegExp

    }
}