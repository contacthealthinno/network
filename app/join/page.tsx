"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Target,
  Users,
  FileText,
  Beaker,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { SiteHeader } from "@/components/site-header";

const steps = [
  { id: 1, name: "Organization Info", icon: Building },
  { id: 2, name: "Contact Details", icon: Users },
  { id: 3, name: "Priorities", icon: Target },
  { id: 4, name: "Review & Submit", icon: CheckCircle },
];

const ORG_TYPES = [
  { value: "health-system", label: "Health System" },
  { value: "hospital", label: "Hospital" },
  { value: "fqhc", label: "Federally Qualified Health Center (FQHC)" },
  { value: "tribal", label: "Tribal Health Organization" },
  { value: "academic", label: "Academic Medical Center" },
  { value: "clinic", label: "Primary Care Clinic / Practice" },
  { value: "specialty", label: "Specialty Practice" },
  { value: "behavioral", label: "Behavioral Health Organization" },
  { value: "long-term", label: "Long-Term Care Facility" },
  { value: "other", label: "Other" },
];

const NM_PRIORITIES = [
  "Extending access to specialty care in rural communities",
  "Reducing clinician burnout and documentation burden",
  "Early intervention for chronic disease",
  "Improving behavioral health access",
  "Supporting aging in place",
  "Reducing emergency department utilization",
  "Care coordination across settings",
  "Data-driven population health management",
];

