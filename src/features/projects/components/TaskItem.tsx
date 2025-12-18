"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Task } from "../project.type";

interface TaskItemsProps {
  task: Task;
  onToggle?: (taskId: string, currentStatus: boolean) => void;
}

function TaskItem({ task, onToggle }: TaskItemsProps) {
  return (
    <div className="flex items-start space-x-3 p-4 border rounded-lg bg-card hover:bg-muted/30 transition-colors">
      <Checkbox
        id={task.id}
        checked={task.is_completed}
        onCheckedChange={() => onToggle && onToggle(task.id, task.is_completed)}
      />
      <div>
        <label
          htmlFor={task.id}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
            task.is_completed && "line-through text-muted-foreground"
          )}
        >
          {task.title}
        </label>
        {task.description && (
          <p className="text-sm text-muted-foreground">{task.description}</p>
        )}
      </div>
    </div>
  );
}

export { TaskItem };
