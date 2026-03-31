import Link from "next/link";
import { ArrowRight, Target, Users, Lightbulb, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description:
      "We exist to improve healthcare outcomes for all New Mexicans by accelerating the adoption of innovative health technology solutions.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description:
      "We bring together healthcare organizations, startups, and state partners to create a thriving innovation ecosystem.",
  },
  {
    icon: Lightbulb,
    title: "Innovation-Focused",
    description:
      "We champion evidence-based innovation that addresses real healthcare challenges facing our communities.",
  },
  {
    icon: MapPin,
    title: "New Mexico First",
    description:
      "We prioritize solutions that align with state healthcare priorities and serve our unique rural and tribal communities.",
  },
];

const priorities = [
  "Behavioral Health Integration",
  "Rural Health Access",
  "Health Equity",
  "Chronic Disease Management",
  "Maternal & Child Health",
  "Workforce Development",
  "Social Determinants of Health",
  "Care Coordination",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-navy/5 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy tracking-tight text-balance mb-6">
              About HealthInno
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              HealthInno is New Mexico&apos;s Health Tech Innovation Studio &amp;
              Statewide Network, connecting healthcare organizations with
              vetted startup solutions to improve health outcomes across the
              state.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-navy mb-6">
                Our Mission
              </h2>
              <p className="text-muted-foreground mb-4">
                HealthInno serves as the bridge between innovative health
                technology startups and the healthcare organizations that can
                benefit from their solutions. We believe that by creating a
                trusted, curated marketplace, we can accelerate the adoption of
                innovation while reducing risk for both sides.
              </p>
              <p className="text-muted-foreground mb-4">
                Our marketplace is specifically designed for New Mexico&apos;s
                unique healthcare landscape, with a focus on solutions that
                address state priorities including rural health access, tribal
                health equity, behavioral health integration, and chronic
                disease management.
              </p>
              <p className="text-muted-foreground">
                Every startup in our marketplace has been vetted for compliance,
                pilot-readiness, and alignment with New Mexico healthcare
                priorities. Our Preferred tier includes startups that have
                demonstrated successful pilots and exceptional NM alignment.
              </p>
            </div>
            <div className="bg-muted/30 rounded-xl p-8">
              <h3 className="text-lg font-semibold text-navy mb-4">
                New Mexico Healthcare Priorities
              </h3>
              <div className="flex flex-wrap gap-2">
                {priorities.map((priority) => (
                  <span
                    key={priority}
                    className="px-3 py-1.5 bg-cyan/10 text-cyan text-sm font-medium rounded-full"
                  >
                    {priority}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at HealthInno.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border-border text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="text-navy" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-navy mb-8 text-center">
              How We Help
            </h2>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center shrink-0">
                  <span className="text-green font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-2">
                    For Healthcare Organizations
                  </h3>
                  <p className="text-muted-foreground">
                    We curate and vet health tech startups so you don&apos;t
                    have to. Browse our marketplace to discover pre-screened
                    solutions, access compliance documentation, and initiate
                    pilot conversations with confidence.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center shrink-0">
                  <span className="text-cyan font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-2">
                    For Startups
                  </h3>
                  <p className="text-muted-foreground">
                    Gain visibility with New Mexico healthcare organizations
                    through our trusted marketplace. Demonstrate your compliance
                    readiness, showcase pilot outcomes, and connect with
                    organizations actively seeking innovation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                  <span className="text-navy font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-2">
                    For the State
                  </h3>
                  <p className="text-muted-foreground">
                    HealthInno supports New Mexico&apos;s healthcare innovation
                    goals by creating infrastructure for sustainable innovation
                    adoption, generating insights on emerging solutions, and
                    facilitating collaboration across the healthcare ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-navy">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Join the HealthInno Network
            </h2>
            <p className="text-white/80 mb-8">
              Whether you&apos;re a healthcare organization looking for
              innovation or a startup with a solution to offer, we&apos;d love
              to connect.
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
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-navy"
              >
                <Link href="/apply">Apply as Startup</Link>
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
