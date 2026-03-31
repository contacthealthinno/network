import { Check, Minus } from "lucide-react";

interface ComplianceBadgeProps {
  label: string;
  verified: boolean;
  size?: "sm" | "md";
}

export function ComplianceBadge({ label, verified, size = "sm" }: ComplianceBadgeProps) {
  const sizeClasses = size === "sm" ? "text-xs px-1.5 py-0.5 gap-1" : "text-sm px-2 py-1 gap-1.5";
  const iconSize = size === "sm" ? 10 : 12;

  if (verified) {
    return (
      <span
        className={`inline-flex items-center font-medium rounded bg-green-light text-green-700 dark:text-green-300 ${sizeClasses}`}
      >
        <Check size={iconSize} className="text-green" />
        {label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded bg-muted text-muted-foreground ${sizeClasses}`}
    >
      <Minus size={iconSize} />
      {label}
    </span>
  );
}
