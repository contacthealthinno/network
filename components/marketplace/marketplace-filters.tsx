"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TierToggle } from "./tier-toggle";
import { Category, Stage, NMConnection, DeploymentReadiness, CATEGORY_LABELS, STAGE_LABELS, NM_CONNECTION_LABELS, DEPLOYMENT_READINESS_LABELS } from "@/lib/types";

export interface FilterState {
  search: string;
  preferredOnly: boolean;
  categories: Category[];
  compliance: {
    hipaa: boolean;
    soc2: boolean;
    baa: boolean;
    ehrIntegration: boolean;
  };
  setting: "all" | "rural" | "urban" | "both";
  stages: Stage[];
  nmConnections: NMConnection[];
  deploymentReadiness: DeploymentReadiness[];
}

interface MarketplaceFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "extending-care", label: CATEGORY_LABELS["extending-care"] },
  { value: "health-signals", label: CATEGORY_LABELS["health-signals"] },
  { value: "data-modeling", label: CATEGORY_LABELS["data-modeling"] },
  { value: "operations-intelligence", label: CATEGORY_LABELS["operations-intelligence"] },
  { value: "immersive-training", label: CATEGORY_LABELS["immersive-training"] },
  { value: "next-gen-decisions", label: CATEGORY_LABELS["next-gen-decisions"] },
];

const STAGES: { value: Stage; label: string }[] = [
  { value: "pre-seed", label: STAGE_LABELS["pre-seed"] },
  { value: "seed", label: STAGE_LABELS["seed"] },
  { value: "series-a", label: STAGE_LABELS["series-a"] },
  { value: "series-b-plus", label: STAGE_LABELS["series-b-plus"] },
  { value: "revenue", label: STAGE_LABELS["revenue"] },
];

const NM_CONNECTIONS: { value: NMConnection; label: string }[] = [
  { value: "nm-based", label: NM_CONNECTION_LABELS["nm-based"] },
  { value: "national-nm-customers", label: NM_CONNECTION_LABELS["national-nm-customers"] },
  { value: "national-seeking", label: NM_CONNECTION_LABELS["national-seeking"] },
  { value: "university-spinout", label: NM_CONNECTION_LABELS["university-spinout"] },
];

const DEPLOYMENT_OPTIONS: { value: DeploymentReadiness; label: string }[] = [
  { value: "pilot-ready-now", label: DEPLOYMENT_READINESS_LABELS["pilot-ready-now"] },
  { value: "q2-2026", label: DEPLOYMENT_READINESS_LABELS["q2-2026"] },
  { value: "q3-2026", label: DEPLOYMENT_READINESS_LABELS["q3-2026"] },
  { value: "q4-2026", label: DEPLOYMENT_READINESS_LABELS["q4-2026"] },
];

