"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MoreHorizontal,
  Mail,
  FileText,
  ExternalLink,
  Building,
  Target,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

type OrgStatus = "active" | "pending" | "inactive";

interface HealthcareOrg {
  id: string;
  name: string;
  type: string;
  contactName: string;
  contactEmail: string;
  status: OrgStatus;
  priorityCount: number;
  watchlistCount: number;
  activePilots: number;
  alignmentReports: number;
  joinedAt: string;
}

const mockOrgs: HealthcareOrg[] = [
  {
    id: "1",
    name: "Presbyterian Healthcare Services",
    type: "Health System",
    contactName: "Dr. Angela Rivera",
    contactEmail: "arivera@phs.org",
    status: "active",
    priorityCount: 2,
    watchlistCount: 5,
    activePilots: 1,
    alignmentReports: 3,
    joinedAt: "2024-03-15",
  },
  {
    id: "2",
    name: "UNM Health",
    type: "Academic Medical Center",
    contactName: "Dr. Michael Thompson",
    contactEmail: "mthompson@salud.unm.edu",
    status: "active",
    priorityCount: 1,
    watchlistCount: 3,
    activePilots: 1,
    alignmentReports: 2,
    joinedAt: "2024-02-01",
  },
  {
    id: "3",
    name: "First Nations Community HealthSource",
    type: "FQHC",
    contactName: "Maria Sanchez",
    contactEmail: "msanchez@fnch.org",
    status: "active",
    priorityCount: 1,
    watchlistCount: 2,
    activePilots: 0,
    alignmentReports: 1,
    joinedAt: "2024-04-01",
  },
  {
    id: "4",
    name: "Lovelace Health System",
    type: "Health System",
    contactName: "Dr. Robert Chen",
    contactEmail: "rchen@lovelace.com",
    status: "pending",
    priorityCount: 0,
    watchlistCount: 0,
    activePilots: 0,
    alignmentReports: 0,
    joinedAt: "2024-10-15",
  },
];

const STATUS_STYLES: Record<OrgStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-green-light text-green-700" },
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  inactive: { label: "Inactive", className: "bg-muted text-muted-foreground" },
};

export default function AdminOrgsPage() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sendReportDialogOpen, setSendReportDialogOpen] = useState(false);
  const [sendReportTarget, setSendReportTarget] = useState<HealthcareOrg | null>(null);
  const [reportForm, setReportForm] = useState({
    startupId: "",
    message: "",
  });

  const filteredOrgs = mockOrgs.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(search.toLowerCase()) ||
      org.contactName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || org.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOrgs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredOrgs.map((o) => o.id));
    }
  };

  const openSendReportDialog = (org: HealthcareOrg) => {
    setSendReportTarget(org);
    setReportForm({ startupId: "", message: "" });
    setSendReportDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Healthcare Org Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage participating healthcare organizations and their engagement
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {mockOrgs.length}
            </p>
            <p className="text-sm text-muted-foreground">Total Organizations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green">
              {mockOrgs.filter((o) => o.status === "active").length}
            </p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-cyan">
              {mockOrgs.reduce((sum, o) => sum + o.activePilots, 0)}
            </p>
            <p className="text-sm text-muted-foreground">Active Pilots</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">
              {mockOrgs.filter((o) => o.status === "pending").length}
            </p>
            <p className="text-sm text-muted-foreground">Pending Approval</p>
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
                placeholder="Search organizations..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground">
                {selectedIds.length} selected
              </span>
              <Button variant="outline" size="sm">
                <Mail size={14} className="mr-1" />
                Send Bulk Email
              </Button>
              <Button variant="outline" size="sm" className="text-green">
                <FileText size={14} className="mr-1" />
                Generate Reports
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedIds.length === filteredOrgs.length &&
                      filteredOrgs.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrgs.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(org.id)}
                      onCheckedChange={() => toggleSelect(org.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-navy-light rounded-lg">
                        <Building size={16} className="text-navy" />
                      </div>
                      <span className="font-medium text-foreground">
                        {org.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{org.type}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{org.contactName}</p>
                      <p className="text-xs text-muted-foreground">
                        {org.contactEmail}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={STATUS_STYLES[org.status].className}>
                      {STATUS_STYLES[org.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Target size={12} />
                        {org.priorityCount} priorities
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText size={12} />
                        {org.alignmentReports} reports
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(org.joinedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <ExternalLink size={14} className="mr-2" />
                          View Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Target size={14} className="mr-2" />
                          View Priorities
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => openSendReportDialog(org)}
                          className="text-green"
                        >
                          <FileText size={14} className="mr-2" />
                          Send Alignment Report
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail size={14} className="mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        {org.status === "pending" && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-green">
                              Approve Membership
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Send Alignment Report Dialog */}
      <Dialog
        open={sendReportDialogOpen}
        onOpenChange={setSendReportDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Alignment Report</DialogTitle>
            <DialogDescription>
              Send an Alignment Report to {sendReportTarget?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="startup">Select Startup</Label>
              <Select
                value={reportForm.startupId}
                onValueChange={(value) =>
                  setReportForm({ ...reportForm, startupId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a Preferred startup..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Amplifier Health</SelectItem>
                  <SelectItem value="2">ClearPath Analytics</SelectItem>
                  <SelectItem value="3">VoxCare</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Personalized Message (Optional)</Label>
              <Textarea
                id="message"
                value={reportForm.message}
                onChange={(e) =>
                  setReportForm({ ...reportForm, message: e.target.value })
                }
                placeholder="Add a personalized message to include with the report..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSendReportDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green hover:bg-green/90 text-white"
              disabled={!reportForm.startupId}
              onClick={() => {
                setSendReportDialogOpen(false);
              }}
            >
              <FileText size={14} className="mr-2" />
              Send Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
