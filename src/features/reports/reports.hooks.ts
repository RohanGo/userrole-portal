
import { useQuery } from '@tanstack/react-query';
import { reportsService } from './reports.service';

export function useReports() {
  return useQuery({
    queryKey: ['reports'],
    queryFn: reportsService.getReportsData,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
