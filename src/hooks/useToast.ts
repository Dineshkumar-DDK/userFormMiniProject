import { toast as sonnerToast } from "sonner";

type ToastVariant = "default" | "destructive" | "success" | "loading";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
};

function toast({ title, description, variant = "default", action }: ToastOptions) {
  const message = title ?? "";

  const options = {
    description,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
  };

  switch (variant) {
    case "destructive":
      return sonnerToast.error(message, options);

    case "success":
      return sonnerToast.success(message, options);

    case "loading":
      return sonnerToast.loading(message, options);

    default:
      return sonnerToast(message, options);
  }
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string | number) =>
      toastId ? sonnerToast.dismiss(toastId) : sonnerToast.dismiss(),
  };
}

export { toast, useToast };
