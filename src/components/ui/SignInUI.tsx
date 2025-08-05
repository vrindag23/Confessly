"use client";

import { Form } from "@/components/ui/form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface SignInUIProps {
  form: any;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
}

export default function SignInUI({ form, onSubmit, isSubmitting }: SignInUIProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#A0E7E5] via-[#B4F8C8] to-[#FBE7C6] p-6">
      {/* Card Wrapper */}
      <div className="w-full max-w-md p-8 bg-[#FFFDF6] border border-yellow-200 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-[#2C2C2C]">
            Welcome Back 👋
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Sign in to continue your anonymous journey 💌
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Username / Email */}
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-800">
                    Username or Email
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter your username or email"
                    className="rounded-lg border-gray-300 focus:ring-2 focus:ring-[#4D96FF]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-800">
                    Password
                  </FormLabel>
                  <Input
                    type="password"
                    {...field}
                    placeholder="••••••••"
                    className="rounded-lg border-gray-300 focus:ring-2 focus:ring-[#4D96FF]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#FF6B81] hover:bg-[#ff4f6c] text-white font-semibold rounded-lg shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "🚀 Sign In"
              )}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="text-center my-4">
          <span className="text-gray-500 text-sm">or</span>
        </div>

        {/* Don't have account? */}
        <div className="text-center">
          <p className="text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-[#4D96FF] font-semibold hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
