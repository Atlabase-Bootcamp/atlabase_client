"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PLANNED: { label: "Planificado", color: "#94a3b8" },
  IN_PROGRESS: { label: "En Progreso", color: "#3b82f6" },
  COMPLETED: { label: "Completado", color: "#22c55e" },
  CANCELLED: { label: "Cancelado", color: "#ef4444" },
};

interface StatusChartProps {
  data: Record<string, number>;
}

function StatusChart({ data }: StatusChartProps) {
  const chartData = Object.entries(data)
    .map(([status, count]) => ({
      name: STATUS_CONFIG[status]?.label || status,
      value: count,
      color: STATUS_CONFIG[status]?.color || "#cbd5e1",
    }))
    .filter((item) => item.value > 0);

  return (
    <Card className="col-span-1">
      <CardHeader>Estado de Proyectos</CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No hay proyectos para mostrar
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { StatusChart };
