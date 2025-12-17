export interface DashboardKPIs {
  totalCustomers: number;
  activeProjects: number;
}

export interface DashboardCharts {
  projects_by_status: Record<string, number>;
}

export interface UpcomingProject {
  id: string;
  title: string;
  status: string;
  estimated_end_date: string;
  customer: {
    name: string;
  };
}

export interface DashboardResponse {
  kpis: DashboardKPIs;
  charts: DashboardCharts;
  upcoming_deadlines: UpcomingProject[];
}
