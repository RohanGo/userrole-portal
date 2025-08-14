
import { User, PaginationInfo } from '@/types/common';

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@healthengage.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    roleId: 'admin',
    authUid: 'auth-1',
    meta: {
      createdBy: 'system',
      updatedBy: 'admin-123',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    }
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@healthengage.com',
    phone: '+1 (555) 234-5678',
    status: 'active',
    roleId: 'reporting-manager',
    authUid: 'auth-2',
    meta: {
      createdBy: 'admin-123',
      updatedBy: 'admin-123',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date('2024-01-16')
    }
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@healthengage.com',
    phone: '+1 (555) 345-6789',
    status: 'inactive',
    roleId: 'reporting-manager',
    authUid: 'auth-3',
    meta: {
      createdBy: 'admin-123',
      updatedBy: 'admin-123',
      createdAt: new Date('2024-01-17'),
      updatedAt: new Date('2024-01-18')
    }
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@healthengage.com',
    phone: '+1 (555) 456-7890',
    status: 'pending',
    roleId: 'reporting-manager',
    authUid: null,
    meta: {
      createdBy: 'admin-123',
      updatedBy: 'admin-123',
      createdAt: new Date('2024-01-19'),
      updatedAt: new Date('2024-01-19')
    }
  }
];

export interface UsersQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  roleId?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export const usersService = {
  async getUsers(query: UsersQuery = {}): Promise<{ users: User[]; pagination: PaginationInfo }> {
    const { 
      page = 1, 
      limit = 25, 
      search = '', 
      status = '', 
      roleId = '',
      sortBy = 'name',
      sortDirection = 'asc'
    } = query;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredUsers = [...mockUsers];

    // Apply filters
    if (search) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }

    if (roleId) {
      filteredUsers = filteredUsers.filter(user => user.roleId === roleId);
    }

    // Apply sorting
    filteredUsers.sort((a, b) => {
      const aValue = a[sortBy as keyof User];
      const bValue = b[sortBy as keyof User];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      return 0;
    });

    // Apply pagination
    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      users: paginatedUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    };
  },

  async getUserById(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers.find(user => user.id === id) || null;
  },

  async createUser(data: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      status: data.status || 'pending',
      roleId: data.roleId || '',
      authUid: null,
      meta: {
        createdBy: 'admin-123',
        updatedBy: 'admin-123',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    };

    mockUsers.push(newUser);
    return newUser;
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const updatedUser = {
      ...mockUsers[userIndex],
      ...data,
      meta: {
        ...mockUsers[userIndex].meta,
        updatedBy: 'admin-123',
        updatedAt: new Date()
      }
    };

    mockUsers[userIndex] = updatedUser;
    return updatedUser;
  },

  async deleteUser(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    mockUsers.splice(userIndex, 1);
  },

  async bulkUpdateStatus(userIds: string[], status: User['status']): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    userIds.forEach(id => {
      const userIndex = mockUsers.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        mockUsers[userIndex].status = status;
        mockUsers[userIndex].meta.updatedBy = 'admin-123';
        mockUsers[userIndex].meta.updatedAt = new Date();
      }
    });
  }
};
