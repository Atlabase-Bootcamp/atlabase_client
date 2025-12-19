import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, PartyPopper } from "lucide-react";
import type { UpcomingProject } from "../dashboard.types";
import Link from "next/link";

interface UpcomingDeadlinesProps {
  projects: UpcomingProject[];
}

function UpcomingDeadlines({ projects }: UpcomingDeadlinesProps) {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Próximos Vencimientos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {projects.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              !Todo al día¡ No tienes entregas próximas
              <PartyPopper />
            </p>
          ) : (
            projects.map((project) => (
              <Link href={`/dashboard/projects/${project.id}`}>
                <div
                  key={project.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="gap-1">
                    <p className="text-sm font-medium leading-none">
                      {project.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {project.customer.name}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {new Date(project.estimated_end_date).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { UpcomingDeadlines };
