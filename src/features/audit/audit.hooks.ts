
import { useQuery } from '@tanstack/react-query';
import { auditService } from './audit.service';

export function useAuditLogs() {
  return useQuery({
    queryKey: ['audit-logs'],
    queryFn: auditService.getAuditLogs,
  });
}

export function useEntityAuditLogs(entityType: string, entityId: string) {
  return useQuery({
    queryKey: ['audit-logs', entityType, entityId],
    queryFn: () => auditService.getAuditLogsByEntity(entityType, entityId),
    enabled: !!entityType && !!entityId,
  });
}
