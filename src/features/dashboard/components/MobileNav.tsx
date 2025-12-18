"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderKanban, Users, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("auth-token");
    router.push("/login");
  };

  const navItems = [
    { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
    { href: "/dashboard/projects", label: "Proy.", icon: FolderKanban },
    { href: "/dashboard/customers", label: "Clientes", icon: Users },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-md pb-safe supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[64px] rounded-lg p-2 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "relative transition-transform",
                  isActive && "scale-110"
                )}
              >
                <Icon
                  className={cn("h-5 w-5", isActive && "fill-primary/20")}
                />
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary md:hidden" />
                )}
              </div>
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center gap-1 min-w-[64px] rounded-lg p-2 text-muted-foreground hover:text-red-500 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-[10px] font-medium">Salir</span>
        </button>
      </div>
    </div>
  );
}

export { MobileNav };
