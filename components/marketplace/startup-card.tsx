"use client";

import Link from "next/link";
import { TreePine, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PreferredBadge } from "./preferred-badge";
import { CategoryPill } from "./category-pill";
import { ComplianceBadge } from "./compliance-badge";
import { StagePill } from "./stage-pill";
import { Startup } from "@/lib/types";

interface StartupCardProps {
  startup: Startup;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function StartupCard({ startup }: StartupCardProps) {
  const isPreferred = startup.tier === "preferred";

  return (
    <Card
      className={`relative transition-all hover:shadow-md ${
        isPreferred
          ? "border-l-4 border-l-green bg-green-light/30"
          : "hover:border-border/80"
      }`}
    >
      {isPreferred && (
        <div className="absolute top-3 right-3">
          <PreferredBadge size="sm" />
        </div>
      )}

      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 rounded-lg bg-navy-light">
            <AvatarFallback className="rounded-lg bg-navy text-white font-semibold text-sm">
              {getInitials(startup.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-base leading-tight mb-1 pr-24">
              {startup.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {startup.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <CategoryPill category={startup.category} size="sm" />
              <StagePill stage={startup.stage} size="sm" />
              {startup.ruralFeasible && (
                <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 dark:text-green-300 bg-green-light px-2 py-0.5 rounded-full">
                  <TreePine size={12} />
                  Rural
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-4">
              <ComplianceBadge label="HIPAA" verified={startup.compliance.hipaa} />
              <ComplianceBadge label="SOC2" verified={startup.compliance.soc2} />
              <ComplianceBadge label="BAA" verified={startup.compliance.baa} />
            </div>

            {isPreferred && startup.pilotsCompleted > 0 && (
              <p className="text-sm font-medium text-green mb-4">
                {startup.pilotsCompleted} pilot{startup.pilotsCompleted > 1 ? "s" : ""} completed
              </p>
            )}

            <div className="flex items-center gap-2">
              {isPreferred && (
                <Button size="sm" className="bg-green hover:bg-green/90 text-white">
                  <FileText size={14} className="mr-1.5" />
                  Request Alignment Report
                </Button>
              )}
              <Button
                variant={isPreferred ? "outline" : "outline"}
                size="sm"
                asChild
                className={isPreferred ? "" : "border-navy text-navy hover:bg-navy hover:text-white"}
              >
                <Link href={`/marketplace/${startup.slug}`}>
                  View Profile
                  <ArrowRight size={14} className="ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
