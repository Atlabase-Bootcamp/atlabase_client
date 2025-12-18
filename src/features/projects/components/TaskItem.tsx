"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Task } from "../project.type";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

interface TaskItemsProps {
  task: Task;
  onToggle: (taskId: string, currentStatus: boolean) => void;
  onDelete: (taskId: string) => void;
  isDeleting?: boolean;
}

function TaskItem({ task, onToggle, onDelete, isDeleting }: TaskItemsProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.is_completed}
          onCheckedChange={() => onToggle(task.id, task.is_completed)}
          id={`task-${task.id}`}
        />
        <label
          htmlFor={`task-${task.id}`}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
            task.is_completed && "text-muted-foreground line-through"
          )}
        >
          {task.title}
        </label>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onDelete(task.id)}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

export { TaskItem };
