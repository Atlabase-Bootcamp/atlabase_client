"use client";
import { useDashboard } from "@/features/dashboard/useDashboard";
import { StatsCard } from "@/features/dashboard/components/StatsCard";
import { StatusChart } from "@/features/dashboard/components/StatusChart";
import { UpcomingDeadlines } from "@/features/dashboard/components/UpcomingDeadlines";
import { Users, Activity, CalendarClock } from "lucide-react";

function DashboardPage() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <div>Error al conectar con la base: {error.message}</div>;
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Total Clientes"
          value={data?.kpis.totalCustomers || 0}
          icon={Users}
          description="Clientes registrados"
        />
        <StatsCard
          title="Proyectos Activos"
          value={data?.kpis.activeProjects || 0}
          icon={Activity}
          description="En desarrollo actualmente"
        />
        <StatsCard
          title="Próxima Entregas"
          value={data?.upcoming_deadlines.length || 0}
          icon={CalendarClock}
          description="En los próximos 14 días"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <UpcomingDeadlines projects={data?.upcoming_deadlines || []} />
        <StatusChart data={data?.charts.projects_by_status || {}} />
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="h-8 w-48 bg-gray-400 rounded animate-pulse" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-400 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
