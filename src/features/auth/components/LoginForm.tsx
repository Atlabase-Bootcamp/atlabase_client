"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { loginSchema, LoginInput } from "../auth.schema";
import { authService } from "../auth.service";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LoginForm() {
  const { login } = useAuth();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsPending(true);
    try {
      const response = await authService.login(data);
      login(response);
      toast.success("¡Bienvenido de nuevo!");
    } catch (error: any) {
      console.error(error);
      const message =
        error.response?.data?.error?.message || "Error al iniciar sesión";
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
          Ingresa tus credenciales para acceder
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tu@email.com"
                      {...field}
                      disabled={isPending}
                      className="bg-background border-input focus-visible:ring-primary"
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
                      className="bg-background border-input focus-visible:ring-primary"
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
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ingresando...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          ¿No tenes cuenta?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline transition-all"
          >
            Regístrate
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
