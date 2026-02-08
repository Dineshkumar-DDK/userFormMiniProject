import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import DynamicFormFactory from "./DynamicFormFactory"
import type { User } from "@/types/user"
import { userConfig } from "@/configs/userConfig";

interface UserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user?: User | null;
    onSubmit: (values: Record<string, string>) => Promise<void>;
    isSubmitting: boolean;
}
const UserDialog = ({
    open,
    onOpenChange,
    user,
    onSubmit,
    isSubmitting,       
}: UserDialogProps) => {
    const isEditing = !!user;

    const initialValues = user
        ? Object.fromEntries(
            userConfig.map((f) => [f.name, user[f.name] ?? ""])
        )
        : {};
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        {isEditing ? "Edit User" : "Add New User"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEditing
                            ? "Update the user's information below."
                            : "Fill in the details to create a new user."}
                    </DialogDescription>
                </DialogHeader>
                <DynamicFormFactory
                    key={user?.id ?? "new"}
                    fields={userConfig}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    submitLabel={isEditing ? "Save Changes" : "Create User"}
                    isSubmitting={isSubmitting}
                    onCancel={() => onOpenChange(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default UserDialog