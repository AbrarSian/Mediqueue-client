import Link from "next/link";
import { Compass, Home, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-6">
        <div className="absolute -inset-4 rounded-full bg-primary/10 blur-xl" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-muted/80 border text-primary shadow-xl">
          <Compass className="h-12 w-12 animate-spin-slow" />
        </div>
      </div>

      <span className="rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary border border-primary/20">
        404 — Page Not Found
      </span>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
        Lost in the Queue?
      </h1>

      <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
        The page or tutor session you are looking for does not exist, has been removed, or is temporarily unavailable.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="gap-2 shadow-sm">
          <Link href="/">
            <Home className="h-4 w-4" /> Go to Home
          </Link>
        </Button>

        <Button asChild variant="outline" className="gap-2">
          <Link href="/tutors">
            <BookOpen className="h-4 w-4" /> Explore Tutors
          </Link>
        </Button>
      </div>
    </div>
  );
}
