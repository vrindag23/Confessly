
"use client";

import Masonry from "react-masonry-css";
import { MessageCard } from "@/components/ui/MessageCard";
import { DashboardHeader } from "@/components/ui/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/model/User";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { Types } from "mongoose";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [messages, setMessages] = useState<(Message & { _id: Types.ObjectId })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { toast } = useToast();
  const { data: session, status } = useSession();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  // 🔐 Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  // 🗑 Delete a message locally
  const handleDeleteMessage = (messageId: string) => {
    setMessages((prev) => prev.filter((msg) => msg._id.toString() !== messageId));
  };

  // 🔄 Fetch Accept Messages toggle state
  const fetchAcceptMessages = useCallback(async () => {
    const username = (session?.user as User)?.username;
    if (!username) return;

    try {
      setIsSwitchLoading(true);
      const res = await axios.get<ApiResponse>(`/api/accept-messages?username=${username}`);
      setValue("acceptMessages", res.data.isAcceptingMessages);
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;
      toast({
        title: "Failed to Load Toggle",
        description: err.response?.data.message || "Error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [session, setValue, toast]);

  // 📩 Fetch Messages
  const fetchMessages = useCallback(
    async (refresh = false) => {
      const username = (session?.user as User)?.username;
      if (!username) return;

      try {
        setIsLoading(true);
        const res = await axios.get<ApiResponse>(`/api/get-messages?username=${username}`);
        setMessages(res.data.messages || []);

        if (refresh) {
          toast({
            title: "✅ Refreshed",
            description: "Messages updated",
          });
        }
      } catch (error) {
        const err = error as AxiosError<ApiResponse>;
        toast({
          title: "Error Fetching Messages",
          description: err.response?.data.message || "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [session, toast]
  );

  // 🔁 Toggle accept messages switch
  const handleSwitchChange = async () => {
    const username = (session?.user as User)?.username;
    if (!username) return;

    try {
      const res = await axios.post<ApiResponse>("/api/accept-messages", {
        username,
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({ title: res.data.message });
    } catch (error) {
      const err = error as AxiosError<ApiResponse>;
      toast({
        title: "Error Updating Toggle",
        description: err.response?.data.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // 🔃 Initial Load
  useEffect(() => {
    if (session?.user) {
      fetchMessages();
      fetchAcceptMessages();
    }
  }, [session, fetchMessages, fetchAcceptMessages]);

  if (status === "loading") return <div className="p-4 text-gray-600">Loading...</div>;

  const username = (session?.user as User)?.username;

  if (!username) {
    return <div className="p-4 text-red-500">User session not found. Please sign in.</div>;
  }

  const profileUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "✅ Link Copied!",
      description: "Profile link copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF6] p-6">
      <DashboardHeader username={username} profileUrl={profileUrl} onCopyLink={copyToClipboard} />

      {/* Toggle Switch Section */}
      <div className="mt-6 rounded-2xl p-5 border border-yellow-200 bg-[#FFF3B0] shadow-sm flex justify-between items-center relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#A0E7E5] rounded-full opacity-30 blur-xl" />
        <div>
          <h2 className="text-lg font-bold text-[#2C2C2C]">✨ Accept Anonymous Messages</h2>
          <p className="text-sm text-gray-700 mt-1">
            Turn <span className="font-semibold text-[#4D96FF]">ON</span> to allow secret confessions 💌
          </p>
        </div>
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
          className="data-[state=checked]:bg-[#4D96FF] data-[state=unchecked]:bg-gray-300 scale-110 transition-colors"
        />
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end mt-4">
        <Button
          className="bg-[#FF6B81] hover:bg-[#ff4f6c] text-white rounded-lg"
          onClick={() => fetchMessages(true)}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <RefreshCcw className="h-4 w-4 mr-2" /> Refresh Messages
            </>
          )}
        </Button>
      </div>

      {/* Messages */}
      <div className="mt-6">
        {messages.length > 0 ? (
          <Masonry
            breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
            className="flex gap-4"
            columnClassName="masonry-column"
          >
            {messages.map((msg) => (
              <MessageCard key={msg._id.toString()} message={msg} onMessageDelete={handleDeleteMessage} />
            ))}
          </Masonry>
        ) : (
          <div className="text-center text-gray-500 text-lg mt-10">
            😅 No messages yet… Share your link!
          </div>
        )}
      </div>
    </div>
  );
}
