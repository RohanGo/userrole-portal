
import React, { useState } from 'react';
import { AuthGuard } from '@/features/auth/auth.guard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TableColumn, AuditLog } from '@/types/common';
import { Search, Filter, Download, Activity, User, Settings } from 'lucide-react';
import { useAuditLogs } from './audit.hooks';

export function AuditPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [entityFilter, setEntityFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  
  const { data: auditLogs = [], isLoading } = useAuditLogs();

  // Filter logs based on search and filters
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesEntity = entityFilter === 'all' || log.entityType === entityFilter;
    const matchesAction = actionFilter === 'all' || log.action.includes(actionFilter);
    
    return matchesSearch && matchesEntity && matchesAction;
  });

  const columns: TableColumn<AuditLog>[] = [
    {
      key: 'timestamp',
      label: 'Time',
      sortable: true,
      render: (value) => (
        <div className="text-sm">
          <div>{new Date(value).toLocaleDateString()}</div>
          <div className="text-muted-foreground text-xs">
            {new Date(value).toLocaleTimeString()}
          </div>
        </div>
      )
    },
    {
      key: 'actorName',
      label: 'Actor',
      render: (value, record) => (
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'action',
      label: 'Action',
      render: (value) => (
        <Badge variant="outline" className="font-mono text-xs">
          {value}
        </Badge>
      )
    },
    {
      key: 'entityType',
      label: 'Entity',
      render: (value) => (
        <div className="flex items-center space-x-2">
          {value === 'user' ? (
            <User className="w-4 h-4 text-blue-600" />
          ) : (
            <Settings className="w-4 h-4 text-green-600" />
          )}
          <span className="capitalize">{value}</span>
        </div>
      )
    },
    {
      key: 'before',
      label: 'Changes',
      render: (_, record) => {
        if (!record.before && !record.after) {
          return <span className="text-muted-foreground">—</span>;
        }
        
        return (
          <Button variant="outline" size="sm" className="text-xs">
            View Details
          </Button>
        );
      }
    }
  ];

  // Calculate summary stats
  const stats = {
    total: auditLogs.length,
    today: auditLogs.filter(log => {
      const today = new Date();
      const logDate = new Date(log.timestamp);
      return logDate.toDateString() === today.toDateString();
    }).length,
    users: auditLogs.filter(log => log.entityType === 'user').length,
    roles: auditLogs.filter(log => log.entityType === 'role').length
  };

  return (
    <AuthGuard module="audit" action="view">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Audit Log</h1>
            <p className="text-muted-foreground mt-2">
              Track all system activities and changes
            </p>
          </div>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Log
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today}</div>
              <p className="text-xs text-muted-foreground">Events today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Changes</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
              <p className="text-xs text-muted-foreground">User events</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Role Changes</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.roles}</div>
              <p className="text-xs text-muted-foreground">Role events</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search audit logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={entityFilter} onValueChange={setEntityFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Entity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              <SelectItem value="user">Users</SelectItem>
              <SelectItem value="role">Roles</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Audit Log Table */}
        <DataTable
          data={filteredLogs}
          columns={columns}
          loading={isLoading}
          emptyMessage="No audit logs found."
        />
      </div>
    </AuthGuard>
  );
}
