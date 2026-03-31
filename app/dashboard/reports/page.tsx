import { Download, Plus, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Mock reports data
const reports = [
  {
    id: "1",
    date: "February 15, 2024",
    priorities: ["Rural Specialty Access"],
    startups: ["Amplifier Health", "ReachMD", "VoxCare"],
    status: "new",
  },
  {
    id: "2",
    date: "January 8, 2024",
    priorities: ["Clinician Documentation Burden"],
    startups: ["VoxCare", "FlowOps"],
    status: "reviewed",
  },
  {
    id: "3",
    date: "November 20, 2023",
    priorities: ["Remote Patient Monitoring"],
    startups: ["Amplifier Health", "SensorWell"],
    status: "pilot-initiated",
  },
];

const STATUS_STYLES = {
  new: { label: "New", className: "bg-green-light text-green-700" },
  reviewed: { label: "Reviewed", className: "bg-cyan-light text-cyan-700" },
  "pilot-initiated": {
    label: "Pilot Initiated",
    className: "bg-navy-light text-navy",
  },
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Alignment Reports
          </h1>
          <p className="text-muted-foreground mt-1">
            Curated startup recommendations based on your priorities
          </p>
        </div>
        <Button className="bg-green hover:bg-green/90 text-white">
          <Plus size={16} className="mr-2" />
          Request New Report
        </Button>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText
              size={48}
              className="mx-auto text-muted-foreground mb-4"
            />
            <p className="text-muted-foreground mb-4">
              No alignment reports yet. Request your first report to get
              personalized startup recommendations.
            </p>
            <Button className="bg-green hover:bg-green/90 text-white">
              Request Alignment Report
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText size={20} className="text-cyan" />
                      <span className="font-semibold text-foreground">
                        Alignment Report
                      </span>
                      <Badge className={STATUS_STYLES[report.status].className}>
                        {STATUS_STYLES[report.status].label}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {report.date}
                    </p>

                    <div className="mb-3">
                      <p className="text-sm font-medium text-foreground mb-1">
                        Priorities Addressed:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {report.priorities.map((priority) => (
                          <Badge key={priority} variant="secondary">
                            {priority}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Featured Startups:
                      </p>
                      <div className="flex items-center gap-2">
                        {report.startups.map((startup) => (
                          <Avatar
                            key={startup}
                            className="h-8 w-8 rounded-md bg-navy-light"
                          >
                            <AvatarFallback className="rounded-md bg-navy text-white text-xs font-medium">
                              {getInitials(startup)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">
                          {report.startups.join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="outline" size="sm">
                      <Eye size={14} className="mr-1.5" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download size={14} className="mr-1.5" />
                      PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
