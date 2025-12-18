import { Badge } from "@/components/ui/badge";
import { ProjectStatusType } from "../project.schema";

const STATUS_CONFING: Record<
  ProjectStatusType,
  { label: string; className: string }
> = {
  PENDING: {
    label: "Planificado",
    className: "bg-slate-500 hover:bg-slate-600",
  },
  IN_PROGRESS: {
    label: "En Progreso",
    className: "bg-blue-500 hover:bg-blue-600",
  },
  COMPLETED: {
    label: "Completado",
    className: "bg-green-500 hover:bg-green-600",
  },
  CANCELLED: {
    label: "Cancelado",
    className: "bg-red-500 hover:bg-green-600",
  },
};

function ProjectStatusBadge({ status }: { status: ProjectStatusType }) {
  const config = STATUS_CONFING[status] || STATUS_CONFING.PENDING;
  return (
    <Badge className={`${config.className} text-white`}>{config.label}</Badge>
  );
}

export { ProjectStatusBadge };
