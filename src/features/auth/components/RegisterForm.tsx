"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { registerSchema, RegisterInput } from "../auth.schema";
import { authService } from "../auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

function RegisterForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsPending(true);
    try {
      await authService.register(data);
      toast.success("¡Cuenta Creada! Ahora inicie sesión");
      router.push("/login");
    } catch (error: any) {
      const message =
        error.response?.data?.error?.message || "Error al registrarse";
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-xl border-border bg-card/80 backdrop-blur-sm dark:bg-card/50 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex flex-col items-center justify-center gap-4 text-2xl font-bold text-center">
          <div className="relative w-[60px] h-[60px] hover:scale-110 transition-transform duration-300">
            <Image
              src="/logo-black.svg"
              alt="atlabase_logo_light"
              fill
              className="object-contain dark:hidden"
            />
            <Image
              src="/logo-white.svg"
              alt="atlabase_logo_dark"
              fill
              className="object-contain hidden dark:block"
            />
          </div>
          <span className="text-foreground">Atlabase</span>
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Crea tu cuenta para comenzar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Juan"
                        {...field}
                        disabled={isPending}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Pérez"
                        {...field}
                        disabled={isPending}
                        className="bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Usuario</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="juanperez23"
                      {...field}
                      disabled={isPending}
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="juan@ejemplo.com"
                      {...field}
                      disabled={isPending}
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      disabled={isPending}
                      className="bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Registrarse"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          ¿Ya tenes una cuenta?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline transition-all"
          >
            Inicia sesión!
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default RegisterForm;
