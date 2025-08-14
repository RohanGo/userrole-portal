
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rolesService } from './roles.service';
import { Role } from '@/types/common';
import { toast } from 'sonner';

export function useRoles() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: rolesService.getRoles,
  });
}

export function useRole(id: string) {
  return useQuery({
    queryKey: ['roles', id],
    queryFn: () => rolesService.getRoleById(id),
    enabled: !!id,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rolesService.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role created successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to create role: ' + error.message);
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Role> }) =>
      rolesService.updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update role: ' + error.message);
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rolesService.deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role deleted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete role: ' + error.message);
    },
  });
}
