"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Share2, StickyNote, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CategoryPill } from "@/components/marketplace/category-pill";
import { PreferredBadge } from "@/components/marketplace/preferred-badge";
import { startups } from "@/lib/data";
import { Startup } from "@/lib/types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Mock watchlist - in real app would come from user data
const watchlistIds = ["1", "3", "4"];

export default function WatchlistPage() {
  const watchlistStartups = startups.filter((s) =>
    watchlistIds.includes(s.id)
  );
  const [notes, setNotes] = useState<Record<string, string>>({});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Watchlist</h1>
          <p className="text-muted-foreground mt-1">
            {watchlistStartups.length} saved{" "}
            {watchlistStartups.length === 1 ? "company" : "companies"}
          </p>
        </div>
        <Button variant="outline">
          <Share2 size={16} className="mr-2" />
          Share Watchlist
        </Button>
      </div>

      {watchlistStartups.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground mb-4">
              Your watchlist is empty. Browse the marketplace to find companies
              to save.
            </p>
            <Button asChild className="bg-green hover:bg-green/90 text-white">
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {watchlistStartups.map((startup) => (
            <WatchlistCard
              key={startup.id}
              startup={startup}
              note={notes[startup.id] || ""}
              onNoteChange={(value) =>
                setNotes((prev) => ({ ...prev, [startup.id]: value }))
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function WatchlistCard({
  startup,
  note,
  onNoteChange,
}: {
  startup: Startup;
  note: string;
  onNoteChange: (value: string) => void;
}) {
  const [showNotes, setShowNotes] = useState(false);
  const isPreferred = startup.tier === "preferred";

  return (
    <Card
      className={
        isPreferred ? "border-l-4 border-l-green bg-green-light/20" : ""
      }
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 rounded-lg bg-navy-light shrink-0">
            <AvatarFallback className="rounded-lg bg-navy text-white font-semibold text-sm">
              {getInitials(startup.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    href={`/marketplace/${startup.slug}`}
                    className="font-semibold text-foreground hover:text-navy"
                  >
                    {startup.name}
                  </Link>
                  {isPreferred && <PreferredBadge size="sm" />}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {startup.tagline}
                </p>
                <CategoryPill category={startup.category} size="sm" />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isPreferred && (
                  <Button
                    size="sm"
                    className="bg-green hover:bg-green/90 text-white"
                  >
                    <FileText size={14} className="mr-1.5" />
                    Request Report
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotes(!showNotes)}
                >
                  <StickyNote size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            {showNotes && (
              <div className="mt-4 pt-4 border-t border-border">
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Notes
                </label>
                <Textarea
                  value={note}
                  onChange={(e) => onNoteChange(e.target.value)}
                  placeholder="Add your notes about this company..."
                  rows={3}
                  className="resize-none"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
