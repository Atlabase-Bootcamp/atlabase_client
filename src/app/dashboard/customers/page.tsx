"use client";

import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { CustomerFormDialog } from "@/features/customers/components/CustomerFormDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, User } from "lucide-react";
import { CustomerActions } from "@/features/customers/components/CustomerActions";

function CustomersPage() {
  const { customers, isLoading, isError } = useCustomers();
  if (isLoading) return <div>Cargando clientes...</div>;
  if (isError) return <div>Error al cargar clientes</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Clientes
          </h2>
          <p className="text-sm text-muted-foreground">
            Directorio de empresas.
          </p>
        </div>
        <CustomerFormDialog />
      </div>

      {customers.length === 0 ? (
        <div className="text-center py-10 border border-dashed rounded-lg text-muted-foreground">
          No hay clientes registrados.
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:hidden">
            {customers.map((customer) => (
              <Card key={customer.id} className="relative">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                          {customer.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{customer.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {customer.id}
                        </p>
                      </div>
                    </div>

                    <CustomerActions customer={customer} />
                  </div>

                  <div className="pt-2 border-t space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">
                        {customer.email || "Sin email"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{customer.phone_number || "Sin teléfono"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="hidden md:block border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12.5"></TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                          {customer.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell>{customer.email || "-"}</TableCell>
                    <TableCell>{customer.phone_number || "-"}</TableCell>
                    <TableCell className="text-right">
                      <CustomerActions customer={customer} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomersPage;
