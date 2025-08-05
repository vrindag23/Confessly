"use client";

import { Form } from "@/components/ui/form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

interface SignUpUIProps {
  form: any;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  username: string;
  setUsername: (val: string) => void;
  usernameMessage: string;
  isCheckingUsername: boolean;
  isSubmitting: boolean;
}

export default function SignUpUI({
  form,
  onSubmit,
  username,
  setUsername,
  usernameMessage,
  isCheckingUsername,
  isSubmitting,
}: SignUpUIProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF3B0] via-[#A0E7E5] to-[#FFAEBC] p-6">
      {/* Card Wrapper */}
      <div className="w-full max-w-md p-8 bg-[#FFFDF6] border border-yellow-200 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-[#2C2C2C]">
             Join True    Feedback
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            Sign up to start your anonymous adventure 💌
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Username */}
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-800">
                    Username
                  </FormLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setUsername(e.target.value);
                    }}
                    placeholder="Choose a unique username"
                    className="rounded-lg border-gray-300 focus:ring-2 focus:ring-[#4D96FF]"
                  />
                  {isCheckingUsername && (
                    <p className="text-blue-500 text-sm flex items-center gap-1 mt-1">
                      <Loader2 className="animate-spin w-4 h-4" /> Checking...
                    </p>
                  )}
                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm mt-1 ${
                        usernameMessage === "Username is unique"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-800">
                    Email
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="you@example.com"
                    className="rounded-lg border-gray-300 focus:ring-2 focus:ring-[#4D96FF]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    📩 We'll send you a verification code
                  </p>
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
                " Sign Up"
              )}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="text-center my-4">
          <span className="text-gray-500 text-sm">or</span>
        </div>

        {/* Already have account */}
        <div className="text-center">
          <p className="text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-[#4D96FF] font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
