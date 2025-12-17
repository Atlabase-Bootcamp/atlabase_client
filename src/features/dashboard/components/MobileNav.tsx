"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderKanban, Users, LogOut } from "lucide-react";
import Cookies from "js-cookie";

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
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background px-4 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center justify-center ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Icon className={`h-5 w-5 ${isActive ? "fill-current" : ""}`} />
          </Link>
        );
      })}
      <button
        onClick={handleLogout}
        className="flex items-center justify-center text-muted-foreground hover:text-red-500"
      >
        <LogOut className="h-5 w-5" />
      </button>
    </div>
  );
}

export { MobileNav };
