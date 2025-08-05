"use client";

import { Form } from "@/components/ui/form";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface VerifyCodeUIProps {
  form: any;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  username: string;
}

export default function VerifyCodeUI({
  form,
  onSubmit,
  isSubmitting,
  username,
}: VerifyCodeUIProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFF3B0] via-[#A0E7E5] to-[#FFAEBC] p-6">
      {/* Card Wrapper */}
      <div className="w-full max-w-md p-8 bg-[#FFFDF6] border border-yellow-200 rounded-2xl shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#2C2C2C]">
            Verify Your Account ✅
          </h1>
          <p className="text-gray-600 mt-2 text-sm">
            We sent a 6-digit code to <span className="font-bold">@{username}</span>’s email 📩
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Code Input */}
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-gray-800">
                    Enter Verification Code
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="123456"
                    className="rounded-lg text-center text-lg tracking-widest border-gray-300 focus:ring-2 focus:ring-[#4D96FF]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#4D96FF] hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </Button>
          </form>
        </Form>

        {/* Hint */}
        <div className="text-center mt-4 text-gray-600 text-sm">
          Didn’t get the code? <span className="text-[#FF6B81] font-semibold cursor-pointer hover:underline">Resend</span>
        </div>
      </div>
    </div>
  );
}
