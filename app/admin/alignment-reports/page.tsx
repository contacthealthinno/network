"use client";

import { useState } from "react";
import {
  FileText,
  Plus,
  Search,
  Building2,
  Calendar,
  Download,
  Eye,
  Edit,
  Trash2,
  Check,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { startups, healthcareOrgs } from "@/lib/data";

const preferredStartups = startups.filter((s) => s.tier === "preferred");

// Mock alignment reports
const alignmentReports = [
  {
    id: "1",
    startupId: "remote-patient-hub",
    startupName: "RemotePatient Hub",
    orgId: "unm-health",
    orgName: "UNM Health System",
    status: "completed" as const,
    createdAt: "2024-01-15",
    completedAt: "2024-01-20",
    priorities: ["Rural Access", "Medicaid Cost Reduction"],
    score: 92,
  },
  {
    id: "2",
    startupId: "behavioral-bridge",
    startupName: "BehavioralBridge",
    orgId: "pres-healthcare",
    orgName: "Presbyterian Healthcare",
    status: "in-progress" as const,
    createdAt: "2024-02-01",
    completedAt: null,
    priorities: ["BH Integration", "Population Health"],
    score: null,
  },
  {
    id: "3",
    startupId: "careconnect-ai",
    startupName: "CareConnect AI",
    orgId: "christus-nm",
    orgName: "CHRISTUS St. Vincent",
    status: "draft" as const,
    createdAt: "2024-02-10",
    completedAt: null,
    priorities: ["Care Coordination"],
    score: null,
  },
];

const STATUS_STYLES = {
  draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  "in-progress": { label: "In Progress", className: "bg-cyan-light text-cyan-700" },
  completed: { label: "Completed", className: "bg-green-light text-green-700" },
};

const NM_PRIORITIES = [
  "Rural Access",
  "BH Integration",
  "Medicaid Cost Reduction",
  "Population Health",
  "Care Coordination",
  "Tribal Health",
  "Maternal Health",
  "SDOH Screening",
];

export default function AlignmentReportsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [builderOpen, setBuilderOpen] = useState(false);
  const [builderForm, setBuilderForm] = useState({
    startupId: "",
    orgId: "",
    priorities: [] as string[],
    summary: "",
    compliance: "",
    pilotFit: "",
    recommendation: "",
  });

  const filteredReports = alignmentReports.filter((r) => {
    const matchesSearch =
      r.startupName.toLowerCase().includes(search.toLowerCase()) ||
      r.orgName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const togglePriority = (priority: string) => {
    setBuilderForm((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(priority)
        ? prev.priorities.filter((p) => p !== priority)
        : [...prev.priorities, priority],
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Alignment Report Builder
          </h1>
          <p className="text-muted-foreground mt-1">
            Create and manage alignment reports for healthcare organizations
          </p>
        </div>
        <Button
          className="bg-green hover:bg-green/90 text-white"
          onClick={() => {
            setBuilderForm({
              startupId: "",
              orgId: "",
              priorities: [],
              summary: "",
              compliance: "",
              pilotFit: "",
              recommendation: "",
            });
            setBuilderOpen(true);
          }}
        >
          <Plus size={16} className="mr-2" />
          New Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {alignmentReports.length}
            </p>
            <p className="text-sm text-muted-foreground">Total Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green">
              {alignmentReports.filter((r) => r.status === "completed").length}
            </p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-cyan">
              {alignmentReports.filter((r) => r.status === "in-progress").length}
            </p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-muted-foreground">
              {alignmentReports.filter((r) => r.status === "draft").length}
            </p>
            <p className="text-sm text-muted-foreground">Drafts</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <Input
                placeholder="Search by startup or organization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Startup</TableHead>
                <TableHead>Healthcare Organization</TableHead>
                <TableHead>NM Priorities</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-green" />
                      <span className="font-medium">{report.startupName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-muted-foreground" />
                      {report.orgName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {report.priorities.map((p) => (
                        <Badge key={p} variant="outline" className="text-xs">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={STATUS_STYLES[report.status].className}>
                      {STATUS_STYLES[report.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {report.score !== null ? (
                      <span className="font-semibold text-green">
                        {report.score}/100
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" title="View">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Edit size={16} />
                      </Button>
                      {report.status === "completed" && (
                        <Button variant="ghost" size="icon" title="Download PDF">
                          <Download size={16} />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Report Builder Dialog */}
      <Dialog open={builderOpen} onOpenChange={setBuilderOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Alignment Report</DialogTitle>
            <DialogDescription>
              Build a custom alignment report matching a Preferred Network startup
              to a healthcare organization&apos;s priorities.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Startup Selection */}
            <div className="space-y-2">
              <Label>Preferred Startup</Label>
              <Select
                value={builderForm.startupId}
                onValueChange={(v) =>
                  setBuilderForm({ ...builderForm, startupId: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a startup..." />
                </SelectTrigger>
                <SelectContent>
                  {preferredStartups.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Organization Selection */}
            <div className="space-y-2">
              <Label>Healthcare Organization</Label>
              <Select
                value={builderForm.orgId}
                onValueChange={(v) =>
                  setBuilderForm({ ...builderForm, orgId: v })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an organization..." />
                </SelectTrigger>
                <SelectContent>
                  {healthcareOrgs.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* NM Priorities */}
            <div className="space-y-3">
              <Label>NM Healthcare Priorities Addressed</Label>
              <div className="grid grid-cols-2 gap-2">
                {NM_PRIORITIES.map((priority) => (
                  <div
                    key={priority}
                    className="flex items-center gap-2"
                  >
                    <Checkbox
                      id={priority}
                      checked={builderForm.priorities.includes(priority)}
                      onCheckedChange={() => togglePriority(priority)}
                    />
                    <Label
                      htmlFor={priority}
                      className="cursor-pointer text-sm font-normal"
                    >
                      {priority}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-2">
              <Label htmlFor="summary">Executive Summary</Label>
              <Textarea
                id="summary"
                value={builderForm.summary}
                onChange={(e) =>
                  setBuilderForm({ ...builderForm, summary: e.target.value })
                }
                placeholder="Brief summary of why this startup aligns with the organization's needs..."
                rows={3}
              />
            </div>

            {/* Compliance Assessment */}
            <div className="space-y-2">
              <Label htmlFor="compliance">Compliance Assessment</Label>
              <Textarea
                id="compliance"
                value={builderForm.compliance}
                onChange={(e) =>
                  setBuilderForm({ ...builderForm, compliance: e.target.value })
                }
                placeholder="Summary of compliance status (HIPAA, SOC2, BAA, EHR integrations)..."
                rows={3}
              />
            </div>

            {/* Pilot Fit */}
            <div className="space-y-2">
              <Label htmlFor="pilotFit">Pilot Fit Analysis</Label>
              <Textarea
                id="pilotFit"
                value={builderForm.pilotFit}
                onChange={(e) =>
                  setBuilderForm({ ...builderForm, pilotFit: e.target.value })
                }
                placeholder="Analysis of how well this startup's pilot format fits the organization..."
                rows={3}
              />
            </div>

            {/* Recommendation */}
            <div className="space-y-2">
              <Label htmlFor="recommendation">HealthInno Recommendation</Label>
              <Textarea
                id="recommendation"
                value={builderForm.recommendation}
                onChange={(e) =>
                  setBuilderForm({
                    ...builderForm,
                    recommendation: e.target.value,
                  })
                }
                placeholder="HealthInno's official recommendation for this pairing..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setBuilderOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                // Save as draft
                setBuilderOpen(false);
              }}
            >
              Save as Draft
            </Button>
            <Button
              className="bg-green hover:bg-green/90 text-white"
              disabled={!builderForm.startupId || !builderForm.orgId}
              onClick={() => {
                // Generate report
                setBuilderOpen(false);
              }}
            >
              <CheckCircle size={14} className="mr-2" />
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
