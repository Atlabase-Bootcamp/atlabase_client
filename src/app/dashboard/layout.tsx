import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { MobileNav } from "@/features/dashboard/components/MobileNav";
import { ThemeToggle } from "@/components/ThemeToggle"; // 👈 Asegúrate de importar esto
import Image from "next/image";
import { ReactNode } from "react";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-muted/20">
      <aside className="hidden w-64 lg:block my-2 ml-2 shrink-0">
        <div className="h-full rounded-xl border bg-card shadow-sm overflow-hidden">
          <Sidebar />
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0 z-20">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image
                src="/logo-black.svg"
                alt="Logo"
                fill
                className="object-contain dark:hidden"
              />
              <Image
                src="/logo-white.svg"
                alt="Logo"
                fill
                className="object-contain hidden dark:block"
              />
            </div>
            <span className="font-bold text-lg tracking-tight">Atlabase</span>
          </div>

          <ThemeToggle />
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-7xl p-4 lg:p-8 pb-28 lg:pb-8">
            {children}
          </div>
        </main>
      </div>

      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
}

export default DashboardLayout;
