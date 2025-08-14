
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/auth.context';
import { AuthGuard } from '@/features/auth/auth.guard';
import { DataTable } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Drawer } from '@/components/ui/drawer';
import { usersService, UsersQuery } from './users.service';
import { User, TableColumn, PaginationInfo } from '@/types/common';
import { MODULES, ACTIONS, USER_STATUSES, STATUS_LABELS } from '@/lib/constants';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { UserForm } from './user-form';
import { toast } from '@/hooks/use-toast';

export function UsersPage() {
  const { hasPermission } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 25,
    total: 0,
    totalPages: 0
  });
  
  const [query, setQuery] = useState<UsersQuery>({
    page: 1,
    limit: 25,
    search: '',
    status: '',
    roleId: '',
    sortBy: 'name',
    sortDirection: 'asc'
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await usersService.getUsers(query);
      setUsers(result.users);
      setPagination(result.pagination);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [query]);

  const handleSearch = (search: string) => {
    setQuery(prev => ({ ...prev, search, page: 1 }));
  };

  const handleStatusFilter = (status: string) => {
    setQuery(prev => ({ ...prev, status, page: 1 }));
  };

  const handleSort = (sortBy: string, sortDirection: 'asc' | 'desc') => {
    setQuery(prev => ({ ...prev, sortBy, sortDirection }));
  };

  const handlePageChange = (page: number) => {
    setQuery(prev => ({ ...prev, page }));
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setDrawerOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleDeleteUser = async (user: User) => {
    if (!hasPermission(MODULES.USERS, ACTIONS.DELETE)) return;
    
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      try {
        await usersService.deleteUser(user.id);
        toast({
          title: "Success",
          description: "User deleted successfully"
        });
        loadUsers();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete user",
          variant: "destructive"
        });
      }
    }
  };

  const handleBulkStatusUpdate = async (status: User['status']) => {
    if (selectedUsers.length === 0) return;
    
    try {
      await usersService.bulkUpdateStatus(selectedUsers, status);
      toast({
        title: "Success", 
        description: `${selectedUsers.length} users updated successfully`
      });
      setSelectedUsers([]);
      loadUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update users",
        variant: "destructive"
      });
    }
  };

  const columns: TableColumn<User>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (value, record) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{record.email}</div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value) => value || '—'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => <StatusBadge status={value} />
    },
    {
      key: 'roleId',
      label: 'Role',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value === 'admin' ? 'Administrator' : 'Reporting Manager'}
        </span>
      )
    },
    {
      key: 'meta.updatedAt',
      label: 'Last Updated',
      sortable: true,
      render: (_, record) => new Date(record.meta.updatedAt).toLocaleDateString()
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '100px',
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          {hasPermission(MODULES.USERS, ACTIONS.EDIT) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditUser(record)}
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
          {hasPermission(MODULES.USERS, ACTIONS.DELETE) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDeleteUser(record)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <AuthGuard module={MODULES.USERS} action={ACTIONS.VIEW}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground">Manage user accounts and permissions</p>
          </div>
          {hasPermission(MODULES.USERS, ACTIONS.CREATE) && (
            <Button onClick={handleCreateUser}>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="admin-card p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={query.search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={query.status} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All statuses</SelectItem>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bulk actions */}
          {selectedUsers.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedUsers.length} users selected
                </span>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkStatusUpdate('active')}
                  >
                    Activate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkStatusUpdate('inactive')}
                  >
                    Deactivate
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Data Table */}
        <DataTable
          data={users}
          columns={columns}
          loading={loading}
          pagination={pagination}
          onPageChange={handlePageChange}
          onSort={handleSort}
          sortColumn={query.sortBy}
          sortDirection={query.sortDirection}
          emptyMessage="No users found"
        />

        {/* User Form Drawer */}
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          title={selectedUser ? 'Edit User' : 'Create User'}
          size="lg"
        >
          <UserForm
            user={selectedUser}
            onSuccess={() => {
              setDrawerOpen(false);
              loadUsers();
            }}
            onCancel={() => setDrawerOpen(false)}
          />
        </Drawer>
      </div>
    </AuthGuard>
  );
}
