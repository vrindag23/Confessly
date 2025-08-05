"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCompletion } from "ai/react";
import ProfilePageUI from "@/components/ui/ProfilePageUI";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";

const specialChar = "||";
const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

// ✅ Local fallback messages 
const fallbackSuggestions = [
  "What's your favorite childhood memory?",
  "If you could have any superpower, what would it be?",
  "Which song do you secretly love?",
  "What's your dream travel destination?",
  "What’s one thing you never told anyone?"
];

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        username,
        message: data.content,
      });

      toast({
        title: "✅ Message Sent!",
        description: response.data.message,
        variant: "default",
      });

      form.reset({ content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "❌ Error",
        description:
          axiosError.response?.data.message ?? "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

 
  const fetchSuggestedMessages = async () => {
    try {
      await complete(""); 
    } catch (error) {
      console.error("OpenAI failed, using fallback:", error);

     
      const randomSet = fallbackSuggestions
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .join("||");

      complete(randomSet); 
    }
  };

  return (
    <ProfilePageUI
      username={username}
      messageContent={messageContent}
      isLoading={isLoading}
      isSuggestLoading={isSuggestLoading}
      completion={completion}
      error={error}
      onSubmit={form.handleSubmit(onSubmit)}
      handleMessageClick={handleMessageClick}
      fetchSuggestedMessages={fetchSuggestedMessages}
      formField={form.register("content")}
    />
  );
}



