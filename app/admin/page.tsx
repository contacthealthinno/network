"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  MoreHorizontal,
  Star,
  Check,
  X,
  ExternalLink,
  ArrowUpDown,
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
import { startups } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/types";

type Status = "applied" | "under-review" | "general" | "preferred" | "rejected";

const STATUS_STYLES: Record<Status, { label: string; className: string }> = {
  applied: { label: "Applied", className: "bg-amber-50 text-amber-700" },
  "under-review": {
    label: "Under Review",
    className: "bg-cyan-light text-cyan-700",
  },
  general: { label: "General", className: "bg-muted text-muted-foreground" },
  preferred: { label: "Preferred", className: "bg-green-light text-green-700" },
  rejected: { label: "Rejected", className: "bg-red-50 text-red-700" },
};

// Transform startups data for admin view
const adminStartups = startups.map((s) => ({
  ...s,
  status: s.tier === "preferred" ? "preferred" : "general",
}));

export default function AdminStartupsPage() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [promoteDialogOpen, setPromoteDialogOpen] = useState(false);
  const [promoteTarget, setPromoteTarget] = useState<string | null>(null);
  const [promoteForm, setPromoteForm] = useState({
    advisoryReviewed: false,
    pilotCount: "",
    notes: "",
  });

  const filteredStartups = adminStartups.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tagline.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredStartups.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStartups.map((s) => s.id));
    }
  };

  const openPromoteDialog = (id: string) => {
    setPromoteTarget(id);
    setPromoteForm({ advisoryReviewed: false, pilotCount: "", notes: "" });
    setPromoteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Startup Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Review and manage startup applications and listings
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {adminStartups.length}
            </p>
            <p className="text-sm text-muted-foreground">Total Startups</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green">
              {adminStartups.filter((s) => s.status === "preferred").length}
            </p>
            <p className="text-sm text-muted-foreground">Preferred</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">
              {adminStartups.filter((s) => s.status === "general").length}
            </p>
            <p className="text-sm text-muted-foreground">General</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">0</p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
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
                placeholder="Search startups..."
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
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="preferred">Preferred</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground">
                {selectedIds.length} selected
              </span>
              <Button variant="outline" size="sm">
                Move to Directory
              </Button>
              <Button variant="outline" size="sm" className="text-green">
                <Star size={14} className="mr-1" />
                Promote to Preferred
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-destructive"
              >
                Reject
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
                      selectedIds.length === filteredStartups.length &&
                      filteredStartups.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStartups.map((startup) => (
                <TableRow key={startup.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(startup.id)}
                      onCheckedChange={() => toggleSelect(startup.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <Link
                        href={`/marketplace/${startup.slug}`}
                        className="font-medium text-foreground hover:text-navy"
                      >
                        {startup.name}
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {startup.tagline}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {CATEGORY_LABELS[startup.category]}
                    </span>
                  </TableCell>
                  <TableCell className="capitalize text-sm">
                    {startup.stage.replace("-", " ")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        STATUS_STYLES[startup.status as Status].className
                      }
                    >
                      {startup.status === "preferred" && (
                        <Star size={12} className="mr-1 fill-current" />
                      )}
                      {STATUS_STYLES[startup.status as Status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(startup.appliedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/marketplace/${startup.slug}`}>
                            <ExternalLink size={14} className="mr-2" />
                            View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {startup.status !== "preferred" && (
                          <DropdownMenuItem
                            onClick={() => openPromoteDialog(startup.id)}
                            className="text-green"
                          >
                            <Star size={14} className="mr-2" />
                            Promote to Preferred
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <Check size={14} className="mr-2" />
                          Move to Directory
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <X size={14} className="mr-2" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Promote Dialog */}
      <Dialog open={promoteDialogOpen} onOpenChange={setPromoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Promote to Preferred Network</DialogTitle>
            <DialogDescription>
              Promote this startup to the HealthInno Preferred Network. This
              requires Advisory Council review and completed pilot(s).
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="advisory"
                checked={promoteForm.advisoryReviewed}
                onCheckedChange={(checked) =>
                  setPromoteForm({ ...promoteForm, advisoryReviewed: !!checked })
                }
              />
              <Label htmlFor="advisory" className="cursor-pointer">
                Advisory Council has reviewed and approved
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pilotCount">Pilots Completed</Label>
              <Input
                id="pilotCount"
                type="number"
                min="1"
                value={promoteForm.pilotCount}
                onChange={(e) =>
                  setPromoteForm({ ...promoteForm, pilotCount: e.target.value })
                }
                placeholder="Number of completed pilots"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Advisory Council Notes</Label>
              <Textarea
                id="notes"
                value={promoteForm.notes}
                onChange={(e) =>
                  setPromoteForm({ ...promoteForm, notes: e.target.value })
                }
                placeholder="Notes from the Advisory Council review..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPromoteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-green hover:bg-green/90 text-white"
              disabled={
                !promoteForm.advisoryReviewed || !promoteForm.pilotCount
              }
              onClick={() => {
                // In real app, would update the startup
                setPromoteDialogOpen(false);
              }}
            >
              <Star size={14} className="mr-2" />
              Promote to Preferred
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
