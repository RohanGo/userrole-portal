
import React from 'react';
import { useAuth } from './auth.context';

interface AuthGuardProps {
  children: React.ReactNode;
  module?: string;
  action?: string;
  fallback?: React.ReactNode;
}

export function AuthGuard({ 
  children, 
  module, 
  action, 
  fallback = <div className="text-center text-muted-foreground py-8">Access denied</div>
}: AuthGuardProps) {
  const { user, hasPermission } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-admin-surface">
        <div className="admin-card p-8 text-center max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-muted-foreground">Please log in to access this application.</p>
        </div>
      </div>
    );
  }

  if (module && action && !hasPermission(module, action)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
