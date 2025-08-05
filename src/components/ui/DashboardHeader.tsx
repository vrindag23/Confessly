import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface DashboardHeaderProps {
  username: string;
  profileUrl: string;
  onCopyLink: () => void;
}

export function DashboardHeader({ username, profileUrl, onCopyLink }: DashboardHeaderProps) {
  return (
    <div className="relative w-full rounded-3xl p-6 bg-[#FFF3B0] border border-yellow-200 shadow-md overflow-hidden">
      
      {/* Decorative blobs */}
      <div className="absolute top-2 right-4 w-20 h-20 bg-[#A0E7E5] rounded-full opacity-30 blur-xl"></div>
      <div className="absolute bottom-2 left-4 w-16 h-16 bg-[#FF6B81] rounded-full opacity-30 blur-lg"></div>

      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-[#2C2C2C] flex items-center gap-2">
        🎉 Hello, <span className="text-[#FF6B81]">{username}!</span>
      </h1>
      <p className="text-gray-700 mt-1">
        Here’s your <span className="font-semibold text-[#4D96FF]">magic dashboard</span> to manage all your secret messages ✨
      </p>

      {/* Profile Card */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <span className="text-sm text-gray-800 break-all">{profileUrl}</span>

        <Button
          onClick={onCopyLink}
          className="flex items-center gap-2 rounded-xl px-4 py-2 bg-[#FF6B81] hover:bg-[#ff4f6c] text-white shadow-md transition-all"
        >
          <Copy size={16} /> Copy Link
        </Button>
      </div>
    </div>
  );
}
