import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "@/hooks/useToast";
import type { User } from "@/types/user";

const USERS_KEY = ["users"];

export function useUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: USERS_KEY,
    queryFn: api.getUsers,
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<User, "id">) => api.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
      toast({ title: "User created", description: "New user has been added successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create user. Please try again.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => api.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
      toast({ title: "User updated", description: "User information has been updated." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update user. Please try again.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
      toast({ title: "User deleted", description: "User has been removed." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete user. Please try again.", variant: "destructive" });
    },
  });

  return {
    users: usersQuery.data ?? [],
    isLoading: usersQuery.isLoading,
    isError: usersQuery.isError,
    createUser: createMutation.mutateAsync,
    updateUser: updateMutation.mutateAsync,
    deleteUser: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
