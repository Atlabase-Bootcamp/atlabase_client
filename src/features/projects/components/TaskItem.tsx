"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Task } from "../project.type";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Pencil, Trash2, X } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TaskItemsProps {
  task: Task;
  onToggle: (taskId: string, currentStatus: boolean) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (
    taskId: string,
    data: { title: string; description?: string }
  ) => void;
  isDeleting?: boolean;
}

function TaskItem({
  task,
  onToggle,
  onUpdate,
  onDelete,
  isDeleting,
}: TaskItemsProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(
    task.description || ""
  );

  const handleSave = () => {
    if (editedTitle.trim() === "") return;

    if (
      editedTitle !== task.title ||
      editedDescription !== (task.description || "")
    ) {
      onUpdate(task.id, {
        title: editedTitle,
        description: editedDescription,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") handleCancel();
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSave();
  };
  if (isEditing) {
    return (
      <div className="flex flex-col gap-3 p-3 rounded-lg border bg-card/50 shadow-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="space-y-2">
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
            className="font-medium"
            placeholder="Título de la tarea"
          />
          <Textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            className="text-sm min-h-20 resize-none"
            placeholder="Añade detalles o notas..."
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button size="sm" variant="ghost" onClick={handleCancel}>
            <X className="h-4 w-4 mr-1" /> Cancelar
          </Button>
          <Button size="sm" onClick={handleSave}>
            <Check className="h-4 w-4 mr-1" /> Guardar
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group">
      <div className="flex items-start gap-3 flex-1">
        <Checkbox
          checked={task.is_completed}
          onCheckedChange={() => onToggle(task.id, task.is_completed)}
          id={`task-${task.id}`}
          className="mt-1"
        />
        <div className="grid gap-1.5 flex-1">
          <label
            htmlFor={`task-${task.id}`}
            className={cn(
              "text-sm font-medium leading-none cursor-pointer",
              task.is_completed && "text-muted-foreground line-through"
            )}
          >
            {task.title}
          </label>

          {task.description && (
            <p
              className={cn(
                "text-xs text-muted-foreground",
                task.is_completed && "line-through opacity-70"
              )}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-primary"
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-red-600"
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
    </div>
  );
}

export { TaskItem };
