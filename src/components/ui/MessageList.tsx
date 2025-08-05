"use client";

import Masonry from "react-masonry-css";
import { MessageCard } from "@/components/ui/MessageCard";
import { Message } from "@/model/User";

interface MessageListProps {
  messages: Message[];
  onMessageDelete: (id: string) => void;
}

export function MessageList({ messages, onMessageDelete }: MessageListProps) {
  const breakpointColumns = {
    default: 3, // Desktop → 3 columns
    1100: 2,    // Tablet → 2 columns
    700: 1,     // Mobile → 1 column
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-4"
      columnClassName="masonry-column"
    >
      {messages.map((msg) => (
        <MessageCard
          key={msg._id.toString()}
          message={msg}
          onMessageDelete={onMessageDelete}
        />
      ))}
    </Masonry>
  );
}
