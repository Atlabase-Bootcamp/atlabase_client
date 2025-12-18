import { Sidebar } from "@/features/dashboard/components/Sidebar";
import { MobileNav } from "@/features/dashboard/components/MobileNav";
import { ReactNode } from "react";

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="hidden w-64 lg:block border rounded-lg my-2 ml-2 shrink-0">
        <Sidebar />
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-7xl pb-20 lg:pb-8">
          {children}
        </div>
      </main>

      <div className="lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
}

export default DashboardLayout;
