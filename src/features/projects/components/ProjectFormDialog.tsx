"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { useProjectMutations } from "../hooks/useProjectMutations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus, Loader2 } from "lucide-react";
import { CreateProjectInput, projectSchema } from "../project.schema";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "../project.type";

interface ProjectDialogProps {
  projectToEdit?: Project;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const STATUS_LABELS: Record<string, string> = {
  PLANNED: "Planificado",
  IN_PROGRESS: "En Progreso",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};

function ProjectFormDialog({
  projectToEdit,
  open: externalOpen,
  onOpenChange,
}: ProjectDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = externalOpen !== undefined;
  const isOpen = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;

  const { createProject, updateProject, customers, isLoadingCustomers } =
    useProjectMutations();
  const isEditing = !!projectToEdit;

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      customerId: "",
      status: "PLANNED",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (projectToEdit) {
        form.reset({
          title: projectToEdit.title,
          description: projectToEdit.description || "",
          customerId: projectToEdit.customer_id,
          date: projectToEdit.estimated_end_date
            ? new Date(projectToEdit.estimated_end_date)
            : undefined,
          status: projectToEdit.status,
        });
      } else {
        form.reset({
          title: "",
          description: "",
          customerId: "",
          status: "PLANNED",
        });
      }
    }
  }, [isOpen, projectToEdit, form]);

  const onSubmit = (values: CreateProjectInput) => {
    const payload = {
      title: values.title,
      description: values.description,
      customerId: values.customerId,
      estimated_end_date: values.date ? values.date.toISOString() : undefined,
      status: values.status,
    };

    if (isEditing && projectToEdit) {
      updateProject.mutate(
        { projectId: projectToEdit.id, updates: payload },
        {
          onSuccess: () => {
            if (setOpen) setOpen(false);
            form.reset();
          },
        }
      );
    } else {
      createProject.mutate(payload, {
        onSuccess: () => {
          if (setOpen) setOpen(false);
          form.reset();
        },
      });
    }
  };

  const isLoading = createProject.isPending || updateProject.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Proyecto
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Proyecto" : "Crear Nuevo Proyecto"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Títilo del proyecto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Rediseño Web" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingCustomers ? (
                          <div className="p-2 text-sm">Cargando...</div>
                        ) : (
                          customers.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue="PLANNED"
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PLANNED">Planificado</SelectItem>
                        <SelectItem value="IN_PROGRESS">En Progreso</SelectItem>
                        <SelectItem value="COMPLETED">Completado</SelectItem>
                        <SelectItem value="CANCELLED">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Entrega (Opcional)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Seleccionar Fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detalles adicionales..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4 gap-2">
              {isControlled && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpen && setOpen(false)}
                >
                  Cancelar
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Guardar Cambios" : "Crear Proyecto"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { ProjectFormDialog };