export default function JoinPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    orgName: "",
    orgType: "",
    city: "",
    county: "",
    bedsOrProviders: "",
    patientVolume: "",
    hasEhr: false,
    ehrSystem: "",
    // Step 2
    primaryContactName: "",
    primaryContactTitle: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
    sponsorName: "",
    sponsorTitle: "",
    sponsorEmail: "",
    // Step 3
    topPriority: "",
    priorityDescription: "",
    currentWorkaround: "",
    desiredOutcome: "",
    selectedPriorities: [] as string[],
    pilotReady: false,
    // Step 4
    howHeard: "",
    additionalNotes: "",
    agreeTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const togglePriority = (priority: string) => {
    const newPriorities = formData.selectedPriorities.includes(priority)
      ? formData.selectedPriorities.filter((p) => p !== priority)
      : [...formData.selectedPriorities, priority];
    updateFormData({ selectedPriorities: newPriorities });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.orgName && formData.orgType && formData.city;
      case 2:
        return (
          formData.primaryContactName &&
          formData.primaryContactEmail &&
          formData.primaryContactTitle
        );
      case 3:
        return formData.topPriority && formData.priorityDescription;
      case 4:
        return formData.agreeTerms;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    // In real app, would submit to API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <div className="container py-16 max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-green-light flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Application Submitted!
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your interest in joining the Health ImpACT program. A
            member of our team will review your application and reach out within
            5 business days to discuss next steps.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild className="bg-green hover:bg-green/90 text-white">
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="container py-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Join the Health ImpACT Program
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Apply to become a participating healthcare organization and gain
            access to vetted health tech solutions, Alignment Reports, and
            pilot support.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  index < steps.length - 1 ? "flex-1" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep > step.id
                      ? "bg-green text-white"
                      : currentStep === step.id
                      ? "bg-navy text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle size={20} />
                  ) : (
                    <step.icon size={18} />
                  )}
                </div>
                <span
                  className={`text-xs text-center hidden sm:block ${
                    currentStep >= step.id
                      ? "text-foreground font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Organization Info */}
            {currentStep === 1 && (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="orgName">Organization Name *</Label>
                    <Input
                      id="orgName"
                      value={formData.orgName}
                      onChange={(e) =>
                        updateFormData({ orgName: e.target.value })
                      }
                      placeholder="e.g., Presbyterian Healthcare Services"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="orgType">Organization Type *</Label>
                    <Select
                      value={formData.orgType}
                      onValueChange={(value) =>
                        updateFormData({ orgType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        {ORG_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData({ city: e.target.value })}
                      placeholder="e.g., Albuquerque"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="county">County</Label>
                    <Input
                      id="county"
                      value={formData.county}
                      onChange={(e) =>
                        updateFormData({ county: e.target.value })
                      }
                      placeholder="e.g., Bernalillo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bedsOrProviders">
                      Beds / Providers (approx.)
                    </Label>
                    <Input
                      id="bedsOrProviders"
                      value={formData.bedsOrProviders}
                      onChange={(e) =>
                        updateFormData({ bedsOrProviders: e.target.value })
                      }
                      placeholder="e.g., 500 beds or 25 providers"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patientVolume">
                      Annual Patient Volume (approx.)
                    </Label>
                    <Input
                      id="patientVolume"
                      value={formData.patientVolume}
                      onChange={(e) =>
                        updateFormData({ patientVolume: e.target.value })
                      }
                      placeholder="e.g., 50,000"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="hasEhr"
                      checked={formData.hasEhr}
                      onCheckedChange={(checked) =>
                        updateFormData({ hasEhr: !!checked })
                      }
                    />
                    <Label htmlFor="hasEhr" className="font-normal cursor-pointer">
                      We use an Electronic Health Record (EHR) system
                    </Label>
                  </div>

                  {formData.hasEhr && (
                    <div className="space-y-2 pl-6">
                      <Label htmlFor="ehrSystem">Which EHR system?</Label>
                      <Select
                        value={formData.ehrSystem}
                        onValueChange={(value) =>
                          updateFormData({ ehrSystem: value })
                        }
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select EHR..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="epic">Epic</SelectItem>
                          <SelectItem value="cerner">Cerner</SelectItem>
                          <SelectItem value="allscripts">Allscripts</SelectItem>
                          <SelectItem value="athena">athenahealth</SelectItem>
                          <SelectItem value="meditech">MEDITECH</SelectItem>
                          <SelectItem value="nextgen">NextGen</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Step 2: Contact Details */}
            {currentStep === 2 && (
              <>
                <div>
                  <h3 className="font-medium text-foreground mb-4">
                    Primary Contact
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryContactName">Full Name *</Label>
                      <Input
                        id="primaryContactName"
                        value={formData.primaryContactName}
                        onChange={(e) =>
                          updateFormData({ primaryContactName: e.target.value })
                        }
                        placeholder="Dr. Jane Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryContactTitle">Title *</Label>
                      <Input
                        id="primaryContactTitle"
                        value={formData.primaryContactTitle}
                        onChange={(e) =>
                          updateFormData({ primaryContactTitle: e.target.value })
                        }
                        placeholder="Chief Innovation Officer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryContactEmail">Email *</Label>
                      <Input
                        id="primaryContactEmail"
                        type="email"
                        value={formData.primaryContactEmail}
                        onChange={(e) =>
                          updateFormData({ primaryContactEmail: e.target.value })
                        }
                        placeholder="jsmith@org.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryContactPhone">Phone</Label>
                      <Input
                        id="primaryContactPhone"
                        type="tel"
                        value={formData.primaryContactPhone}
                        onChange={(e) =>
                          updateFormData({ primaryContactPhone: e.target.value })
                        }
                        placeholder="(505) 555-0123"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="font-medium text-foreground mb-4">
                    Executive Sponsor (Optional)
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Having an executive sponsor helps ensure organizational
                    alignment and pilot success.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sponsorName">Name</Label>
                      <Input
                        id="sponsorName"
                        value={formData.sponsorName}
                        onChange={(e) =>
                          updateFormData({ sponsorName: e.target.value })
                        }
                        placeholder="Full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sponsorTitle">Title</Label>
                      <Input
                        id="sponsorTitle"
                        value={formData.sponsorTitle}
                        onChange={(e) =>
                          updateFormData({ sponsorTitle: e.target.value })
                        }
                        placeholder="CEO, CMO, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sponsorEmail">Email</Label>
                      <Input
                        id="sponsorEmail"
                        type="email"
                        value={formData.sponsorEmail}
                        onChange={(e) =>
                          updateFormData({ sponsorEmail: e.target.value })
                        }
                        placeholder="sponsor@org.com"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Priorities */}
            {currentStep === 3 && (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="topPriority">
                      Top Priority Challenge *
                    </Label>
                    <Input
                      id="topPriority"
                      value={formData.topPriority}
                      onChange={(e) =>
                        updateFormData({ topPriority: e.target.value })
                      }
                      placeholder="e.g., Rural Specialty Access"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priorityDescription">
                      Describe the Challenge *
                    </Label>
                    <Textarea
                      id="priorityDescription"
                      value={formData.priorityDescription}
                      onChange={(e) =>
                        updateFormData({ priorityDescription: e.target.value })
                      }
                      placeholder="Describe the specific challenge your organization faces..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentWorkaround">
                      Current Workaround (if any)
                    </Label>
                    <Textarea
                      id="currentWorkaround"
                      value={formData.currentWorkaround}
                      onChange={(e) =>
                        updateFormData({ currentWorkaround: e.target.value })
                      }
                      placeholder="How are you currently addressing this challenge?"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="desiredOutcome">Desired Outcome</Label>
                    <Textarea
                      id="desiredOutcome"
                      value={formData.desiredOutcome}
                      onChange={(e) =>
                        updateFormData({ desiredOutcome: e.target.value })
                      }
                      placeholder="What does success look like?"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Label className="mb-3 block">
                    Which NM health priorities does your challenge align with?
                  </Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {NM_PRIORITIES.map((priority) => (
                      <div key={priority} className="flex items-start gap-2">
                        <Checkbox
                          id={`priority-${priority}`}
                          checked={formData.selectedPriorities.includes(
                            priority
                          )}
                          onCheckedChange={() => togglePriority(priority)}
                        />
                        <Label
                          htmlFor={`priority-${priority}`}
                          className="text-sm font-normal cursor-pointer leading-tight"
                        >
                          {priority}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="pilotReady"
                      checked={formData.pilotReady}
                      onCheckedChange={(checked) =>
                        updateFormData({ pilotReady: !!checked })
                      }
                    />
                    <Label htmlFor="pilotReady" className="font-normal cursor-pointer">
                      We are ready to pilot solutions for this challenge within
                      the next 6 months
                    </Label>
                  </div>
                </div>
              </>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <>
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Organization
                      </p>
                      <p className="text-foreground">{formData.orgName}</p>
                      <p className="text-sm text-muted-foreground">
                        {ORG_TYPES.find((t) => t.value === formData.orgType)
                          ?.label || formData.orgType}{" "}
                        - {formData.city}
                        {formData.county && `, ${formData.county} County`}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Primary Contact
                      </p>
                      <p className="text-foreground">
                        {formData.primaryContactName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formData.primaryContactTitle} -{" "}
                        {formData.primaryContactEmail}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Top Priority
                      </p>
                      <p className="text-foreground">{formData.topPriority}</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.priorityDescription}
                      </p>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="font-medium text-foreground mb-3">
                      As a participating organization, you will receive:
                    </h3>
                    <ul className="space-y-2">
                      {[
                        {
                          icon: FileText,
                          text: "Customized Alignment Reports matching your priorities to vetted startups",
                        },
                        {
                          icon: Shield,
                          text: "Access to Preferred Network companies pre-vetted by the Advisory Council",
                        },
                        {
                          icon: Beaker,
                          text: "Facilitated pilot support including three-party MOUs and progress tracking",
                        },
                        {
                          icon: Users,
                          text: "Invitations to quarterly convenings with other NM healthcare leaders",
                        },
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <item.icon
                            size={18}
                            className="text-green mt-0.5 shrink-0"
                          />
                          <span className="text-muted-foreground">
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="howHeard">
                      How did you hear about HealthInno?
                    </Label>
                    <Select
                      value={formData.howHeard}
                      onValueChange={(value) =>
                        updateFormData({ howHeard: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="colleague">
                          Colleague Referral
                        </SelectItem>
                        <SelectItem value="conference">
                          Conference / Event
                        </SelectItem>
                        <SelectItem value="nmedd">NMEDD</SelectItem>
                        <SelectItem value="unm">UNM</SelectItem>
                        <SelectItem value="search">Web Search</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">
                      Additional Notes (Optional)
                    </Label>
                    <Textarea
                      id="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={(e) =>
                        updateFormData({ additionalNotes: e.target.value })
                      }
                      placeholder="Anything else you'd like us to know?"
                      rows={2}
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) =>
                          updateFormData({ agreeTerms: !!checked })
                        }
                      />
                      <Label
                        htmlFor="agreeTerms"
                        className="text-sm font-normal cursor-pointer"
                      >
                        I agree to be contacted by HealthInno regarding program
                        participation and understand that membership is subject
                        to review and approval.
                      </Label>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((s) => s - 1)}
                disabled={currentStep === 1}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={() => setCurrentStep((s) => s + 1)}
                  disabled={!canProceed()}
                  className="bg-navy hover:bg-navy/90 text-white"
                >
                  Continue
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="bg-green hover:bg-green/90 text-white"
                >
                  Submit Application
                  <CheckCircle size={16} className="ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
