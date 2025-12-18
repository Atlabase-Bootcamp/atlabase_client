"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  LogOut,
  Hexagon,
} from "lucide-react"; // Agregué Hexagon para el logo
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Proyectos", icon: FolderKanban },
  { href: "/dashboard/customers", label: "Clientes", icon: Users },
];

function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth-token");
    router.push("/login");
  };

  return (
    <div className="flex h-full flex-col bg-card text-card-foreground">
      <div className="p-6 pb-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          {/* Opción A: Si tienes modo oscuro/claro configurado */}
          <div className="relative h-8 w-8">
            <Image
              src="/logo-black.svg"
              alt="Logo Atlabase"
              fill
              className="object-contain dark:hidden"
              priority
            />
            <Image
              src="/logo-white.svg"
              alt="Logo Atlabase"
              fill
              className="object-contain hidden dark:block"
              priority
            />
          </div>

          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Atlabase
          </h1>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive && "fill-primary/20")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t bg-muted/10">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-medium text-muted-foreground">
            Tema
          </span>
          <ThemeToggle />
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export { Sidebar };