export function MarketplaceFilters({ filters, onFiltersChange }: MarketplaceFiltersProps) {
  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleCategory = (category: Category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const toggleStage = (stage: Stage) => {
    const newStages = filters.stages.includes(stage)
      ? filters.stages.filter((s) => s !== stage)
      : [...filters.stages, stage];
    updateFilters({ stages: newStages });
  };

  const toggleNMConnection = (connection: NMConnection) => {
    const newConnections = filters.nmConnections.includes(connection)
      ? filters.nmConnections.filter((c) => c !== connection)
      : [...filters.nmConnections, connection];
    updateFilters({ nmConnections: newConnections });
  };

  const toggleDeploymentReadiness = (readiness: DeploymentReadiness) => {
    const newReadiness = filters.deploymentReadiness.includes(readiness)
      ? filters.deploymentReadiness.filter((r) => r !== readiness)
      : [...filters.deploymentReadiness, readiness];
    updateFilters({ deploymentReadiness: newReadiness });
  };

  const toggleCompliance = (key: keyof FilterState["compliance"]) => {
    updateFilters({
      compliance: {
        ...filters.compliance,
        [key]: !filters.compliance[key],
      },
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
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
  };

  const hasActiveFilters =
    filters.search ||
    filters.preferredOnly ||
    filters.categories.length > 0 ||
    filters.compliance.hipaa ||
    filters.compliance.soc2 ||
    filters.compliance.baa ||
    filters.compliance.ehrIntegration ||
    filters.setting !== "all" ||
    filters.stages.length > 0 ||
    filters.nmConnections.length > 0 ||
    filters.deploymentReadiness.length > 0;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          type="text"
          placeholder="Search companies..."
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className="pl-10"
        />
      </div>

      {/* Preferred Toggle */}
      <TierToggle
        checked={filters.preferredOnly}
        onCheckedChange={(checked) => updateFilters({ preferredOnly: checked })}
      />

      <Separator />

      {/* Technology Category */}
      <div>
        <h4 className="font-semibold text-sm text-foreground mb-3">Technology Category</h4>
        <div className="space-y-2.5">
          {CATEGORIES.map((cat) => (
            <div key={cat.value} className="flex items-start gap-2.5">
              <Checkbox
                id={`cat-${cat.value}`}
                checked={filters.categories.includes(cat.value)}
                onCheckedChange={() => toggleCategory(cat.value)}
              />
              <Label
                htmlFor={`cat-${cat.value}`}
                className="text-sm text-muted-foreground leading-tight cursor-pointer hover:text-foreground transition-colors"
              >
                {cat.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Compliance */}
      <div>
        <h4 className="font-semibold text-sm text-foreground mb-3">Compliance</h4>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="compliance-hipaa"
              checked={filters.compliance.hipaa}
              onCheckedChange={() => toggleCompliance("hipaa")}
            />
            <Label
              htmlFor="compliance-hipaa"
              className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            >
              HIPAA Compliant
            </Label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="compliance-soc2"
              checked={filters.compliance.soc2}
              onCheckedChange={() => toggleCompliance("soc2")}
            />
            <Label
              htmlFor="compliance-soc2"
              className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            >
              SOC 2 Certified
            </Label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="compliance-baa"
              checked={filters.compliance.baa}
              onCheckedChange={() => toggleCompliance("baa")}
            />
            <Label
              htmlFor="compliance-baa"
              className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            >
              BAA Available
            </Label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="compliance-ehr"
              checked={filters.compliance.ehrIntegration}
              onCheckedChange={() => toggleCompliance("ehrIntegration")}
            />
            <Label
              htmlFor="compliance-ehr"
              className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            >
              EHR Integration
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      {/* NM Connection */}
      <div>
        <h4 className="font-semibold text-sm text-foreground mb-3">NM Connection</h4>
        <div className="space-y-2.5">
          {NM_CONNECTIONS.map((connection) => (
            <div key={connection.value} className="flex items-start gap-2.5">
              <Checkbox
                id={`nm-${connection.value}`}
                checked={filters.nmConnections.includes(connection.value)}
                onCheckedChange={() => toggleNMConnection(connection.value)}
              />
              <Label
                htmlFor={`nm-${connection.value}`}
                className="text-sm text-muted-foreground leading-tight cursor-pointer hover:text-foreground transition-colors"
              >
                {connection.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Deployment Readiness */}
      <div>
        <h4 className="font-semibold text-sm text-foreground mb-3">Deployment Readiness</h4>
        <div className="space-y-2.5">
          {DEPLOYMENT_OPTIONS.map((option) => (
            <div key={option.value} className="flex items-center gap-2.5">
              <Checkbox
                id={`deploy-${option.value}`}
                checked={filters.deploymentReadiness.includes(option.value)}
                onCheckedChange={() => toggleDeploymentReadiness(option.value)}
              />
              <Label
                htmlFor={`deploy-${option.value}`}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Setting */}
      <div>
        <h4 className="font-semibold text-sm text-foreground mb-3">Setting</h4>
        <div className="space-y-2.5">
          {[
            { value: "all", label: "All Settings" },
            { value: "rural", label: "Rural-feasible" },
            { value: "urban", label: "Urban" },
            { value: "both", label: "Both" },
          ].map((option) => (
            <div key={option.value} className="flex items-center gap-2.5">
              <Checkbox
                id={`setting-${option.value}`}
                checked={filters.setting === option.value}
                onCheckedChange={() =>
                  updateFilters({ setting: option.value as FilterState["setting"] })
                }
              />
              <Label
                htmlFor={`setting-${option.value}`}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Stage */}
      <div>
        <h4 className="font-semibold text-sm text-foreground mb-3">Stage</h4>
        <div className="space-y-2.5">
          {STAGES.map((stage) => (
            <div key={stage.value} className="flex items-center gap-2.5">
              <Checkbox
                id={`stage-${stage.value}`}
                checked={filters.stages.includes(stage.value)}
                onCheckedChange={() => toggleStage(stage.value)}
              />
              <Label
                htmlFor={`stage-${stage.value}`}
                className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              >
                {stage.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear All */}
      {hasActiveFilters && (
        <>
          <Separator />
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="w-full text-muted-foreground hover:text-destructive"
          >
            <X size={14} className="mr-1.5" />
            Clear all filters
          </Button>
        </>
      )}
    </div>
  );
}
