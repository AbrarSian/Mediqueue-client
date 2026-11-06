"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive shadow-lg">
        <AlertTriangle className="h-10 w-10 animate-pulse" />
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
        Something Went Wrong
      </h1>

      <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
        An unexpected error occurred while processing your request. Please try reloading the page or return to safety.
      </p>

      {error?.message && (
        <div className="mt-4 max-w-md rounded-lg bg-muted/60 p-3 text-xs font-mono text-muted-foreground border">
          {error.message}
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button
          onClick={() => reset()}
          className="gap-2 bg-primary text-primary-foreground hover:opacity-90 shadow-sm"
        >
          <RefreshCcw className="h-4 w-4" /> Try Again
        </Button>

        <Button asChild variant="outline" className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
