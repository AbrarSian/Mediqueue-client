# MediQueue – Tutor Booking Platform (Client)

### **MediQueue Platform | CAT_02 Project**
* **Project Name:** MediQueue – Tutor Booking Platform (Frontend)
* **Author:** [AbrarSian](https://github.com/AbrarSian)
* **Client GitHub Repository:** [https://github.com/AbrarSian/Mediqueue-client](https://github.com/AbrarSian/Mediqueue-client)
* **Server GitHub Repository:** [https://github.com/AbrarSian/Mediqueue-server](https://github.com/AbrarSian/Mediqueue-server)
* **Live Site URL:** [https://mediqueue-platform.vercel.app](https://mediqueue-platform.vercel.app)

---

## 📄 Project Overview
**MediQueue** is an elevated, full-stack medical and academic tutor booking platform. It provides a seamless experience for students to discover verified subject tutors, explore schedules, reserve learning slots with atomic seat decrement, and manage booked sessions. Tutors and educators can publish detailed profiles, configure availability slots, and manage incoming student bookings from an intuitive dashboard.

---

## ✨ 5+ Key Feature Highlights

1. **Precision Search & Date-Range Filtering (MongoDB `$regex`, `$gte`, `$lte`):**
   - Instant search by tutor name with case-insensitive matching.
   - Comprehensive date pickers allowing students to filter upcoming sessions by start and end dates.
2. **Atomic Digital Slot Reservation & Protection:**
   - Real-time seat slot tracking prevents overbooking (`totalSlots` limit check).
   - Booking automatically decrements available slots on the server, while session cancellation immediately restores slots back to the tutor.
3. **State-Persistent Session Management & Protected Routes:**
   - Client and server JWT authentication powered by Better-Auth with full session persistence.
   - Reloading any private route (`/add-tutor`, `/my-tutor`, `/my-booked-sessions`, `/profile`, `/tutors/:id`) maintains authentication without kicking the user to the login screen.
4. **Interactive Tutor Management Hub:**
   - Dedicated "My Tutors" workspace allowing educators to manage their listings.
   - Pre-filled modal form for instant updates without page reloads, accompanied by delete confirmation dialogs and toast notifications.
5. **Strict Password Security & Google OAuth Integration:**
   - Registration validation enforces uppercase, lowercase, and minimum 6-character length requirements with instant feedback.
   - One-click Google Social Login alongside credentials authentication.
6. **Dynamic Route Titles & Bespoke Dark/Light Aesthetics:**
   - Dynamic page titles on every navigation change (`MediQueue | ...`).
   - Deep obsidian dark mode (`#0b0908`), subtle warm hairline borders, ambient glow cards, and high-contrast light mode toggle.

---

## 🛠️ Tech Stack

* **Framework:** Next.js 16 (App Router with Turbopack)
* **Language & Runtime:** React 19, JavaScript (ES2024), Node.js
* **Styling & UI:** Tailwind CSS 4, Radix UI, Shadcn UI, Embla Carousel
* **State & Auth:** Better Auth, JWT Plugin, Google OAuth
* **Theme Management:** `next-themes` (Dark / Light mode support)
* **Icons & Feedback:** Lucide React, React Icons (`fa6` for current X rebrand), Sonner Toast Notifications
* **Animations:** Motion (Framer Motion engine)

---

## 🗺️ Application Routes

### Public Routes:
* `/` — Modern landing page with interactive carousel, featured tutors (6-card limit), value propositions, category explorer, and FAQs.
* `/tutors` — 3-column responsive grid catalog with real-time search and date filtering.
* `/login` — Secure credentials & Google login with "Forget Password" notice.
* `/signup` — Registration form with client-side uppercase, lowercase, and length password validation.
* `/*` — Custom 404 Not Found & Global Error boundary (`error.jsx`).

### Private Routes (Protected by Auth Session):
* `/tutors/[id]` — Detailed tutor profile, real-time slot checking, and booking modal with unique session tokens.
* `/add-tutor` — Form to publish new tutoring profiles with date picker and image upload support.
* `/my-tutor` — Table format of user's listed tutors with inline edit and delete modals.
* `/my-booked-sessions` — Table format of user's bookings with status badges and cancellation confirmation.
* `/profile` — User profile editor for display name and avatar image.

---

## ⚙️ Getting Started (Local Setup)

### 1. Clone the repository
```bash
git clone https://github.com/AbrarSian/Mediqueue-client.git
cd Mediqueue-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=mediqueue_secret_key_at_least_32_characters_long
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Build for production
```bash
npm run build
```
Turbopack will compile optimized production bundles.
