
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, Role } from '@/types/common';
import { MODULES, ACTIONS, DEFAULT_ROLES } from '@/lib/constants';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  hasPermission: (module: string, action: string) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Mock auth for demo purposes
const mockAdminUser: AuthUser = {
  uid: 'admin-123',
  email: 'admin@healthengage.com',
  name: 'System Administrator',
  role: {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access',
    isSystemRole: true,
    permissions: {
      modules: [
        { id: MODULES.USERS, actions: ['view', 'create', 'edit', 'delete'] },
        { id: MODULES.ROLES, actions: ['view', 'create', 'edit', 'delete'] },
        { id: MODULES.REPORTS, actions: ['view', 'create', 'edit', 'delete'] },
        { id: MODULES.BI_DASHBOARDS, actions: ['view', 'create', 'edit', 'delete'] },
        { id: MODULES.AUDIT, actions: ['view'] }
      ]
    },
    meta: {
      createdBy: 'system',
      updatedBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  permissions: [
    'users.view', 'users.create', 'users.edit', 'users.delete',
    'roles.view', 'roles.create', 'roles.edit', 'roles.delete',
    'reports.view', 'reports.create', 'reports.edit', 'reports.delete',
    'bi_dashboards.view', 'bi_dashboards.create', 'bi_dashboards.edit', 'bi_dashboards.delete',
    'audit.view'
  ]
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const timer = setTimeout(() => {
      setUser(mockAdminUser);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const hasPermission = (module: string, action: string): boolean => {
    if (!user) return false;
    
    const permission = `${module}.${action}`;
    return user.permissions.includes(permission);
  };

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(mockAdminUser);
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      hasPermission,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
