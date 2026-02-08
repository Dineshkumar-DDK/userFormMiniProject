import type { FormFieldConfig } from "@/types/user";

/**
 * USER FIELDS CONFIGURATION
 * 
 * To add a new field to the user form:
 * 1. Add a new FormFieldConfig object to this array
 * 2. The form, table, and API layer will automatically pick it up.
 * 
 * Example — adding a "Date of Birth" field:
 * {
 *   name: "dateOfBirth",
 *   label: "Date of Birth",
 *   type: "date",
 *   placeholder: "Select date of birth",
 *   required: false,
 * }
 */

export const userConfig: FormFieldConfig[] = [
    {
        name: "firstName",
        label: "First Name",
        required: true,
        id: "firstName",
        placeholder: "Enter first name",
        type: "text",
        defaultValue: "",
        validation: {
            minLength: 2,
            maxLength: 50,
            message: "First name must be 2–50 characters",
        }

    },
    {
        name:"lastName",
        label:"Last Name",
        placeholder:"Enter last name",
        id:"lastName",
        defaultValue:"",
        type:"text",
        required:true,
        validation:{
            minLength:2,
            maxLength:50,
            message:"Last name must be 2-50 characters"
        }
    },
     {
        name:"phone",
        label:"Phone Number",
        placeholder:"Enter contact number",
        id:"phone",
        defaultValue:"xxxxx xxxxx",
        type:"tel",
        required:true,
        validation:{
            pattern:/^[+]?[\d\s()-]{7,20}$/,
            message:"Enter a valid phone number"
        }
    },
    {
        name:"email",
        label:"Email",
        placeholder:"Enter email address",
        id:"email",
        defaultValue:"aaa@bb.ccc",
        type:"email",
        required:true,
        validation:{
            pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message:"Enter a valid email address"
        }
    }
]