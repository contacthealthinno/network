"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Beaker,
  Calendar,
  Users,
  Target,
  FileText,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  FileSignature,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface Pilot {
  id: string;
  startupId: string;
  startupName: string;
  startupSlug: string;
  status: "mou-pending" | "active" | "completed" | "paused";
  startDate: string;
  endDate?: string;
  duration: string;
  population: string;
  metrics: string[];
  progress: number;
  mouSigned: boolean;
  outcomesReported: boolean;
  notes?: string;
}

const mockPilots: Pilot[] = [
  {
    id: "1",
    startupId: "3",
    startupName: "VoxCare",
    startupSlug: "voxcare",
    status: "active",
    startDate: "2024-09-01",
    duration: "6 months",
    population: "25 providers across 3 clinics",
    metrics: [
      "Documentation time reduction",
      "Provider satisfaction",
      "Note quality audit scores",
    ],
    progress: 65,
    mouSigned: true,
    outcomesReported: false,
    notes: "Weekly check-ins scheduled. Provider adoption exceeding expectations.",
  },
  {
    id: "2",
    startupId: "1",
    startupName: "Amplifier Health",
    startupSlug: "amplifier-health",
    status: "mou-pending",
    startDate: "2024-11-15",
    duration: "4 months",
    population: "100 patients in rural primary care",
    metrics: [
      "Early detection rate",
      "Clinician response time",
      "Patient engagement",
    ],
    progress: 0,
    mouSigned: false,
    outcomesReported: false,
  },
  {
    id: "3",
    startupId: "4",
    startupName: "ReachMD",
    startupSlug: "reachmd",
    status: "completed",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    duration: "6 months",
    population: "500 patients across 5 rural clinics",
    metrics: [
      "Specialty access time",
      "Patient satisfaction",
      "No-show rate",
    ],
    progress: 100,
    mouSigned: true,
    outcomesReported: true,
    notes: "Pilot completed successfully. 60% reduction in referral-to-visit time achieved.",
  },
];

function getStatusBadge(status: Pilot["status"]) {
  switch (status) {
    case "mou-pending":
      return (
        <Badge variant="outline" className="text-amber-600 border-amber-600">
          <FileSignature size={12} className="mr-1" />
          MOU Pending
        </Badge>
      );
    case "active":
      return (
        <Badge className="bg-green text-white">
          <Beaker size={12} className="mr-1" />
          Active
        </Badge>
      );
    case "completed":
      return (
        <Badge variant="outline" className="text-cyan border-cyan">
          <CheckCircle size={12} className="mr-1" />
          Completed
        </Badge>
      );
    case "paused":
      return (
        <Badge variant="outline" className="text-muted-foreground">
          <AlertCircle size={12} className="mr-1" />
          Paused
        </Badge>
      );
  }
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function PilotsPage() {
  const activePilots = mockPilots.filter(
    (p) => p.status === "active" || p.status === "mou-pending"
  );
  const completedPilots = mockPilots.filter((p) => p.status === "completed");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Pilots</h1>
        <p className="text-muted-foreground mt-1">
          Track and manage your active and completed pilot programs
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-navy">{mockPilots.length}</p>
            <p className="text-sm text-muted-foreground">Total Pilots</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-green">
              {activePilots.length}
            </p>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-cyan">
              {completedPilots.length}
            </p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-amber-600">
              {mockPilots.filter((p) => p.status === "mou-pending").length}
            </p>
            <p className="text-sm text-muted-foreground">MOU Pending</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">
            Active & Pending ({activePilots.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedPilots.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activePilots.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <Beaker size={40} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  You don&apos;t have any active pilots yet.
                </p>
                <Button asChild className="bg-green hover:bg-green/90 text-white">
                  <Link href="/marketplace">Browse Solutions</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            activePilots.map((pilot) => (
              <PilotCard key={pilot.id} pilot={pilot} />
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedPilots.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground">
                  No completed pilots yet.
                </p>
              </CardContent>
            </Card>
          ) : (
            completedPilots.map((pilot) => (
              <PilotCard key={pilot.id} pilot={pilot} />
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Three-Party MOU Info */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileSignature size={18} className="text-navy" />
            About the Three-Party MOU
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            All pilots in the Health ImpACT program are governed by a three-party
            Memorandum of Understanding (MOU) between your organization, the
            startup, and HealthInno.
          </p>
          <p>
            The MOU establishes pilot objectives, data sharing protocols, success
            metrics, and responsibilities for all parties. HealthInno facilitates
            the MOU process and provides ongoing support throughout the pilot.
          </p>
          <p>
            Once the MOU is signed by all parties, the pilot status will change
            from &quot;MOU Pending&quot; to &quot;Active&quot; and you can begin
            implementation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function PilotCard({ pilot }: { pilot: Pilot }) {
  return (
    <Card
      className={
        pilot.status === "mou-pending"
          ? "border-amber-200 bg-amber-50/30"
          : pilot.status === "active"
          ? "border-l-4 border-l-green"
          : ""
      }
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 rounded-lg bg-navy shrink-0">
            <AvatarFallback className="rounded-lg bg-navy text-white font-semibold text-sm">
              {getInitials(pilot.startupName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    href={`/marketplace/${pilot.startupSlug}`}
                    className="font-semibold text-foreground hover:text-navy"
                  >
                    {pilot.startupName}
                  </Link>
                  {getStatusBadge(pilot.status)}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    Started {new Date(pilot.startDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {pilot.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {pilot.population}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {pilot.status === "mou-pending" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                        <FileSignature size={14} className="mr-1.5" />
                        Review MOU
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Three-Party MOU</DialogTitle>
                        <DialogDescription>
                          Review and sign the Memorandum of Understanding for
                          your pilot with {pilot.startupName}.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle
                            size={18}
                            className="text-green shrink-0"
                          />
                          <span className="text-sm">
                            HealthInno has signed the MOU
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle
                            size={18}
                            className="text-green shrink-0"
                          />
                          <span className="text-sm">
                            {pilot.startupName} has signed the MOU
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-[18px] h-[18px] rounded-full border-2 border-amber-600 shrink-0" />
                          <span className="text-sm">
                            Awaiting your signature
                          </span>
                        </div>
                        <Button className="w-full bg-green hover:bg-green/90 text-white mt-4">
                          Sign MOU
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                {pilot.status === "active" && (
                  <Button variant="outline" size="sm">
                    <FileText size={14} className="mr-1.5" />
                    View Details
                  </Button>
                )}
                {pilot.status === "completed" && pilot.outcomesReported && (
                  <Button variant="outline" size="sm">
                    <Target size={14} className="mr-1.5" />
                    View Outcomes
                  </Button>
                )}
              </div>
            </div>

            {/* Progress for active pilots */}
            {pilot.status === "active" && (
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pilot Progress</span>
                  <span className="font-medium text-foreground">
                    {pilot.progress}%
                  </span>
                </div>
                <Progress value={pilot.progress} className="h-2" />
              </div>
            )}

            {/* Metrics */}
            <div className="mb-3">
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                Success Metrics
              </p>
              <div className="flex flex-wrap gap-1.5">
                {pilot.metrics.map((metric, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="text-xs font-normal"
                  >
                    <Target size={10} className="mr-1" />
                    {metric}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Notes */}
            {pilot.notes && (
              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground">{pilot.notes}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
