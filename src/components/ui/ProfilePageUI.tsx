"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

interface ProfilePageUIProps {
  username: string;
  messageContent: string;
  isLoading: boolean;
  isSuggestLoading: boolean;
  completion: string;
  error: Error | undefined;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleMessageClick: (msg: string) => void;
  fetchSuggestedMessages: () => void;
  formField: any;
}

const specialChar = "||";
const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

export default function ProfilePageUI({
  username,
  messageContent,
  isLoading,
  isSuggestLoading,
  completion,
  error,
  onSubmit,
  handleMessageClick,
  fetchSuggestedMessages,
  formField,
}: ProfilePageUIProps) {
  return (
    <div
      className="min-h-screen flex justify-center items-center p-6 
      bg-gradient-to-br from-[#FFF3B0] via-[#FFD6E0] to-[#DDEBFF]
      relative overflow-hidden"
    >
      {/* ✅ Stylish subtle background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#fff_1px,_transparent_1px)] [background-size:20px_20px]" />

      {/* ✅ Main Card */}
      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 relative z-10">
        {/* ✅ Header */}
        <h1 className="text-4xl font-extrabold text-center text-[#2C2C2C]">
          💌 Send Anonymous Message
        </h1>
        <p className="text-center text-gray-700 mt-2">
          Confess secretly to <span className="font-bold">@{username}</span>
        </p>

        {/* ✅ Form */}
        <form
          onSubmit={onSubmit}
          className="mt-6 bg-[#FFFDF6] border border-yellow-200 rounded-xl p-6 shadow-sm"
        >
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            ✨ Your Secret Message
          </label>
          <textarea
            placeholder="Write something anonymously..."
            {...formField}
            className="w-full rounded-lg border border-gray-300 p-3 resize-none focus:ring-2 focus:ring-[#4D96FF] outline-none min-h-[100px]"
          />

          {/* ✅ Send Button */}
          <div className="flex justify-center mt-4">
            {isLoading ? (
              <Button disabled className="bg-[#FF6B81] text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || !messageContent}
                className="bg-[#FF6B81] hover:bg-[#ff4f6c] text-white shadow-md"
              >
                Send It!
              </Button>
            )}
          </div>
        </form>

        {/* ✅ Suggested Messages */}
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-[#2C2C2C]">
              🎯 Suggested Messages
            </h2>
            <Button
              onClick={fetchSuggestedMessages}
              disabled={isSuggestLoading}
              className="bg-[#4D96FF] hover:bg-blue-500 text-white rounded-lg shadow"
            >
              {isSuggestLoading ? "Loading..." : "✨ Suggest New"}
            </Button>
          </div>

          {/* ✅ Suggested Messages Card */}
          <Card className="mt-4 border border-yellow-200 bg-[#FFF3B0]/50 shadow-sm">
            <CardHeader>
              <p className="text-gray-700">
                Click any message below to auto-fill it ⬇
              </p>
            </CardHeader>
            <CardContent className="flex flex-col space-y-3">
              {error ? (
                <p className="text-red-500">{error.message}</p>
              ) : completion ? (
                parseStringMessages(completion).map((msg, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="hover:bg-[#FFD6E0] transition-all"
                    onClick={() => handleMessageClick(msg)}
                  >
                    {msg}
                  </Button>
                ))
              ) : (
                <p className="text-gray-500">No suggestions yet…</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        {/* ✅ CTA for creating account */}
        <div className="text-center">
          <p className="mb-4 text-gray-700">
            Want your own secret confession board? 🎭
          </p>
          <Link href="/sign-up">
            <Button className="bg-[#4D96FF] hover:bg-blue-500 text-white shadow">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
