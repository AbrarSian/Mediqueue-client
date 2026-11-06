'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { toast } from "sonner";
import { FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export function SignupForm({ ...props }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Length must be at least 6 characters.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Must have an Uppercase letter in the password.";
    }
    if (!/[a-z]/.test(password)) {
      return "Must have a Lowercase letter in the password.";
    }
    return "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    // Password validation rule check
    const errorMsg = validatePassword(userData.password || "");
    if (errorMsg) {
      setPasswordError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        image: userData.image,
        options: {
          disableAutoSignIn: true,
        },
      });

      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
        return;
      }

      if (data) {
        toast.success("Registration successful! Please log in.");
        router.push("/login");
      }
    } catch {
      toast.error("Something went wrong during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
      });

      if (error) {
        toast.error(error.message || "Google sign-in failed.");
        return;
      }

      if (data) {
        toast.success("Authenticated with Google successfully!");
        router.push("/");
      }
    } catch {
      toast.error("Google authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card {...props} className="border-border/60 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Join MediQueue to book tutor sessions or offer your teaching services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup className="space-y-4">
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Dr. Sarah Johnson"
                required
                disabled={loading}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="image">Profile Photo URL</FieldLabel>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://images.unsplash.com/..."
                disabled={loading}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email Address</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="sarah@example.com"
                required
                disabled={loading}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                disabled={loading}
                onChange={(e) => {
                  const err = validatePassword(e.target.value);
                  setPasswordError(err);
                }}
              />
              {passwordError ? (
                <p className="text-xs font-medium text-destructive mt-1.5">
                  {passwordError}
                </p>
              ) : (
                <FieldDescription>
                  Must be 6+ characters, containing uppercase and lowercase letters.
                </FieldDescription>
              )}
            </Field>

            <Field className="space-y-3 pt-2">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating Account..." : "Register"}
              </Button>

              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                type="button"
                className="w-full"
                disabled={loading}
              >
                <FaGoogle className="mr-2 text-red-500" />
                Sign up with Google
              </Button>

              <FieldDescription className="pt-2 text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-medium hover:underline">
                  Log in
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
