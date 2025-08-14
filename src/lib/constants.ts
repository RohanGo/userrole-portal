
export const MODULES = {
  USERS: 'users',
  ROLES: 'roles',
  REPORTS: 'reports',
  BI_DASHBOARDS: 'bi_dashboards',
  AUDIT: 'audit'
} as const;

export const ACTIONS = {
  VIEW: 'view',
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete'
} as const;

export const USER_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended'
} as const;

export const SYSTEM_ROLES = {
  ADMIN: 'admin',
  REPORTING_MANAGER: 'reporting-manager'
} as const;

export const MODULE_DEFINITIONS = [
  {
    id: MODULES.USERS,
    name: 'User Management',
    description: 'Manage users, profiles, and user settings',
    actions: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE]
  },
  {
    id: MODULES.ROLES,
    name: 'Role Management',
    description: 'Create and manage user roles and permissions',
    actions: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE]
  },
  {
    id: MODULES.REPORTS,
    name: 'Reports',
    description: 'Access and generate system reports',
    actions: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE]
  },
  {
    id: MODULES.BI_DASHBOARDS,
    name: 'BI Dashboards',
    description: 'View and manage business intelligence dashboards',
    actions: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE]
  },
  {
    id: MODULES.AUDIT,
    name: 'Audit Logs',
    description: 'View system audit trails and logs',
    actions: [ACTIONS.VIEW]
  }
];

export const DEFAULT_ROLES = [
  {
    id: SYSTEM_ROLES.ADMIN,
    name: 'Administrator',
    description: 'Full system access with all permissions',
    isSystemRole: true,
    permissions: {
      modules: MODULE_DEFINITIONS.map(module => ({
        id: module.id,
        actions: module.actions
      }))
    }
  },
  {
    id: SYSTEM_ROLES.REPORTING_MANAGER,
    name: 'Reporting Manager',
    description: 'Access to reports and BI dashboards only',
    isSystemRole: true,
    permissions: {
      modules: [
        {
          id: MODULES.REPORTS,
          actions: [ACTIONS.VIEW]
        },
        {
          id: MODULES.BI_DASHBOARDS,
          actions: [ACTIONS.VIEW]
        }
      ]
    }
  }
];

export const TABLE_CONFIG = {
  DEFAULT_PAGE_SIZE: 25,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  MAX_PAGE_SIZE: 100
};

export const STATUS_COLORS = {
  [USER_STATUSES.ACTIVE]: 'status-active',
  [USER_STATUSES.INACTIVE]: 'status-inactive',
  [USER_STATUSES.PENDING]: 'status-pending',
  [USER_STATUSES.SUSPENDED]: 'status-suspended'
};

export const STATUS_LABELS = {
  [USER_STATUSES.ACTIVE]: 'Active',
  [USER_STATUSES.INACTIVE]: 'Inactive',
  [USER_STATUSES.PENDING]: 'Pending',
  [USER_STATUSES.SUSPENDED]: 'Suspended'
};
