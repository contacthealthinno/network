import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Bookmark,
  Share2,
  CheckCircle,
  Clock,
  Users,
  Target,
  Building,
  Calendar,
  DollarSign,
  Linkedin,
  AlertCircle,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SiteHeader } from "@/components/site-header";
import { PreferredBadge } from "@/components/marketplace/preferred-badge";
import { PreferredProfileGate } from "@/components/marketplace/preferred-profile-gate";
import { CategoryPill } from "@/components/marketplace/category-pill";
import { StagePill } from "@/components/marketplace/stage-pill";
import { getStartupBySlug, startups } from "@/lib/data";
import { CATEGORY_LABELS } from "@/lib/types";

export function generateStaticParams() {
  return startups.map((startup) => ({
    slug: startup.slug,
  }));
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default async function StartupProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const startup = getStartupBySlug(slug);

  if (!startup) {
    notFound();
  }

  const isPreferred = startup.tier === "preferred";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container py-6 lg:py-8">
        {/* Back Link */}
        <Link
          href="/marketplace"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Marketplace
        </Link>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
          <Avatar className="h-20 w-20 rounded-xl bg-navy-light shrink-0">
            <AvatarFallback className="rounded-xl bg-navy text-white font-bold text-xl">
              {getInitials(startup.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {startup.name}
              </h1>
              {isPreferred && <PreferredBadge size="md" />}
            </div>

            <p className="text-lg text-muted-foreground mb-4">
              {startup.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <CategoryPill category={startup.category} />
              <StagePill stage={startup.stage} size="md" />
              {startup.website && (
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-cyan hover:text-cyan/80"
                >
                  <ExternalLink size={14} className="mr-1" />
                  Website
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {isPreferred && (
                <Button className="bg-green hover:bg-green/90 text-white">
                  <FileText size={16} className="mr-2" />
                  Request Alignment Report
                </Button>
              )}
              <Button variant="outline">
                <Bookmark size={16} className="mr-2" />
                Save to Watchlist
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 size={18} />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs - wrapped with gate for Preferred startups */}
        {isPreferred ? (
          <PreferredProfileGate startupName={startup.name}>
            <StartupTabs startup={startup} isPreferred={isPreferred} />
          </PreferredProfileGate>
        ) : (
          <StartupTabs startup={startup} isPreferred={isPreferred} />
        )}
      </div>
    </div>
  );
}

function StartupTabs({ startup, isPreferred }: { startup: typeof import("@/lib/data").startups[0]; isPreferred: boolean }) {
  return (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="solution">Solution Detail</TabsTrigger>
            <TabsTrigger value="compliance">Compliance & Security</TabsTrigger>
            <TabsTrigger value="pilots" disabled={!isPreferred}>
              Pilot History {!isPreferred && <Lock size={12} className="ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* What They Do */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What They Do</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {startup.description}
                    </p>
                  </CardContent>
                </Card>

                {/* NM Priorities */}
                {startup.nmPriorities && startup.nmPriorities.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        How It Addresses NM Priorities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {startup.nmPriorities.map((priority, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <CheckCircle
                              size={18}
                              className="text-green mt-0.5 shrink-0"
                            />
                            {priority}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Differentiators */}
                {startup.differentiators &&
                  startup.differentiators.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          What Makes Them Different
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {startup.differentiators.map((diff, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3 text-muted-foreground"
                            >
                              <Target
                                size={18}
                                className="text-cyan mt-0.5 shrink-0"
                              />
                              {diff}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Who It's For */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Who It&apos;s For</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">
                        Care Settings
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {startup.careSettings.map((setting) => (
                          <Badge key={setting} variant="secondary">
                            {setting}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {startup.targetPopulations &&
                      startup.targetPopulations.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-foreground mb-2">
                            Target Populations
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {startup.targetPopulations.map((pop) => (
                              <Badge key={pop} variant="outline">
                                {pop}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Facts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {startup.hq && (
                      <div className="flex items-center gap-3 text-sm">
                        <Building size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">HQ:</span>
                        <span className="text-foreground">{startup.hq}</span>
                      </div>
                    )}
                    {startup.foundedYear && (
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar size={16} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Founded:</span>
                        <span className="text-foreground">
                          {startup.foundedYear}
                        </span>
                      </div>
                    )}
                    {startup.fundingStage && (
                      <div className="flex items-center gap-3 text-sm">
                        <DollarSign
                          size={16}
                          className="text-muted-foreground"
                        />
                        <span className="text-muted-foreground">Funding:</span>
                        <span className="text-foreground">
                          {startup.fundingStage}
                        </span>
                      </div>
                    )}
                    {isPreferred && (
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle size={16} className="text-green" />
                        <span className="text-muted-foreground">Pilots:</span>
                        <span className="text-green font-medium">
                          {startup.pilotsCompleted} completed
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Solution Detail Tab */}
          <TabsContent value="solution" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {startup.capabilities.map((cap, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <CheckCircle
                          size={16}
                          className="text-green mt-0.5 shrink-0"
                        />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pilot Format</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-cyan" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Duration
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {startup.pilotFormat.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-cyan" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Population
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {startup.pilotFormat.population}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">
                      Success Metrics
                    </p>
                    <ul className="space-y-1">
                      {startup.pilotFormat.metrics.map((metric, index) => (
                        <li
                          key={index}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                          {metric}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Technology Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <CategoryPill category={startup.category} size="md" />
                    <p className="text-muted-foreground">
                      {CATEGORY_LABELS[startup.category]}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certification</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        HIPAA Compliance
                      </TableCell>
                      <TableCell>
                        {startup.compliance.hipaa ? (
                          <Badge className="bg-green-light text-green-700 dark:text-green-300">
                            <CheckCircle size={12} className="mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Not Verified</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {startup.compliance.hipaa
                          ? "Compliant with HIPAA Privacy and Security Rules"
                          : "Self-certification pending"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        SOC 2 Type II
                      </TableCell>
                      <TableCell>
                        {startup.compliance.soc2 ? (
                          <Badge className="bg-green-light text-green-700 dark:text-green-300">
                            <CheckCircle size={12} className="mr-1" />
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {startup.compliance.soc2
                          ? "SOC 2 Type II certified"
                          : "Certification in progress"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        BAA Available
                      </TableCell>
                      <TableCell>
                        {startup.compliance.baa ? (
                          <Badge className="bg-green-light text-green-700 dark:text-green-300">
                            <CheckCircle size={12} className="mr-1" />
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Not Available</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {startup.compliance.baa
                          ? "Standard BAA template available"
                          : "Contact for details"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">
                        EHR Integrations
                      </TableCell>
                      <TableCell>
                        {startup.compliance.ehrIntegrations.length > 0 ? (
                          <Badge className="bg-cyan-light text-cyan-700 dark:text-cyan-300">
                            {startup.compliance.ehrIntegrations.length}{" "}
                            Integration
                            {startup.compliance.ehrIntegrations.length > 1
                              ? "s"
                              : ""}
                          </Badge>
                        ) : (
                          <Badge variant="secondary">None</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {startup.compliance.ehrIntegrations.length > 0
                          ? startup.compliance.ehrIntegrations.join(", ")
                          : "No EHR integrations currently"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {isPreferred && startup.advisoryNote && (
              <Card className="border-green bg-green-light/30">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CheckCircle size={18} className="text-green" />
                    HealthInno Vetting Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 dark:text-green-300">
                    {startup.advisoryNote}
                  </p>
                </CardContent>
              </Card>
            )}

            {!isPreferred && (
              <Card className="border-muted">
                <CardContent className="py-8 text-center">
                  <Lock size={32} className="mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">
                    HealthInno vetting notes are available for Preferred Network
                    companies only.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    General Directory listings show self-reported compliance
                    information.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Pilot History Tab - Preferred Only */}
          <TabsContent value="pilots" className="space-y-6">
            {isPreferred ? (
              <>
                {startup.outcomes && startup.outcomes.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Completed Pilots</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {startup.outcomes.map((outcome, index) => (
                          <div
                            key={index}
                            className="border-l-4 border-green pl-4 py-2"
                          >
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <Badge variant="secondary">{outcome.setting}</Badge>
                              <span className="text-sm text-muted-foreground">
                                {outcome.duration}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {outcome.population}
                              </span>
                            </div>
                            <p className="text-foreground font-medium">
                              {outcome.result}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {startup.advisoryNote && (
                  <Card className="border-green bg-green-light/30">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Advisory Council Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-green-700 dark:text-green-300">
                        {startup.advisoryNote}
                      </p>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardContent className="py-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        size={18}
                        className="text-muted-foreground mt-0.5"
                      />
                      <p className="text-sm text-muted-foreground">
                        Results may vary by setting. Past performance does not
                        guarantee future outcomes. Contact HealthInno for
                        detailed pilot reports.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="py-16 text-center">
                  <Lock size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Pilot History Locked
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Pilot history and outcome data are available only for
                    HealthInno Preferred Network companies.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {startup.team.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-4 bg-navy-light">
                      <AvatarFallback className="bg-navy text-white font-semibold">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {member.title}
                    </p>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-cyan hover:text-cyan/80"
                      >
                        <Linkedin size={14} className="mr-1" />
                        LinkedIn
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-3 gap-6 text-center">
                  {startup.hq && (
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Headquarters
                      </p>
                      <p className="font-medium text-foreground">{startup.hq}</p>
                    </div>
                  )}
                  {startup.foundedYear && (
                    <div>
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="font-medium text-foreground">
                        {startup.foundedYear}
                      </p>
                    </div>
                  )}
                  {startup.fundingStage && (
                    <div>
                      <p className="text-sm text-muted-foreground">Funding</p>
                      <p className="font-medium text-foreground">
                        {startup.fundingStage}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
  );
}
