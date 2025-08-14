
import React, { useState } from 'react';
import { useAuth } from '@/features/auth/auth.context';
import { AuthGuard } from '@/features/auth/auth.guard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TableColumn } from '@/types/common';
import { Role } from '@/types/common';
import { Plus, Search, Shield, Copy, Download, Upload } from 'lucide-react';
import { RoleForm } from './role-form';
import { useRoles } from './roles.hooks';
import { MODULE_DEFINITIONS } from '@/lib/constants';

export function RolesPage() {
  const { hasPermission } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showRoleForm, setShowRoleForm] = useState(false);
  
  const { data: roles = [], isLoading } = useRoles();

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: TableColumn<Role>[] = [
    {
      key: 'name',
      label: 'Role Name',
      sortable: true,
      render: (value, record) => (
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{value}</span>
          {record.isSystemRole && (
            <Badge variant="secondary" className="text-xs">System</Badge>
          )}
        </div>
      )
    },
    {
      key: 'description',
      label: 'Description',
      render: (value) => (
        <span className="text-muted-foreground">{value}</span>
      )
    },
    {
      key: 'permissions',
      label: 'Modules',
      render: (value) => (
        <div className="flex flex-wrap gap-1">
          {value.modules.slice(0, 3).map((module: any) => (
            <Badge key={module.id} variant="outline" className="text-xs">
              {MODULE_DEFINITIONS.find(m => m.id === module.id)?.name || module.id}
            </Badge>
          ))}
          {value.modules.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{value.modules.length - 3} more
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'meta',
      label: 'Created',
      render: (value) => (
        <span className="text-sm text-muted-foreground">
          {new Date(value.createdAt).toLocaleDateString()}
        </span>
      )
    }
  ];

  if (hasPermission('roles', 'edit') || hasPermission('roles', 'delete')) {
    columns.push({
      key: 'id',
      label: 'Actions',
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          {hasPermission('roles', 'edit') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedRole(record);
                setShowRoleForm(true);
              }}
            >
              Edit
            </Button>
          )}
          {hasPermission('roles', 'edit') && !record.isSystemRole && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Clone role logic
                const clonedRole = {
                  ...record,
                  id: `${record.id}-copy`,
                  name: `${record.name} (Copy)`,
                  isSystemRole: false
                };
                setSelectedRole(clonedRole);
                setShowRoleForm(true);
              }}
            >
              <Copy className="w-4 h-4" />
            </Button>
          )}
        </div>
      )
    });
  }

  return (
    <AuthGuard module="roles" action="view">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Role Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage user roles and permissions across the system
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            {hasPermission('roles', 'create') && (
              <Dialog open={showRoleForm} onOpenChange={setShowRoleForm}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Role
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedRole?.id ? 'Edit Role' : 'Create New Role'}
                    </DialogTitle>
                  </DialogHeader>
                  <RoleForm
                    role={selectedRole}
                    onSave={() => {
                      setShowRoleForm(false);
                      setSelectedRole(null);
                    }}
                    onCancel={() => {
                      setShowRoleForm(false);
                      setSelectedRole(null);
                    }}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Roles Table */}
        <DataTable
          data={filteredRoles}
          columns={columns}
          loading={isLoading}
          emptyMessage="No roles found. Create your first role to get started."
        />
      </div>
    </AuthGuard>
  );
}
