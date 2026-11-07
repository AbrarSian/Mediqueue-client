"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

import { authClient } from "@/lib/auth-client";
import { API_BASE } from "@/lib/api";

export default function AddTutorPage() {
  const router = useRouter();

  const { data: sessionData, isPending: sessionLoading } = authClient.useSession();
  const session = sessionData?.user;

  const [startDate, setStartDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push("/login");
    }
  }, [sessionLoading, session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate) {
      toast.error("Please select a session start date.");
      return;
    }

    if (!session?.email) {
      toast.error("You must be logged in to create a tutor profile.");
      router.push("/login");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const tutorData = {
      tutorName: rawData.tutorName,
      photo: imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      subject: rawData.subject,
      availableDays: rawData.availableDays,
      availableTime: rawData.availableTime,
      hourlyFee: Number(rawData.hourlyFee),
      totalSlots: Number(rawData.totalSlots),
      sessionStartDate: startDate.toISOString(),
      institution: rawData.institution,
      experience: rawData.experience,
      location: rawData.location,
      teachingMode: rawData.teachingMode,
      createdBy: session.email,
      userId: session.id,
    };



    try {
      let jwtToken = "";
      try {
        const { data: tokenData } = await authClient.token();
        if (tokenData?.token) {
          jwtToken = tokenData.token;
        }
      } catch (err) {
        console.warn("Could not retrieve custom JWT token, continuing with session:", err);
      }

      const res = await fetch(`${API_BASE}/tutors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}),
        },
        body: JSON.stringify(tutorData),
      });

      if (res.ok) {
        toast.success("Tutor profile registered successfully!");
        router.push("/tutors");
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to create tutor profile.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Server connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verifying authentication session...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-zinc-950/60">
      <Card className="mx-auto max-w-3xl shadow-xl border-border/60">
        <CardHeader className="space-y-1 pb-6 border-b">
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            Add Tutor Profile
          </CardTitle>
          <CardDescription>
            Fill out the verified information below to list your tutoring or medical education sessions.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Basic Info */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="tutorName">Tutor Full Name</Label>
                <Input
                  id="tutorName"
                  name="tutorName"
                  placeholder="e.g. Dr. Jane Doe"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject / Category</Label>
                <Select name="subject" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medical Sciences">Medical Sciences</SelectItem>
                    <SelectItem value="Anatomy & Physiology">Anatomy & Physiology</SelectItem>
                    <SelectItem value="Biochemistry">Biochemistry</SelectItem>
                    <SelectItem value="Pharmacology">Pharmacology</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="teachingMode">Teaching Mode</Label>
                <Select name="teachingMode" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                    <SelectItem value="Both">Both (Hybrid)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 2: Media */}
            <div className="space-y-2">
              <Label htmlFor="photoLink">Photo (Image link / URL)</Label>
              <Input
                id="photoLink"
                name="photoLink"
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Paste direct URL from ImgBB, Unsplash, or PostImage.
              </p>
            </div>

            {/* Row 3: Availability */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="availableDays">Available Days</Label>
                <Input
                  id="availableDays"
                  name="availableDays"
                  placeholder="e.g. Sun - Thu"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availableTime">Available Time Slot</Label>
                <Input
                  id="availableTime"
                  name="availableTime"
                  placeholder="e.g. 5:00 PM - 8:00 PM"
                  required
                />
              </div>
            </div>

            {/* Row 4: Metrics */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hourlyFee">Hourly Fee ($)</Label>
                <Input
                  id="hourlyFee"
                  name="hourlyFee"
                  type="number"
                  min="0"
                  placeholder="35"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalSlots">Total Student Slots</Label>
                <Input
                  id="totalSlots"
                  name="totalSlots"
                  type="number"
                  min="1"
                  placeholder="6"
                  required
                />
              </div>
            </div>

            {/* Row 5: Location & Session Start Date */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location (Area/City)</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Dhanmondi, Dhaka"
                  required
                />
              </div>

              <div className="space-y-2 flex flex-col justify-end">
                <Label className="mb-2">Session Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!startDate && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Pick start date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Row 6: Institution & Experience */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="institution">Institution / University</Label>
                <Input
                  id="institution"
                  name="institution"
                  placeholder="e.g. Dhaka Medical College / BUET"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Teaching Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  placeholder="e.g. 4+ Years Experience"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full text-base font-semibold h-11"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Tutor Profile...
                  </>
                ) : (
                  "Create Tutor Profile"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
