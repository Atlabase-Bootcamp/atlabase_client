"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Image from "next/image";

// Logic & types
import { loginSchema, LoginInput } from "../auth.schema";
import { authService } from "../auth.service";
import { useAuth } from "@/providers/AuthProvider";

// UI
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
      console.log(response);

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
    <Card className="w-full bg-gray-100 text-black max-w-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-2xl font-bold text-center hover:animate-pulse hover:scale-110 transition">
          <Image
            src="/branding/atlabase_black.svg"
            alt="atlabase_logo"
            width="50"
            height="50"
          />
          Atlabase
        </CardTitle>
        <CardDescription className="text-center">
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="tu@email.com"
                      {...field}
                      disabled={isPending}
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
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-gray-800 text-white cursor-pointer hover:bg-gray-50 hover:text-black"
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
      <CardFooter>
        <p>
          ¿No tenes cuenta?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default LoginForm;
