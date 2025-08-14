
import { AuditLog } from '@/types/common';

// Mock audit log data
const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    entityType: 'user',
    entityId: 'user-1',
    actorId: 'admin-123',
    actorName: 'System Administrator',
    action: 'user.create',
    before: null,
    after: { name: 'John Doe', email: 'john@example.com', status: 'active' },
    timestamp: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: '2',
    entityType: 'user',
    entityId: 'user-1',
    actorId: 'admin-123',
    actorName: 'System Administrator',
    action: 'user.update',
    before: { status: 'active' },
    after: { status: 'inactive' },
    timestamp: new Date('2024-01-15T14:20:00Z')
  },
  {
    id: '3',
    entityType: 'role',
    entityId: 'role-1',
    actorId: 'admin-123',
    actorName: 'System Administrator',
    action: 'role.create',
    before: null,
    after: { name: 'Custom Manager', description: 'Custom role for managers' },
    timestamp: new Date('2024-01-14T09:15:00Z')
  },
  {
    id: '4',
    entityType: 'user',
    entityId: 'user-2',
    actorId: 'admin-123',
    actorName: 'System Administrator',
    action: 'user.delete',
    before: { name: 'Jane Smith', email: 'jane@example.com', status: 'suspended' },
    after: null,
    timestamp: new Date('2024-01-13T16:45:00Z')
  }
];

export const auditService = {
  async getAuditLogs(): Promise<AuditLog[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAuditLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  async getAuditLogsByEntity(entityType: string, entityId: string): Promise<AuditLog[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAuditLogs
      .filter(log => log.entityType === entityType && log.entityId === entityId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },

  async createAuditLog(logData: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const newLog: AuditLog = {
      ...logData,
      id: `audit-${Date.now()}`,
      timestamp: new Date()
    };

    mockAuditLogs.unshift(newLog);
    return newLog;
  }
};
