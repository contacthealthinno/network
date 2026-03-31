import Link from "next/link";
import {
  ArrowRight,
  Star,
  Calendar,
  Beaker,
  FileText,
  Target,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StartupCard } from "@/components/marketplace/startup-card";
import { getPreferredStartups } from "@/lib/data";

export default function DashboardPage() {
  const preferredStartups = getPreferredStartups().slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-navy to-navy-dark text-white">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, Presbyterian Healthcare Services
          </h1>
          <p className="text-navy-light/80 mb-4">
            Your dashboard for discovering and piloting health tech innovations.
          </p>
          <Button
            asChild
            variant="secondary"
            className="bg-white text-navy hover:bg-white/90"
          >
            <Link href="/marketplace">
              Browse Marketplace
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Priority Areas Summary */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Target size={18} className="text-cyan" />
                Your Priority Areas
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/priorities">
                  Update priorities
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-cyan-light rounded-lg">
                <h3 className="font-medium text-foreground mb-1">
                  Rural Specialty Access
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our rural clinics struggle to connect patients with
                  specialists, leading to delayed diagnoses and treatment.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* New Preferred Matches */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star size={18} className="text-green" />
                New Preferred Matches
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/marketplace?preferred=true">
                  View all
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {preferredStartups.map((startup) => (
                <div key={startup.id} className="relative">
                  <Badge className="absolute top-3 right-3 bg-green text-white z-10">
                    New match
                  </Badge>
                  <StartupCard startup={startup} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar Widgets */}
        <div className="space-y-6">
          {/* Active Pilots */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Beaker size={18} className="text-cyan" />
                Active Pilots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">VoxCare</span>
                  <Badge className="bg-green-light text-green-700">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  AI ambient documentation pilot
                </p>
                <div className="text-xs text-muted-foreground">
                  Started: Jan 15, 2024 | 8 providers
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3"
                asChild
              >
                <Link href="/dashboard/pilots">
                  View all pilots
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Convenings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar size={18} className="text-cyan" />
                Upcoming Convenings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border border-border rounded-lg">
                <p className="font-medium text-sm">
                  Q1 Innovation Showcase
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  March 15, 2024 | Virtual
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  RSVP
                </Button>
              </div>
              <div className="p-3 border border-border rounded-lg">
                <p className="font-medium text-sm">
                  Rural Health Tech Forum
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  April 8, 2024 | Santa Fe
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  RSVP
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Program Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell size={18} className="text-cyan" />
                Program Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-green mt-2 shrink-0" />
                <div>
                  <p className="text-sm">
                    3 new startups added to Preferred Network
                  </p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan mt-2 shrink-0" />
                <div>
                  <p className="text-sm">
                    New Alignment Report available
                  </p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2 shrink-0" />
                <div>
                  <p className="text-sm">
                    2024 Impact Report released
                  </p>
                  <p className="text-xs text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                asChild
              >
                <Link href="/dashboard/updates">
                  View all updates
                  <ArrowRight size={14} className="ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
