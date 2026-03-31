import Link from "next/link";
import {
  ArrowRight,
  Search,
  Shield,
  FileCheck,
  BarChart3,
  Clock,
  Users,
  CheckCircle,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

const benefits = [
  {
    icon: Shield,
    title: "Pre-Vetted Solutions",
    description:
      "Every startup in our marketplace has been screened for HIPAA compliance, technical readiness, and alignment with New Mexico healthcare priorities.",
  },
  {
    icon: Search,
    title: "Curated Discovery",
    description:
      "Filter by category, compliance certifications, pilot readiness, and NM priorities to find solutions that match your specific needs.",
  },
  {
    icon: FileCheck,
    title: "Alignment Reports",
    description:
      "Receive detailed HealthInno Alignment Reports for Preferred vendors, providing compliance assessments and pilot fit analysis.",
  },
  {
    icon: Clock,
    title: "Accelerated Pilots",
    description:
      "Skip months of vendor discovery and due diligence. Our Preferred startups are pilot-ready with proven track records.",
  },
  {
    icon: BarChart3,
    title: "Dashboard & Analytics",
    description:
      "Track your watchlist, view pilot outcomes across the network, and access aggregate insights on innovation trends.",
  },
  {
    icon: Users,
    title: "Network Collaboration",
    description:
      "Connect with other NM healthcare organizations to share pilot learnings and coordinate on shared innovation priorities.",
  },
];

const tiers = [
  {
    name: "General Tier",
    description: "Browse curated startup profiles",
    features: [
      "Access to all startup directory listings",
      "Filter by category, compliance, and stage",
      "View company overviews and solution descriptions",
      "Request introductions through HealthInno",
    ],
    access: "Free for NM Healthcare Organizations",
  },
  {
    name: "Preferred Tier",
    description: "Full access to vetted, pilot-ready startups",
    features: [
      "Everything in General Tier",
      "Detailed compliance documentation",
      "Pilot outcome data and case studies",
      "HealthInno Alignment Reports",
      "Direct contact information",
      "Priority pilot matching",
    ],
    access: "Available to Partner Organizations",
    highlighted: true,
  },
];

const steps = [
  {
    number: "01",
    title: "Register Your Organization",
    description:
      "Complete a brief registration to verify your NM healthcare organization and gain marketplace access.",
  },
  {
    number: "02",
    title: "Explore the Marketplace",
    description:
      "Browse pre-vetted startups, filter by your priorities, and build a watchlist of promising solutions.",
  },
  {
    number: "03",
    title: "Request Alignment Reports",
    description:
      "For Preferred startups, request detailed HealthInno Alignment Reports tailored to your organization.",
  },
  {
    number: "04",
    title: "Initiate Pilot Conversations",
    description:
      "Connect directly with startups or work with HealthInno to facilitate introductions and pilot planning.",
  },
];

export default function ForHealthcarePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-navy/5 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 text-cyan text-sm font-medium mb-6">
              <Building2 size={16} />
              For Healthcare Organizations
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight text-balance mb-6">
              Discover Pre-Vetted Health Tech Solutions
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Access New Mexico&apos;s curated marketplace of innovative health
              tech startups. Every solution is screened for compliance,
              pilot-readiness, and alignment with state healthcare priorities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-navy hover:bg-navy/90 text-white"
              >
                <Link href="/marketplace">
                  Browse Marketplace
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-navy text-navy hover:bg-navy hover:text-white"
              >
                <Link href="/join">Apply to Join Program</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
              Why Use the HealthInno Marketplace?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We do the heavy lifting of vendor discovery and due diligence so
              you can focus on innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-border">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center mb-3">
                    <benefit.icon className="text-cyan" size={20} />
                  </div>
                  <CardTitle className="text-navy text-lg">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Tier Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
              Two Tiers of Access
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the level of access that fits your organization&apos;s
              innovation needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative ${
                  tier.highlighted
                    ? "border-green border-2 bg-green-light/20"
                    : "border-border"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-green text-white text-xs font-medium rounded-full">
                    Recommended
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-navy text-xl">
                    {tier.name}
                  </CardTitle>
                  <p className="text-muted-foreground">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle
                          size={16}
                          className="text-green mt-0.5 shrink-0"
                        />
                        <span className="text-sm text-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-navy">
                      {tier.access}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in four simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                )}
                <div className="text-4xl font-bold text-cyan/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-navy">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Discover Innovation?
            </h2>
            <p className="text-white/80 mb-8">
              Join New Mexico healthcare organizations already using the
              HealthInno Marketplace to find and pilot innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-green hover:bg-green/90 text-white"
              >
                <Link href="/marketplace">
                  Explore Marketplace
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-navy hover:bg-white/90"
              >
                <Link href="/about">Learn More About HealthInno</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} HealthInno. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-navy"
              >
                About
              </Link>
              <Link
                href="/marketplace"
                className="text-sm text-muted-foreground hover:text-navy"
              >
                Marketplace
              </Link>
              <Link
                href="/apply"
                className="text-sm text-muted-foreground hover:text-navy"
              >
                For Startups
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
