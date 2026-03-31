"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2, Check, XCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site-header";

const HEALTH_TECH_CATEGORIES = [
  { value: "care-coordination", label: "Care Coordination Platforms" },
  { value: "behavioral-health", label: "Behavioral Health Solutions" },
  { value: "modern-care-delivery", label: "Modern Care Delivery Tools" },
  { value: "workflow-optimization", label: "Workflow Optimization" },
  { value: "patient-engagement", label: "Patient Engagement Platforms" },
  { value: "data-analytics", label: "Data & Analytics Solutions" },
  { value: "other", label: "Other" },
];

const FUNDING_OPTIONS = [
  { value: "pre-seed", label: "Pre-Seed (< $500K)" },
  { value: "seed", label: "Seed ($500K - $2M)" },
  { value: "series-a", label: "Series A ($2M - $15M)" },
  { value: "series-b-plus", label: "Series B+ ($15M+)" },
  { value: "bootstrapped", label: "Bootstrapped / No external funding" },
  { value: "grants-only", label: "Grants only" },
];

const OPERATION_TIME = [
  { value: "less-than-1", label: "Less than 1 year" },
  { value: "1-2-years", label: "1-2 years" },
  { value: "3-5-years", label: "3-5 years" },
  { value: "5-plus-years", label: "5+ years" },
];

const REGULATORY_OPTIONS = [
  { value: "not-fda-regulated", label: "Not FDA-regulated (software/service) — no FDA clearance required for our intended use" },
  { value: "fda-cleared", label: "FDA-cleared / FDA-approved (already cleared)" },
  { value: "fda-in-progress", label: "FDA-regulated — not yet cleared / approval in progress" },
];

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming", "District of Columbia"
];

