
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Role } from '@/types/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_DEFINITIONS, ACTIONS } from '@/lib/constants';
import { Save, X } from 'lucide-react';

const roleSchema = z.object({
  name: z.string().min(1, 'Role name is required'),
  description: z.string().min(1, 'Description is required'),
  permissions: z.object({
    modules: z.array(z.object({
      id: z.string(),
      actions: z.array(z.string())
    }))
  })
});

type RoleFormData = z.infer<typeof roleSchema>;

interface RoleFormProps {
  role: Role | null;
  onSave: (role: RoleFormData) => void;
  onCancel: () => void;
}

export function RoleForm({ role, onSave, onCancel }: RoleFormProps) {
  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: role?.name || '',
      description: role?.description || '',
      permissions: {
        modules: role?.permissions.modules || []
      }
    }
  });

  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>(
    role?.permissions.modules.reduce((acc, module) => {
      acc[module.id] = module.actions;
      return acc;
    }, {} as Record<string, string[]>) || {}
  );

  const handlePermissionChange = (moduleId: string, action: string, checked: boolean) => {
    setSelectedPermissions(prev => {
      const moduleActions = prev[moduleId] || [];
      if (checked) {
        return {
          ...prev,
          [moduleId]: [...moduleActions, action].filter((v, i, arr) => arr.indexOf(v) === i)
        };
      } else {
        return {
          ...prev,
          [moduleId]: moduleActions.filter(a => a !== action)
        };
      }
    });
  };

  const handleSubmit = (data: RoleFormData) => {
    const modules = Object.entries(selectedPermissions)
      .filter(([_, actions]) => actions.length > 0)
      .map(([moduleId, actions]) => ({
        id: moduleId,
        actions: actions
      }));

    onSave({
      ...data,
      permissions: { modules }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter role name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe what this role can do"
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Permissions Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select the modules and actions this role can access
            </p>
          </CardHeader>
          <CardContent>
            <div className="permission-grid grid-cols-6">
              {/* Header */}
              <div className="permission-header">Module</div>
              <div className="permission-header">View</div>
              <div className="permission-header">Create</div>
              <div className="permission-header">Edit</div>
              <div className="permission-header">Delete</div>
              <div className="permission-header">Actions</div>

              {/* Rows */}
              {MODULE_DEFINITIONS.map(module => (
                <React.Fragment key={module.id}>
                  <div className="font-medium text-sm p-3 border-r border-border">
                    <div>{module.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {module.description}
                    </div>
                  </div>
                  
                  {Object.values(ACTIONS).map(action => (
                    <div key={`${module.id}-${action}`} className="permission-cell border-r border-border">
                      {module.actions.includes(action as keyof typeof ACTIONS) ? (
                        <Checkbox
                          checked={selectedPermissions[module.id]?.includes(action) || false}
                          onCheckedChange={(checked) => 
                            handlePermissionChange(module.id, action, !!checked)
                          }
                        />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </div>
                  ))}
                  
                  <div className="permission-cell">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const hasAll = module.actions.every(action => 
                          selectedPermissions[module.id]?.includes(action)
                        );
                        
                        if (hasAll) {
                          // Remove all permissions
                          setSelectedPermissions(prev => ({
                            ...prev,
                            [module.id]: []
                          }));
                        } else {
                          // Add all permissions
                          setSelectedPermissions(prev => ({
                            ...prev,
                            [module.id]: [...module.actions]
                          }));
                        }
                      }}
                    >
                      {module.actions.every(action => 
                        selectedPermissions[module.id]?.includes(action)
                      ) ? 'None' : 'All'}
                    </Button>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            {role?.id ? 'Update Role' : 'Create Role'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
