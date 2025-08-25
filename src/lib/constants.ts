
export const MODULES = {
  CORPORATE_WELLNESS: 'corporate_wellness_360',
  REWARD_PROGRAM: 'reward_program_management',
  REWARD_SHELF: 'reward_shelf',
  REWARD_PARTNER: 'reward_partner',
  USER_ROLE: 'user_role_management',
  CONFIGURATION: 'configuration_portal',
  SMART_ENGAGE: 'smart_engage'
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
    id: MODULES.CORPORATE_WELLNESS,
    name: 'Corporate Wellness 360',
    description: 'Comprehensive wellness program management',
    actions: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE]
  },
  {
    id: MODULES.REWARD_PROGRAM,
    name: 'Reward Program Management',
    description: 'Create and manage employee reward programs',
    actions: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE]
  },
  {
    id: MODULES.REWARD_SHELF,
    name: 'Reward Shelf',
    description: 'Manage available rewards and catalog',
    actions: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE]
  },
  {
    id: MODULES.REWARD_PARTNER,
    name: 'Reward Partner',
    description: 'Manage reward partners and integrations',
    actions: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE]
  },
  {
    id: MODULES.USER_ROLE,
    name: 'User Role Management',
    description: 'Create and manage user roles and permissions',
    actions: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE]
  },
  {
    id: MODULES.CONFIGURATION,
    name: 'Configuration Portal',
    description: 'System configuration and settings management',
    actions: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE]
  },
  {
    id: MODULES.SMART_ENGAGE,
    name: 'Smart Engage',
    description: 'Employee engagement and communication tools',
    actions: [ACTIONS.VIEW, ACTIONS.CREATE, ACTIONS.EDIT, ACTIONS.DELETE]
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
    description: 'Access to reports and analytics only',
    isSystemRole: true,
    permissions: {
      modules: [
        {
          id: MODULES.CORPORATE_WELLNESS,
          actions: [ACTIONS.VIEW]
        },
        {
          id: MODULES.SMART_ENGAGE,
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
