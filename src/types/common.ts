
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  roleId: string;
  authUid?: string;
  meta: {
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface Role {
  id: string;
  name: string;
  description: string;
  isSystemRole: boolean;
  permissions: {
    modules: Array<{
      id: string;
      actions: Array<'view' | 'create' | 'edit' | 'delete'>;
    }>;
  };
  meta: {
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface AuditLog {
  id: string;
  entityType: 'user' | 'role';
  entityId: string;
  actorId: string;
  actorName: string;
  action: string;
  before?: any;
  after?: any;
  timestamp: Date;
}

export interface AuthUser {
  uid: string;
  email: string;
  name: string;
  role: Role;
  permissions: string[];
}

export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended';
export type ModuleAction = 'view' | 'create' | 'edit' | 'delete';

export interface TableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
  width?: string;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
