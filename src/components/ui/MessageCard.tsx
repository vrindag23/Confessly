"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Message } from "@/model/User";

interface MessageCardProps {
  message: Message;
  onMessageDelete: (id: string) => void;
}

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  return (
    <Card className="relative bg-[#FFFDF6] border border-[#FFE7B0] rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      
      {/* Floating Delete Button */}
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-3 right-3 rounded-full bg-[#FF6B81] hover:bg-[#ff4f6c] text-white shadow-sm"
        onClick={() => onMessageDelete(message._id.toString())}
      >
        <Trash size={16} />
      </Button>

      <CardContent className="p-5">
        {/* Message Title / Content */}
        <p className="text-base text-gray-800 leading-relaxed">
          {message.content}
        </p>

        {/* Footer with time */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs px-3 py-1 bg-[#FFF3B0] text-[#5C4E00] rounded-full">
            {new Date(message.createdAt).toLocaleString()}
          </span>
          <span className="text-xs text-gray-400 italic">Anonymous</span>
        </div>
      </CardContent>
    </Card>
  );
}