interface FormData {
  companyName: string;
  headquarters: string;
  website: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  technologyDescription: string;
  referredBy: string;
  healthTechCategories: string[];
  operationTime: string;
  fundraise: string;
  pilotReady: string;
  regulatoryStatus: string;
  additionalInfo: string;
  deckUrl: string;
}

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    headquarters: "",
    website: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    technologyDescription: "",
    referredBy: "",
    healthTechCategories: [],
    operationTime: "",
    fundraise: "",
    pilotReady: "",
    regulatoryStatus: "",
    additionalInfo: "",
    deckUrl: "",
  });

  const updateField = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (category: string) => {
    setFormData((prev) => {
      const current = prev.healthTechCategories;
      if (current.includes(category)) {
        return { ...prev, healthTechCategories: current.filter((c) => c !== category) };
      } else if (current.length < 2) {
        return { ...prev, healthTechCategories: [...current, category] };
      }
      return prev;
    });
  };

  const removeFile = () => {
    updateField("deckFile", null);
  };

  const isFormValid = () => {
    return (
      formData.companyName &&
      formData.headquarters &&
      formData.website &&
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.technologyDescription &&
      formData.healthTechCategories.length > 0 &&
      formData.operationTime &&
      formData.fundraise &&
      formData.pilotReady &&
      formData.regulatoryStatus &&
      formData.deckUrl
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("companyName", formData.companyName);
      submitData.append("headquarters", formData.headquarters);
      submitData.append("website", formData.website);
      submitData.append("firstName", formData.firstName);
      submitData.append("lastName", formData.lastName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("technologyDescription", formData.technologyDescription);
      submitData.append("referredBy", formData.referredBy);
      submitData.append("healthTechCategories", formData.healthTechCategories.join(", "));
      submitData.append("operationTime", formData.operationTime);
      submitData.append("fundraise", formData.fundraise);
      submitData.append("pilotReady", formData.pilotReady);
      submitData.append("regulatoryStatus", formData.regulatoryStatus);
      submitData.append("additionalInfo", formData.additionalInfo);
      submitData.append("deckUrl", formData.deckUrl);

      const response = await fetch("/api/apply", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setSubmitted(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("[v0] Submission error:", errorMessage);
      // Show the actual error message from the server
      setError(`Submission failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container py-16 md:py-24">
          <Card className="max-w-xl mx-auto">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-green-light mx-auto mb-6 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Application Submitted!
              </h1>
              <p className="text-muted-foreground mb-6">
                Thank you for applying to the Health ImpACT Innovation
                Marketplace. HealthInno reviews applications within 10 business
                days. You&apos;ll hear from us at the email provided.
              </p>
              <Button asChild className="bg-green hover:bg-green/90 text-white">
                <Link href="/marketplace">Browse the Marketplace</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container py-8 md:py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            From Healthcare Priorities to Real-World Validation
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Health ImpACT connects pilot-ready healthtech companies with New Mexico healthcare 
            organizations for structured, time-bound evaluations—including solutions that are 
            FDA-cleared as well as those that do not require FDA clearance.
          </p>
        </div>

        {/* What is Health ImpACT */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-muted/30 border-none">
            <CardContent className="py-8">
              <h2 className="text-xl font-bold text-navy mb-4">What is Health ImpACT?</h2>
              <p className="text-muted-foreground mb-6">
                Health ImpACT is a structured evaluation and pilot challenge that helps healthcare teams 
                test new tools responsibly—without turning clinical operations into an experiment. 
                HealthInno serves as a neutral convener and coordinator, bringing healthcare leaders 
                and companies together to:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green mt-0.5 shrink-0" />
                  <span>Align on priorities</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green mt-0.5 shrink-0" />
                  <span>Confirm readiness and feasibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green mt-0.5 shrink-0" />
                  <span>Support a low-burden evaluation plan with clear success measures and a clear stop option</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Two-Column: Good Fit / Not a Fit */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-xl font-bold text-navy mb-6 text-center">Who This Is For (and Who It&apos;s Not)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Good Fit */}
            <Card className="border-green/30 bg-green-light/10">
              <CardContent className="py-6">
                <h3 className="font-semibold text-green mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  A Good Fit If You Are:
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green mt-0.5 shrink-0" />
                    <span><strong>Pilot-ready</strong> with a product that can be deployed now</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green mt-0.5 shrink-0" />
                    <span>Building something that can show value in <strong>1-3 months</strong>—without relying on FDA clearance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green mt-0.5 shrink-0" />
                    <span>Able to run a <strong>structured, time-bound evaluation</strong> with clear scope and success metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green mt-0.5 shrink-0" />
                    <span>Ready to work in <strong>real clinical operations</strong> (not just demos)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green mt-0.5 shrink-0" />
                    <span><strong>Open to learning</strong>—no guaranteed sales or procurement</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4 italic">
                  You do not need to be based in New Mexico.
                </p>
              </CardContent>
            </Card>

            {/* Not a Fit */}
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="py-6">
                <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Not a Fit If You Are:
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                    <span>Building an <strong>FDA-regulated device, diagnostic, or therapeutic</strong> that is not yet cleared</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                    <span>Currently <strong>pursuing FDA clearance/approval</strong> (in process)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                    <span>Dependent on <strong>clinical trials or regulatory clearance</strong> to demonstrate value</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                    <span><strong>Pre-product or concept-only</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                    <span>Looking for <strong>guaranteed customers</strong> or fast procurement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How We Vet - Preferred Tier Explanation */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-navy/20 bg-navy/5">
            <CardContent className="py-8">
              <h2 className="text-xl font-bold text-navy mb-4">How We Vet &amp; Publish Startups</h2>
              <p className="text-muted-foreground mb-6">
                All submissions go through HealthInno&apos;s review process. We assess readiness, feasibility, 
                and alignment with New Mexico healthcare priorities before any company appears in the marketplace.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">General Tier (Public)</h3>
                  <p className="text-sm text-muted-foreground">
                    Companies that pass initial screening appear in the public marketplace with basic 
                    profile information visible to all visitors.
                  </p>
                </div>
                
                <div className="space-y-3 p-4 rounded-lg bg-green-light/20 border border-green/20">
                  <h3 className="font-semibold text-green flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-green text-white text-xs rounded">Preferred</span>
                    Preferred Tier
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Companies that complete deeper vetting (compliance verification, reference checks, 
                    pilot-readiness confirmation) are promoted to Preferred status with:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>- Full profile access for verified healthcare orgs</li>
                    <li>- Priority visibility in search results</li>
                    <li>- Alignment Reports for healthcare decision-makers</li>
                    <li>- Direct introduction facilitation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What Submitting Means */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>What Submitting Means:</strong> Submitting your information helps us assess fit as Health ImpACT 
            Challenge Themes are reviewed. Submission does not guarantee selection, and selection does not 
            guarantee an evaluation or pilot.
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Ready to Share Your Information?
            </h2>
<p className="mt-2 text-muted-foreground">
              Fill out the form below and share a link to your current pitch deck 
              so we can understand your solution, readiness, and potential fit.
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardContent className="py-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Company Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground border-b pb-2">
                    Company Information
                  </h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      placeholder="Your company name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="headquarters">Headquarters (HQ) *</Label>
                    <p className="text-sm text-muted-foreground">What state are you operating out of?</p>
                    <Select
                      value={formData.headquarters}
                      onValueChange={(value) => updateField("headquarters", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {US_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website *</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => updateField("website", e.target.value)}
                      placeholder="https://"
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground border-b pb-2">
                    Contact Information
                  </h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => updateField("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => updateField("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Solution Details */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground border-b pb-2">
                    Solution Details
                  </h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="technologyDescription">
                      Tell us about what your technology/solution does. *
                    </Label>
                    <Textarea
                      id="technologyDescription"
                      value={formData.technologyDescription}
                      onChange={(e) => updateField("technologyDescription", e.target.value)}
                      placeholder="Describe your solution, how it works, and the problem it solves..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referredBy">Referred by</Label>
                    <p className="text-sm text-muted-foreground">Please share if you were referred by someone</p>
                    <Input
                      id="referredBy"
                      value={formData.referredBy}
                      onChange={(e) => updateField("referredBy", e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Health Tech Category *</Label>
                    <p className="text-sm text-muted-foreground">
                      Select the category that best describes your product&apos;s main use case today. 
                      If your product spans multiple areas, select up to 2.
                    </p>
                    <div className="space-y-2">
                      {HEALTH_TECH_CATEGORIES.map((category) => (
                        <div key={category.value} className="flex items-center gap-2">
                          <Checkbox
                            id={`category-${category.value}`}
                            checked={formData.healthTechCategories.includes(category.value)}
                            onCheckedChange={() => toggleCategory(category.value)}
                            disabled={
                              formData.healthTechCategories.length >= 2 &&
                              !formData.healthTechCategories.includes(category.value)
                            }
                          />
                          <Label
                            htmlFor={`category-${category.value}`}
                            className="text-sm font-normal cursor-pointer"
                          >
                            {category.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Company Stage */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground border-b pb-2">
                    Company Stage
                  </h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="operationTime">How long have you been in operation? *</Label>
                    <Select
                      value={formData.operationTime}
                      onValueChange={(value) => updateField("operationTime", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {OPERATION_TIME.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fundraise">Fundraise *</Label>
                    <p className="text-sm text-muted-foreground">
                      How much total funding has your company raised to date (equity + SAFEs/convertible notes + grants)?
                    </p>
                    <Select
                      value={formData.fundraise}
                      onValueChange={(value) => updateField("fundraise", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {FUNDING_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Pilot Readiness */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground border-b pb-2">
                    Pilot Readiness
                  </h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pilotReady">
                      Do you have a ready-to-pilot, deployable technology at this stage? *
                    </Label>
                    <Select
                      value={formData.pilotReady}
                      onValueChange={(value) => updateField("pilotReady", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regulatoryStatus">Regulatory Status (FDA / Clinical Trials) *</Label>
                    <p className="text-sm text-muted-foreground">
                      We require solutions that can be deployed and piloted without waiting on FDA clearance or clinical trial milestones.
                    </p>
                    <Select
                      value={formData.regulatoryStatus}
                      onValueChange={(value) => updateField("regulatoryStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {REGULATORY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground border-b pb-2">
                    Additional Information
                  </h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">
                      Is there any additional information you&apos;d like to share?
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => updateField("additionalInfo", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deckUrl">Pitch Deck URL *</Label>
                    <p className="text-sm text-muted-foreground">
                      Share a link to your pitch deck (Google Drive, Dropbox, or other file sharing service). 
                      Make sure the link is set to &quot;Anyone with the link can view.&quot;
                    </p>
                    <Input
                      id="deckUrl"
                      type="url"
                      placeholder="https://drive.google.com/file/d/..."
                      value={formData.deckUrl}
                      onChange={(e) => updateField("deckUrl", e.target.value)}
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-green hover:bg-green/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
