import { Category, CATEGORY_LABELS } from "@/lib/types";

interface CategoryPillProps {
  category: Category;
  size?: "sm" | "md";
}

const CATEGORY_COLORS: Record<Category, { bg: string; text: string }> = {
  "extending-care": { bg: "bg-cyan-light", text: "text-cyan-700 dark:text-cyan-300" },
  "health-signals": { bg: "bg-green-light", text: "text-green-700 dark:text-green-300" },
  "data-modeling": { bg: "bg-navy-light", text: "text-navy dark:text-navy-300" },
  "operations-intelligence": { bg: "bg-amber-50 dark:bg-amber-950", text: "text-amber-700 dark:text-amber-300" },
  "immersive-training": { bg: "bg-purple-50 dark:bg-purple-950", text: "text-purple-700 dark:text-purple-300" },
  "next-gen-decisions": { bg: "bg-rose-50 dark:bg-rose-950", text: "text-rose-700 dark:text-rose-300" },
};

export function CategoryPill({ category, size = "md" }: CategoryPillProps) {
  const colors = CATEGORY_COLORS[category];
  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${colors.bg} ${colors.text} ${sizeClasses}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
