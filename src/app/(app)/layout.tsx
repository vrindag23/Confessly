import Navbar from "@/components/ui/Navbar";
import Head from "next/head";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#1e1e2e] text-white">
      {/* ✅ Font link + Navbar */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Navbar />
      {children}
    </main>
  );
}



