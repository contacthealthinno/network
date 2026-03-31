"use client";

import { Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PreferredBadgeProps {
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

export function PreferredBadge({ size = "md", showTooltip = true }: PreferredBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-2.5 py-1 gap-1.5",
    lg: "text-base px-3 py-1.5 gap-2",
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const badge = (
    <span
      className={`inline-flex items-center font-semibold bg-green text-white rounded-full ${sizeClasses[size]}`}
    >
      <Star className="fill-current" size={iconSizes[size]} />
      HealthInno Preferred
    </span>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent className="max-w-xs text-sm">
          <p>
            HealthInno Preferred companies have passed Advisory Council review
            and completed at least one Health ImpACT pilot.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
