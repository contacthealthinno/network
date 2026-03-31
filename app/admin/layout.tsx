"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Users, FileText, Menu, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { SiteHeader } from "@/components/site-header";

const sidebarNav = [
  { name: "Startups", href: "/admin", icon: Building2 },
  { name: "Healthcare Orgs", href: "/admin/orgs", icon: Users },
  { name: "Alignment Reports", href: "/admin/alignment-reports", icon: FileText },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {sidebarNav.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/admin" && pathname?.startsWith(item.href));
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

export default function AdminLayout({
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
                <div className="mb-4 pb-4 border-b border-border flex items-center gap-2">
                  <Shield size={18} className="text-navy" />
                  <p className="font-semibold text-foreground">Admin Panel</p>
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
                <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
                <div className="mt-6">
                  <div className="mb-4 pb-4 border-b border-border flex items-center gap-2">
                    <Shield size={18} className="text-navy" />
                    <p className="font-semibold text-foreground">Admin Panel</p>
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
