
import React from 'react';
import { useAuth } from '@/features/auth/auth.context';
import { AdminLayout } from '@/components/layout/admin-layout';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-admin-surface">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/users" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-admin-surface">
      <div className="admin-card p-8 text-center max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold mb-4">HealthEngage</h1>
        <p className="text-lg text-muted-foreground mb-6">User Role Management Portal</p>
        <p className="text-sm text-muted-foreground">
          Please authenticate to access the admin portal.
        </p>
      </div>
    </div>
  );
};

export default Index;
