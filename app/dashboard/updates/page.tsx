"use client";

import { Bell, Calendar, Users, Beaker, FileText, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Update {
  id: string;
  type: "announcement" | "event" | "new-startup" | "report" | "pilot";
  title: string;
  description: string;
  date: string;
  isNew: boolean;
  link?: string;
}

const updates: Update[] = [
  {
    id: "1",
    type: "announcement",
    title: "Q1 2024 Advisory Council Selections",
    description:
      "The Advisory Council has completed their Q1 review. Three new startups have been promoted to the Preferred Network.",
    date: "2024-03-15",
    isNew: true,
  },
  {
    id: "2",
    type: "event",
    title: "Health ImpACT Spring Convening",
    description:
      "Join us for our quarterly convening featuring demos from Preferred Network startups and networking with healthcare leaders across NM.",
    date: "2024-04-10",
    isNew: true,
    link: "/dashboard",
  },
  {
    id: "3",
    type: "new-startup",
    title: "New Preferred Startup: Amplifier Health",
    description:
      "Amplifier Health has been promoted to the Preferred Network following successful Advisory Council review and pilot completion.",
    date: "2024-03-01",
    isNew: false,
  },
  {
    id: "4",
    type: "report",
    title: "Your Alignment Report is Ready",
    description:
      "A new Alignment Report for ClearPath Analytics has been prepared based on your Rural Specialty Access priority.",
    date: "2024-02-28",
    isNew: false,
    link: "/dashboard/reports",
  },
  {
    id: "5",
    type: "pilot",
    title: "Pilot Milestone: VoxCare at 50%",
    description:
      "Your VoxCare pilot has reached the 50% milestone. Interim metrics are available for review.",
    date: "2024-02-15",
    isNew: false,
    link: "/dashboard/pilots",
  },
];

function getIcon(type: Update["type"]) {
  switch (type) {
    case "announcement":
      return <Bell size={16} className="text-navy" />;
    case "event":
      return <Calendar size={16} className="text-cyan" />;
    case "new-startup":
      return <Users size={16} className="text-green" />;
    case "report":
      return <FileText size={16} className="text-navy" />;
    case "pilot":
      return <Beaker size={16} className="text-green" />;
  }
}

function getTypeLabel(type: Update["type"]) {
  switch (type) {
    case "announcement":
      return "Announcement";
    case "event":
      return "Upcoming Event";
    case "new-startup":
      return "New Startup";
    case "report":
      return "Alignment Report";
    case "pilot":
      return "Pilot Update";
  }
}

export default function UpdatesPage() {
  const newUpdates = updates.filter((u) => u.isNew);
  const pastUpdates = updates.filter((u) => !u.isNew);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Program Updates</h1>
        <p className="text-muted-foreground mt-1">
          Stay informed about the Health ImpACT program, new startups, and your
          pilot progress
        </p>
      </div>

      {/* New Updates */}
      {newUpdates.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Badge className="bg-green text-white">New</Badge>
            Recent Updates
          </h2>
          {newUpdates.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>
      )}

      {/* Past Updates */}
      {pastUpdates.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Earlier Updates
          </h2>
          {pastUpdates.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>
      )}
    </div>
  );
}

function UpdateCard({ update }: { update: Update }) {
  return (
    <Card className={update.isNew ? "border-l-4 border-l-green" : ""}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-muted rounded-lg shrink-0">
            {getIcon(update.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    {getTypeLabel(update.type)}
                  </span>
                  {update.isNew && (
                    <Badge
                      variant="secondary"
                      className="bg-green/10 text-green text-xs"
                    >
                      New
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {update.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {update.description}
                </p>
              </div>
              <div className="text-xs text-muted-foreground shrink-0">
                {new Date(update.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
            {update.link && (
              <Button variant="link" className="p-0 h-auto mt-2 text-cyan" asChild>
                <a href={update.link}>
                  View Details
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
