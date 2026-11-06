"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const routeTitles = {
  "/": "MediQueue | Home - Expert Tutor Booking",
  "/tutors": "MediQueue | Browse All Tutors",
  "/add-tutor": "MediQueue | Add New Tutor",
  "/my-tutor": "MediQueue | My Listed Tutors",
  "/my-booked-sessions": "MediQueue | My Booked Sessions",
  "/login": "MediQueue | Secure Login",
  "/signup": "MediQueue | Student & Tutor Registration",
  "/profile": "MediQueue | User Profile & Settings",
};

export default function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    if (routeTitles[pathname]) {
      document.title = routeTitles[pathname];
    } else if (pathname.startsWith("/tutors/")) {
      document.title = "MediQueue | Tutor Details & Booking";
    } else {
      document.title = "MediQueue | Tutor Booking Platform";
    }
  }, [pathname]);

  return null;
}
