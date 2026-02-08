import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import UserDialog from "@/components/UserDialog";
import { UserTable } from "@/components/UsertTable";
import { useUsers } from "@/hooks/useUsers";
import type { User } from "@/types/user";
import { AlertCircle, Loader2, Plus, RefreshCw, Users } from "lucide-react";
import { useState } from "react";

export default function Index() {

    const {
        users,
        isLoading,
        isError,
        createUser,
        updateUser,
        deleteUser,
        isCreating,
        isUpdating,
        isDeleting,
    } = useUsers();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deletingUser, setDeletingUser] = useState<User | null>(null);

    const handleCreate = () => {
        setEditingUser(null);
        setDialogOpen(true);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setDialogOpen(true);
    };

    const handleSubmit = async (values: Record<string, string>) => {
        if (editingUser) {
            await updateUser({ id: editingUser.id, data: values });
        } else {
            await createUser(values);
        }
        setDialogOpen(false);
        setEditingUser(null);
    };

    const handleDeleteConfirm = async () => {
        if (deletingUser) {
            await deleteUser(deletingUser.id);
            setDeletingUser(null);
        }
    };
    return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground leading-tight">
                  User Management
                </h1>
                <p className="text-xs text-muted-foreground">
                  {users.length} {users.length === 1 ? "user" : "users"}
                </p>
              </div>
            </div>
            <Button onClick={handleCreate} size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p className="text-sm">Loading users…</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <AlertCircle className="h-8 w-8 mb-4 text-destructive" />
            <p className="text-sm font-medium text-foreground">Failed to load users</p>
            <p className="text-sm mt-1">Please try refreshing the page.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 gap-2"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
        ) : (
          <div
          >
            <UserTable
              users={users}
              onEdit={handleEdit}
              onDelete={setDeletingUser}
            />
          </div>
        )}
      </main>

      {/* Create/Edit Dialog */}
      <UserDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingUser(null);
        }}
        user={editingUser}
        onSubmit={handleSubmit}
        isSubmitting={isCreating || isUpdating}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deletingUser}
        onOpenChange={(open) => {
          if (!open) setDeletingUser(null);
        }}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        userName={
          deletingUser
            ? `${deletingUser.firstName ?? ""} ${deletingUser.lastName ?? ""}`.trim()
            : ""
        }
      />
    </div>
  );
}