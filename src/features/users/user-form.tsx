
import React, { useState } from 'react';
import { User } from '@/types/common';
import { usersService } from './users.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { USER_STATUSES, STATUS_LABELS } from '@/lib/constants';
import { toast } from '@/hooks/use-toast';

interface UserFormProps {
  user?: User | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    status: user?.status || 'pending',
    roleId: user?.roleId || 'reporting-manager'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      if (user) {
        await usersService.updateUser(user.id, formData);
        toast({
          title: "Success",
          description: "User updated successfully"
        });
      } else {
        await usersService.createUser(formData);
        toast({
          title: "Success",
          description: "User created successfully"
        });
      }
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${user ? 'update' : 'create'} user`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="form-group">
        <Label htmlFor="name" className="form-label">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter full name"
          required
        />
      </div>

      <div className="form-group">
        <Label htmlFor="email" className="form-label">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Enter email address"
          required
        />
      </div>

      <div className="form-group">
        <Label htmlFor="phone" className="form-label">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="Enter phone number"
        />
      </div>

      <div className="form-group">
        <Label htmlFor="role" className="form-label">Role</Label>
        <Select value={formData.roleId} onValueChange={(value) => setFormData(prev => ({ ...prev, roleId: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Administrator</SelectItem>
            <SelectItem value="reporting-manager">Reporting Manager</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="form-group">
        <Label htmlFor="status" className="form-label">Status</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as User['status'] }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (user ? 'Update User' : 'Create User')}
        </Button>
      </div>
    </form>
  );
}
