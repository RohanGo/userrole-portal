
import { Role } from '@/types/common';
import { DEFAULT_ROLES } from '@/lib/constants';

// Mock data for demonstration
const mockRoles: Role[] = DEFAULT_ROLES.map(role => ({
  ...role,
  meta: {
    createdBy: 'system',
    updatedBy: 'system',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
})) as Role[];

export const rolesService = {
  async getRoles(): Promise<Role[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockRoles;
  },

  async getRoleById(id: string): Promise<Role | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockRoles.find(role => role.id === id) || null;
  },

  async createRole(roleData: Partial<Role>): Promise<Role> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newRole: Role = {
      id: `role-${Date.now()}`,
      name: roleData.name!,
      description: roleData.description!,
      isSystemRole: false,
      permissions: roleData.permissions!,
      meta: {
        createdBy: 'current-user',
        updatedBy: 'current-user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };

    mockRoles.push(newRole);
    return newRole;
  },

  async updateRole(id: string, roleData: Partial<Role>): Promise<Role> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const roleIndex = mockRoles.findIndex(role => role.id === id);
    if (roleIndex === -1) {
      throw new Error('Role not found');
    }

    const updatedRole = {
      ...mockRoles[roleIndex],
      ...roleData,
      meta: {
        ...mockRoles[roleIndex].meta,
        updatedBy: 'current-user',
        updatedAt: new Date()
      }
    };

    mockRoles[roleIndex] = updatedRole;
    return updatedRole;
  },

  async deleteRole(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const roleIndex = mockRoles.findIndex(role => role.id === id);
    if (roleIndex === -1) {
      throw new Error('Role not found');
    }

    if (mockRoles[roleIndex].isSystemRole) {
      throw new Error('Cannot delete system role');
    }

    mockRoles.splice(roleIndex, 1);
  }
};
