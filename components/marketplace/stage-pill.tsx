import { Stage, STAGE_LABELS } from "@/lib/types";

interface StagePillProps {
  stage: Stage;
  size?: "sm" | "md";
}

export function StagePill({ stage, size = "sm" }: StagePillProps) {
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full bg-muted text-muted-foreground ${sizeClasses}`}
    >
      {STAGE_LABELS[stage]}
    </span>
  );
}
