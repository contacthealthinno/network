"use client";

import { Star } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface TierToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function TierToggle({ checked, onCheckedChange }: TierToggleProps) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
        checked
          ? "bg-green-light border-green shadow-sm shadow-green/20"
          : "bg-background border-border"
      }`}
    >
      <Switch
        id="preferred-toggle"
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-green"
      />
      <Label
        htmlFor="preferred-toggle"
        className={`flex items-center gap-2 cursor-pointer font-medium ${
          checked ? "text-green-700 dark:text-green-300" : "text-foreground"
        }`}
      >
        <Star
          size={16}
          className={checked ? "fill-green text-green" : "text-muted-foreground"}
        />
        Preferred Network only
      </Label>
    </div>
  );
}
