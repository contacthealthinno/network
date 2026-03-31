"use client";

import { useState, useMemo } from "react";
import { Filter, ArrowUpDown, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { SiteHeader } from "@/components/site-header";
import { StartupCard } from "@/components/marketplace/startup-card";
import {
  MarketplaceFilters,
  FilterState,
} from "@/components/marketplace/marketplace-filters";
import { startups } from "@/lib/data";
import { Startup } from "@/lib/types";

type SortOption = "preferred" | "newest" | "az" | "pilots";

const SORT_OPTIONS = [
  { value: "preferred", label: "Preferred First" },
  { value: "newest", label: "Newest" },
  { value: "az", label: "A-Z" },
  { value: "pilots", label: "Most Pilots" },
];

export default function MarketplacePage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    preferredOnly: false,
    categories: [],
    compliance: {
      hipaa: false,
      soc2: false,
      baa: false,
      ehrIntegration: false,
    },
    setting: "all",
    stages: [],
    nmConnections: [],
    deploymentReadiness: [],
  });

  const [sortBy, setSortBy] = useState<SortOption>("preferred");

  // Filter and sort startups
  const filteredStartups = useMemo(() => {
    let result = startups.filter((s) => s.status === "active");

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchLower) ||
          s.tagline.toLowerCase().includes(searchLower) ||
          s.description.toLowerCase().includes(searchLower)
      );
    }

    // Preferred only
    if (filters.preferredOnly) {
      result = result.filter((s) => s.tier === "preferred");
    }

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter((s) => filters.categories.includes(s.category));
    }

    // Compliance
    if (filters.compliance.hipaa) {
      result = result.filter((s) => s.compliance.hipaa);
    }
    if (filters.compliance.soc2) {
      result = result.filter((s) => s.compliance.soc2);
    }
    if (filters.compliance.baa) {
      result = result.filter((s) => s.compliance.baa);
    }
    if (filters.compliance.ehrIntegration) {
      result = result.filter((s) => s.compliance.ehrIntegrations.length > 0);
    }

    // Setting
    if (filters.setting === "rural") {
      result = result.filter((s) => s.ruralFeasible);
    }

    // Stages
    if (filters.stages.length > 0) {
      result = result.filter((s) => filters.stages.includes(s.stage));
    }

    // NM Connection
    if (filters.nmConnections.length > 0) {
      result = result.filter((s) => filters.nmConnections.includes(s.nmConnection));
    }

    // Deployment Readiness
    if (filters.deploymentReadiness.length > 0) {
      result = result.filter((s) => filters.deploymentReadiness.includes(s.deploymentReadiness));
    }

    // Sort
    switch (sortBy) {
      case "preferred":
        result.sort((a, b) => {
          if (a.tier === "preferred" && b.tier !== "preferred") return -1;
          if (a.tier !== "preferred" && b.tier === "preferred") return 1;
          return a.name.localeCompare(b.name);
        });
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
        );
        break;
      case "az":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "pilots":
        result.sort((a, b) => b.pilotsCompleted - a.pilotsCompleted);
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Split into preferred and general
  const preferredStartups = filteredStartups.filter(
    (s) => s.tier === "preferred"
  );
  const generalStartups = filteredStartups.filter((s) => s.tier === "general");

  const showSections = sortBy === "preferred" && !filters.preferredOnly;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-5">
              <h2 className="font-semibold text-foreground mb-4">Filters</h2>
              <MarketplaceFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Solution Marketplace
                </h1>
                <p className="text-muted-foreground mt-1">
                  {filteredStartups.length} vetted health tech{" "}
                  {filteredStartups.length === 1 ? "company" : "companies"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Filter size={16} className="mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] overflow-y-auto">
                    <SheetTitle className="font-semibold mb-4">Filters</SheetTitle>
                    <MarketplaceFilters
                      filters={filters}
                      onFiltersChange={setFilters}
                    />
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger className="w-[180px]">
                    <ArrowUpDown size={14} className="mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results */}
            {filteredStartups.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-xl">
                <p className="text-muted-foreground">
                  No companies match your filters.
                </p>
                <Button
                  variant="link"
                  className="mt-2 text-cyan"
                  onClick={() =>
                    setFilters({
                      search: "",
                      preferredOnly: false,
                      categories: [],
                      compliance: {
                        hipaa: false,
                        soc2: false,
                        baa: false,
                        ehrIntegration: false,
                      },
                      setting: "all",
                      stages: [],
                      nmConnections: [],
                      deploymentReadiness: [],
                    })
                  }
                >
                  Clear all filters
                </Button>
              </div>
            ) : showSections ? (
              <div className="space-y-8">
                {/* Preferred Network Section */}
                {preferredStartups.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 bg-green rounded-full" />
                      <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Star size={18} className="text-green fill-green" />
                        Preferred Network
                      </h2>
                      <span className="text-sm text-muted-foreground">
                        ({preferredStartups.length})
                      </span>
                    </div>
                    <div className="grid gap-4">
                      {preferredStartups.map((startup) => (
                        <StartupCard key={startup.id} startup={startup} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Divider */}
                {preferredStartups.length > 0 && generalStartups.length > 0 && (
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                  </div>
                )}

                {/* General Directory Section */}
                {generalStartups.length > 0 && (
                  <section>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 bg-muted-foreground rounded-full" />
                      <h2 className="text-lg font-semibold text-foreground">
                        General Directory
                      </h2>
                      <span className="text-sm text-muted-foreground">
                        ({generalStartups.length})
                      </span>
                    </div>
                    <div className="grid gap-4">
                      {generalStartups.map((startup) => (
                        <StartupCard key={startup.id} startup={startup} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredStartups.map((startup) => (
                  <StartupCard key={startup.id} startup={startup} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
