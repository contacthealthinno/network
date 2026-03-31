import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Search,
  MessageSquare,
  Users,
  Rocket,
  Star,
  Shield,
  CheckCircle,
  Building2,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

const stats = [
  { value: "50+", label: "Vetted Companies" },
  { value: "6", label: "Technology Categories" },
  { value: "State-Backed", label: "Program" },
];

const steps = [
  {
    icon: Search,
    title: "Browse",
    description:
      "Explore vetted health tech solutions filtered by category, compliance, and pilot readiness.",
  },
  {
    icon: MessageSquare,
    title: "Request Info",
    description:
      "Request an Alignment Report matching startups to your specific organizational priorities.",
  },
  {
    icon: Users,
    title: "HealthInno Facilitates",
    description:
      "Our team helps coordinate introductions and pilot planning between you and selected startups.",
  },
  {
    icon: Rocket,
    title: "Pilot",
    description:
      "Launch a structured pilot with clear success metrics and HealthInno support.",
  },
];

const partners = [
  { name: "NMEDD", full: "New Mexico Economic Development Department" },
  { name: "UNM", full: "University of New Mexico" },
  { name: "Builders VC", full: "Builders Venture Capital" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-light via-background to-cyan-light opacity-50" />
        <div className="container relative py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Image
                src="/images/logo.png"
                alt="HealthInno"
                width={280}
                height={70}
                priority
              />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight text-balance">
              New Mexico&apos;s Health Tech Innovation Marketplace
            </h1>
            <p className="mt-6 text-lg md:text-xl text-body max-w-2xl mx-auto text-balance">
              Connecting healthcare organizations with vetted startup solutions
              &mdash; pilot-ready, compliance-screened, and aligned to NM
              priorities.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-green hover:bg-green/90 text-white px-8"
              >
                <Link href="/marketplace">
                  Browse Solutions
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-navy text-navy hover:bg-navy hover:text-white px-8"
              >
                <Link href="/apply">Apply as a Startup</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-navy">
                  {stat.value}
                </div>
                <div className="mt-1 text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Tier Explanation */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Two Tiers of Vetted Innovation
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Every company in our marketplace has passed HealthInno&apos;s
              initial screening. Our Preferred Network goes further.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* General Directory Card */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Shield size={20} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">General Directory</h3>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-muted-foreground mt-0.5 shrink-0"
                    />
                    Passed HealthInno initial screening
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-muted-foreground mt-0.5 shrink-0"
                    />
                    Self-managed company profiles
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-muted-foreground mt-0.5 shrink-0"
                    />
                    Compliance self-certification
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-muted-foreground mt-0.5 shrink-0"
                    />
                    Visible to logged-in healthcare orgs
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Preferred Network Card */}
            <Card className="border-2 border-green bg-green-light/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center">
                    <Star size={20} className="text-white fill-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                      HealthInno Preferred Network
                    </h3>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-green-700 dark:text-green-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-green mt-0.5 shrink-0"
                    />
                    Advisory Council reviewed & approved
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-green mt-0.5 shrink-0"
                    />
                    Completed at least one Health ImpACT pilot
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-green mt-0.5 shrink-0"
                    />
                    Verified compliance & pilot outcomes data
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-green mt-0.5 shrink-0"
                    />
                    Request Alignment Reports directly
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              From discovery to pilot in four simple steps, with HealthInno
              support throughout.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="relative inline-flex">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-light flex items-center justify-center mx-auto">
                    <step.icon size={28} className="text-cyan" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founding Partners */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Founding Partners
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  {partner.name === "UNM" ? (
                    <GraduationCap size={24} />
                  ) : (
                    <Building2 size={24} />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {partner.name}
                  </div>
                  <div className="text-xs">{partner.full}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-navy">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to innovate healthcare in New Mexico?
            </h2>
            <p className="mt-4 text-white/80">
              Whether you&apos;re a healthcare organization seeking solutions or
              a startup ready to pilot, we&apos;re here to help.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-green hover:bg-green/90 text-white"
              >
                <Link href="/marketplace">Explore the Marketplace</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-navy"
              >
                <Link href="/apply">Submit Your Startup</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
                <span className="text-white font-bold text-sm">HI</span>
              </div>
              <span className="font-semibold text-foreground">
                Health ImpACT Marketplace
              </span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <Link href="/marketplace" className="hover:text-foreground">
                Marketplace
              </Link>
              <Link href="/forhealthcare" className="hover:text-foreground">
                For Healthcare Orgs
              </Link>
              <Link href="/apply" className="hover:text-foreground">
                For Startups
              </Link>
              <Link href="/about" className="hover:text-foreground">
                About
              </Link>
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            A program of HealthInno, New Mexico&apos;s healthcare innovation
            network.
          </div>
        </div>
      </footer>
    </div>
  );
}
