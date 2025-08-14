
import React, { useState } from 'react';
import { useAuth } from '@/features/auth/auth.context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Users, 
  Shield, 
  FileText, 
  BarChart3, 
  Menu, 
  X,
  LogOut,
  Settings
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Users', href: '/users', icon: Users, module: 'users', action: 'view' },
  { name: 'Roles', href: '/roles', icon: Shield, module: 'roles', action: 'view' },
  { name: 'Audit Log', href: '/audit', icon: FileText, module: 'audit', action: 'view' },
  { name: 'Reports', href: '/reports', icon: BarChart3, module: 'reports', action: 'view' },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout, hasPermission } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredNavigation = navigation.filter(item => 
    hasPermission(item.module, item.action)
  );

  return (
    <div className="admin-page">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 admin-sidebar transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-admin-sidebar-foreground/20">
            <h1 className="text-xl font-bold text-white">HealthEngage</h1>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-admin-sidebar-foreground hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-admin-sidebar-foreground hover:bg-admin-sidebar-foreground/10 hover:text-white"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User menu */}
          <div className="p-4 border-t border-admin-sidebar-foreground/20">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {user?.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-admin-sidebar-foreground">{user?.role.name}</p>
              </div>
            </div>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-admin-sidebar-foreground hover:text-white"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-admin-sidebar-foreground hover:text-white"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="admin-header">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome back, {user?.name}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
}
