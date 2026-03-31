"use client";

import { useState } from "react";
import { Lock, Building, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PreferredProfileGateProps {
  startupName: string;
  children: React.ReactNode;
}

export function PreferredProfileGate({
  startupName,
  children,
}: PreferredProfileGateProps) {
  const [showGate, setShowGate] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    orgName: "",
    orgType: "",
    contactName: "",
    contactEmail: "",
    reason: "",
  });

  // For demo purposes - in production this would check actual auth
  const dismissGate = () => {
    setShowGate(false);
  };

  if (!showGate) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="blur-sm pointer-events-none select-none">{children}</div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-card border border-border rounded-xl p-8 max-w-md mx-4 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-green-light flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-green" />
          </div>

          <h2 className="text-xl font-bold text-foreground mb-2">
            Preferred Network Profile
          </h2>

          <p className="text-muted-foreground mb-6">
            Full profiles for Preferred Network companies are available to
            participating healthcare organizations. Join the Health ImpACT
            program to access detailed information, request Alignment Reports,
            and initiate pilots.
          </p>

          <div className="space-y-3">
            <Button
              className="w-full bg-green hover:bg-green/90 text-white"
              onClick={() => setDialogOpen(true)}
            >
              <Building size={16} className="mr-2" />
              Request Participation
              <ArrowRight size={16} className="ml-2" />
            </Button>

            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={dismissGate}
            >
              Continue with limited view
            </Button>
          </div>
        </div>
      </div>

      {/* Request Participation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Program Participation</DialogTitle>
            <DialogDescription>
              Join the Health ImpACT program to access Preferred Network
              profiles, request Alignment Reports, and pilot innovative
              solutions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                value={formData.orgName}
                onChange={(e) =>
                  setFormData({ ...formData, orgName: e.target.value })
                }
                placeholder="e.g., Presbyterian Healthcare Services"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orgType">Organization Type</Label>
              <Select
                value={formData.orgType}
                onValueChange={(value) =>
                  setFormData({ ...formData, orgType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health-system">Health System</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                  <SelectItem value="fqhc">FQHC</SelectItem>
                  <SelectItem value="tribal">Tribal Health</SelectItem>
                  <SelectItem value="academic">
                    Academic Medical Center
                  </SelectItem>
                  <SelectItem value="clinic">Clinic / Practice</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Your Name</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) =>
                    setFormData({ ...formData, contactName: e.target.value })
                  }
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, contactEmail: e.target.value })
                  }
                  placeholder="you@org.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">
                What challenges are you looking to address?
              </Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
                placeholder="Briefly describe your organization's priorities or challenges..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green hover:bg-green/90 text-white"
              disabled={
                !formData.orgName ||
                !formData.orgType ||
                !formData.contactName ||
                !formData.contactEmail
              }
              onClick={() => {
                // In real app, would submit to API
                setDialogOpen(false);
                setShowGate(false);
              }}
            >
              Submit Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
