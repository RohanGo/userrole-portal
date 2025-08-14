
interface ReportsData {
  userStats: {
    total: number;
    active: number;
    inactive: number;
    pending: number;
    suspended: number;
    newThisMonth: number;
  };
  roleStats: {
    total: number;
    system: number;
    custom: number;
  };
  activityStats: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  statusDistribution: Array<{ name: string; value: number }>;
  roleDistribution: Array<{ name: string; count: number }>;
  monthlyActivity: Array<{ month: string; users: number; activity: number }>;
}

// Mock reports data
const mockReportsData: ReportsData = {
  userStats: {
    total: 53,
    active: 45,
    inactive: 5,
    pending: 2,
    suspended: 1,
    newThisMonth: 8
  },
  roleStats: {
    total: 4,
    system: 2,
    custom: 2
  },
  activityStats: {
    today: 12,
    thisWeek: 45,
    thisMonth: 156
  },
  statusDistribution: [
    { name: 'Active', value: 45 },
    { name: 'Inactive', value: 5 },
    { name: 'Pending', value: 2 },
    { name: 'Suspended', value: 1 }
  ],
  roleDistribution: [
    { name: 'Administrator', count: 3 },
    { name: 'Reporting Manager', count: 15 },
    { name: 'Custom Manager', count: 20 },
    { name: 'Team Lead', count: 15 }
  ],
  monthlyActivity: [
    { month: 'Jan', users: 40, activity: 120 },
    { month: 'Feb', users: 45, activity: 135 },
    { month: 'Mar', users: 48, activity: 142 },
    { month: 'Apr', users: 50, activity: 150 },
    { month: 'May', users: 53, activity: 156 }
  ]
};

export const reportsService = {
  async getReportsData(): Promise<ReportsData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockReportsData;
  },

  async exportReport(format: 'pdf' | 'excel' = 'pdf'): Promise<Blob> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock export - in real app this would generate actual file
    const mockData = JSON.stringify(mockReportsData, null, 2);
    return new Blob([mockData], { type: 'application/json' });
  }
};
