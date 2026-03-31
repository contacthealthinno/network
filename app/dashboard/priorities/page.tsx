"use client";

import { useState } from "react";
import { Plus, Edit2, Save, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Priority {
  id: string;
  title: string;
  statement: string;
  currentWorkaround: string;
  outcome: string;
  constraints: string;
  pilotReady: boolean;
}

export default function PrioritiesPage() {
  const [priorities, setPriorities] = useState<Priority[]>([
    {
      id: "1",
      title: "Rural Specialty Access",
      statement:
        "Our rural clinics struggle to connect patients with specialists, leading to delayed diagnoses and treatment.",
      currentWorkaround:
        "Patients travel 2+ hours to Albuquerque for specialist visits, leading to missed appointments and delayed care.",
      outcome:
        "Reduce time from referral to specialist consultation by 50% in rural locations.",
      constraints:
        "Limited broadband in some areas; need solutions that work with low bandwidth.",
      pilotReady: true,
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Priority | null>(null);

  const startEdit = (priority: Priority) => {
    setEditingId(priority.id);
    setEditForm({ ...priority });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (!editForm) return;
    setPriorities((prev) =>
      prev.map((p) => (p.id === editForm.id ? editForm : p))
    );
    setEditingId(null);
    setEditForm(null);
  };

  const addPriority = () => {
    const newPriority: Priority = {
      id: Date.now().toString(),
      title: "",
      statement: "",
      currentWorkaround: "",
      outcome: "",
      constraints: "",
      pilotReady: false,
    };
    setPriorities((prev) => [...prev, newPriority]);
    startEdit(newPriority);
  };

  const deletePriority = (id: string) => {
    setPriorities((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) {
      cancelEdit();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Priority Profile</h1>
        <p className="text-muted-foreground mt-1">
          Define your top 1-2 priority challenges to help HealthInno match you
          with the right solutions.
        </p>
      </div>

      <Alert>
        <Info size={16} />
        <AlertDescription>
          Your priorities are shared with HealthInno and the Advisory Council
          when relevant to help identify the best startup matches for your
          organization.
        </AlertDescription>
      </Alert>

      {priorities.map((priority) => (
        <Card key={priority.id}>
          {editingId === priority.id && editForm ? (
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Challenge Title</Label>
                <Input
                  id="title"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  placeholder="e.g., Rural Specialty Access"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statement">Challenge Statement</Label>
                <Textarea
                  id="statement"
                  value={editForm.statement}
                  onChange={(e) =>
                    setEditForm({ ...editForm, statement: e.target.value })
                  }
                  placeholder="Describe the challenge your organization faces..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workaround">Current Workaround</Label>
                <Textarea
                  id="workaround"
                  value={editForm.currentWorkaround}
                  onChange={(e) =>
                    setEditForm({ ...editForm, currentWorkaround: e.target.value })
                  }
                  placeholder="How are you currently addressing this challenge?"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outcome">Desired Outcome</Label>
                <Textarea
                  id="outcome"
                  value={editForm.outcome}
                  onChange={(e) =>
                    setEditForm({ ...editForm, outcome: e.target.value })
                  }
                  placeholder="What does success look like?"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="constraints">Constraints</Label>
                <Textarea
                  id="constraints"
                  value={editForm.constraints}
                  onChange={(e) =>
                    setEditForm({ ...editForm, constraints: e.target.value })
                  }
                  placeholder="Budget, technical, regulatory, or other constraints..."
                  rows={2}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="pilotReady"
                  checked={editForm.pilotReady}
                  onCheckedChange={(checked) =>
                    setEditForm({ ...editForm, pilotReady: !!checked })
                  }
                />
                <Label htmlFor="pilotReady" className="font-normal cursor-pointer">
                  We are ready to pilot solutions for this challenge
                </Label>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Button onClick={saveEdit} className="bg-green hover:bg-green/90 text-white">
                  <Save size={14} className="mr-2" />
                  Save Priority
                </Button>
                <Button variant="ghost" onClick={cancelEdit}>
                  <X size={14} className="mr-2" />
                  Cancel
                </Button>
                {priorities.length > 1 && (
                  <Button
                    variant="ghost"
                    className="text-destructive ml-auto"
                    onClick={() => deletePriority(priority.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </CardContent>
          ) : (
            <>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{priority.title}</CardTitle>
                  {priority.pilotReady && (
                    <span className="text-xs text-green font-medium">
                      Pilot ready
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEdit(priority)}
                >
                  <Edit2 size={14} className="mr-1" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Challenge Statement
                  </p>
                  <p className="text-foreground">{priority.statement}</p>
                </div>
                {priority.currentWorkaround && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Current Workaround
                    </p>
                    <p className="text-foreground">{priority.currentWorkaround}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Desired Outcome
                  </p>
                  <p className="text-foreground">{priority.outcome}</p>
                </div>
                {priority.constraints && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Constraints
                    </p>
                    <p className="text-foreground">{priority.constraints}</p>
                  </div>
                )}
              </CardContent>
            </>
          )}
        </Card>
      ))}

      {priorities.length < 2 && editingId === null && (
        <Button variant="outline" onClick={addPriority} className="w-full">
          <Plus size={16} className="mr-2" />
          Add Another Priority
        </Button>
      )}

      <p className="text-sm text-muted-foreground text-center">
        Last updated: February 20, 2024
      </p>
    </div>
  );
}
