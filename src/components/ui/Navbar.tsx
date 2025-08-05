"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const username = session?.user?.username ?? "Guest";
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-[#0f172a] text-white shadow-md">
      {/* Left - App Name */}
      <Link
        href="/"
        className="text-3xl font-bold tracking-wide text-white hover:text-[#4D96FF] transition-all"
        style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.5px" }}
      >
        Confessly
      </Link>

      {/* Right Section */}
      {isHomePage ? (
        <Link
          href="/sign-in"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-2 text-white transition duration-300 ease-out border-2 border-[#4D96FF] hover:bg-[#4D96FF] hover:text-white hover:shadow-lg hover:scale-105"
        >
          <span className="absolute inset-0 bg-[#4D96FF] opacity-0 group-hover:opacity-10 transition-all duration-300" />
          Login
        </Link>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">👋 {username}</span>
          <button
            onClick={() => signOut()}
            className="px-6 py-2 rounded-full bg-[#4D96FF] hover:bg-[#3B82F6] transition-all font-medium text-white shadow hover:scale-105"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
