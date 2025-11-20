"use client";

import { createContext, use, useState, useEffect, ReactNode } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import type { IUser } from "@/types";

interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData?: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoging] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const token = Cookie.get("auth-token");
      if (!token) {
        setIsLoging(false);
        return;
      }

      try {
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error restaurando sesión:", error);
        Cookie.remove("auth-token");
      } finally {
        setIsLoging(false);
      }
    };
    initAuth();
  }, []);

  const login = (token: string, userData?: IUser) => {
    Cookie.set("auth-token", token, {
      expires: 7,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });
    if (userData) setUser(userData);
    setIsAuthenticated(true);
    router.refresh();
    router.replace("/dashboard");
  };

  const logout = () => {
    Cookie.remove("auth-token");
    setUser(null);
    setIsAuthenticated(false);
    router.refresh();
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export function useAuth() {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro del AuthProvider");
  }
  return context;
}
