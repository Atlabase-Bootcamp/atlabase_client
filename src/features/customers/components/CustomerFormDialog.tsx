"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Loader2, Pencil } from "lucide-react";
import { useCustomers } from "../hooks/useCustomers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { CreateCustomerInput, createCustomerSchema } from "../customer.schema";
import { Textarea } from "@/components/ui/textarea";
import { Customer } from "../customer.types";

interface CustomerDialogProps {
  customerToEdit?: Customer;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function CustomerFormDialog({
  customerToEdit,
  open: externalOpen,
  onOpenChange,
}: CustomerDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = externalOpen !== undefined;
  const isOpen = isControlled ? externalOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange : setInternalOpen;
  const { createCustomer, updateCustomer } = useCustomers();
  const isEditing = !!customerToEdit;

  const form = useForm<CreateCustomerInput>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (customerToEdit) {
        form.reset({
          name: customerToEdit.name,
          email: customerToEdit.email || "",
          phone_number: customerToEdit.phone_number || "",
          notes: customerToEdit.notes || "",
        });
      } else {
        form.reset({ name: "", email: "", phone_number: "", notes: "" });
      }
    }
  }, [isOpen, customerToEdit, form]);

  const onSubmit = (values: CreateCustomerInput) => {
    if (isEditing && customerToEdit) {
      updateCustomer.mutate(
        { customerId: customerToEdit.id, updates: values },
        {
          onSuccess: () => {
            if (setOpen) setOpen(false);
            form.reset();
          },
        }
      );
    } else {
      createCustomer.mutate(values, {
        onSuccess: () => {
          if (setOpen) setOpen(false);
          form.reset();
        },
      });
    }
  };

  const isLoading = createCustomer.isPending || updateCustomer.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4" />
            Nuevo Cliente
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Cliente" : "Registrar Nuevo Cliente"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre / Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Acme Corp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email de contacto</FormLabel>
                    <FormControl>
                      <Input placeholder="contacto@empresa.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="+54 9 11..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas Internas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Detalles importantes sobre el cliente..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4 gap-2">
              {/* Botón Cancelar opcional */}
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen && setOpen(false)}
              >
                Cancelar
              </Button>

              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                {isEditing ? "Guardar Cambios" : "Registrar Cliente"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { CustomerFormDialog };
