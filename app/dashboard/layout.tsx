"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bookmark,
  FileText,
  Beaker,
  Target,
  Bell,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { SiteHeader } from "@/components/site-header";

const sidebarNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Watchlist", href: "/dashboard/watchlist", icon: Bookmark },
  { name: "Alignment Reports", href: "/dashboard/reports", icon: FileText },
  { name: "My Pilots", href: "/dashboard/pilots", icon: Beaker },
  { name: "Priority Profile", href: "/dashboard/priorities", icon: Target },
  { name: "Program Updates", href: "/dashboard/updates", icon: Bell },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {sidebarNav.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? "bg-navy text-white"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <item.icon size={18} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container py-6 lg:py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="mb-4 pb-4 border-b border-border">
                  <p className="text-sm text-muted-foreground">Logged in as</p>
                  <p className="font-semibold text-foreground">
                    Presbyterian Healthcare Services
                  </p>
                </div>
                <SidebarContent />
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar */}
          <div className="lg:hidden fixed bottom-4 right-4 z-50">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="lg" className="rounded-full shadow-lg bg-navy">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px]">
                <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
                <div className="mt-6">
                  <div className="mb-4 pb-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">Logged in as</p>
                    <p className="font-semibold text-foreground">
                      Presbyterian Healthcare Services
                    </p>
                  </div>
                  <SidebarContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
