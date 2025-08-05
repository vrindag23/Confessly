'use client';

import Link from 'next/link';
import { Mail, ShieldCheck, Users, Rocket } from 'lucide-react';
import messages from '@/messages.json';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-start bg-[#FFFDF6] text-[#2C2C2C] overflow-x-hidden">

        {/* Hero Section */}
        <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#FFF3B0] via-[#A0E7E5] to-[#FFAEBC] px-6 py-20 relative">
          <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none z-0" />
          <div className="absolute inset-0 animate-particles z-0" />
          <div className="text-center space-y-6 max-w-3xl z-10 animate-fadeIn">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#1e1e2e] leading-tight drop-shadow-md tracking-tight">
              Welcome to <span className="bg-white px-4 py-1 rounded-xl shadow-md">Confessly</span>
            </h1>
            <p className="text-lg md:text-xl text-[#333333] font-medium drop-shadow-sm">
              A platform for <strong>real emotions</strong> and <strong>honest anonymous feedback</strong>.
            </p>
            <p className="text-base text-[#444444]">Speak freely. No fear. No identity. Just truth.</p>
            <Link href="/sign-up">
              <button className="btn-fancy mt-4 shadow-lg hover:shadow-xl">Start Now</button>
            </Link>
          </div>
        </section>

        {/* Carousel */}
        <section className="w-full max-w-3xl animate-fadeInUp py-24 px-4">
          <h2 className="text-3xl font-bold text-center mb-10 underline decoration-[#A855F7] underline-offset-8 text-[#A855F7]">
            💬 What People Are Saying
          </h2>
          <Carousel plugins={[Autoplay({ delay: 3500 })]} className="w-full">
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-4">
                  <Card className="card-pretty">
                    <CardHeader>
                      <CardTitle className="text-[#FF6B81]">{message.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start gap-4">
                      <Mail className="text-[#A855F7]" />
                      <div>
                        <p>{message.content}</p>
                        <p className="text-xs text-gray-500 mt-2">{message.received}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Why Confessly */}
        <section className="max-w-6xl text-center space-y-12 animate-fadeInUp py-28 px-6">
          <h2 className="text-3xl font-bold text-[#A855F7] underline underline-offset-8 decoration-[#F472B6]">✨ Why Confessly?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-pretty hover-glow">
              <ShieldCheck className="h-8 w-8 mx-auto text-[#c084fc]" />
              <h3 className="font-semibold text-lg mt-4">100% Anonymous</h3>
              <p className="text-sm text-gray-600 mt-2">Speak without identity. No account info is shared.</p>
            </div>
            <div className="card-pretty hover-glow">
              <Users className="h-8 w-8 mx-auto text-[#FF6B81]" />
              <h3 className="font-semibold text-lg mt-4">Loved by Communities</h3>
              <p className="text-sm text-gray-600 mt-2">Used by creators, teams, classrooms & friend groups.</p>
            </div>
            <div className="card-pretty hover-glow">
              <Rocket className="h-8 w-8 mx-auto text-[#22D3EE]" />
              <h3 className="font-semibold text-lg mt-4">Super Fast & Easy</h3>
              <p className="text-sm text-gray-600 mt-2">Share and receive responses in just a few clicks.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full max-w-4xl animate-fadeInUp py-24 px-6">
          <h2 className="text-4xl font-extrabold text-center text-[#FF6B81] underline decoration-[#FFB6C1] underline-offset-8 mb-20">
            How It Works
          </h2>
          <div className="relative border-l-[3px] border-dashed border-[#F472B6] pl-10 space-y-20">
            {[
              {
                title: 'Create Your Profile',
                desc: 'Sign in to get your personal anonymous message link.',
                color: '#4D96FF',
              },
              {
                title: 'Share With Others',
                desc: 'Post your link on Instagram or WhatsApp to get feedback.',
                color: '#22D3EE',
              },
              {
                title: 'View in Dashboard',
                desc: 'All messages appear safely in your dashboard.',
                color: '#A855F7',
              },
              {
                title: 'Stay Anonymous & Empowered',
                desc: 'Feel confident to receive honest, anonymous feedback.',
                color: '#FF6B81',
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`relative pl-6 animate-fadeInUp delay-${200 + index * 200}`}
              >
                <div
                  className="absolute -left-[20px] top-2 w-5 h-5 rounded-full border-[3px] border-white shadow-lg"
                  style={{ backgroundColor: step.color }}
                />
                <h3 className="text-2xl font-semibold mb-2 tracking-wide" style={{ color: step.color }}>
                  {step.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center space-y-6 py-28 animate-fadeInUp px-6">
          <h2 className="text-3xl font-bold text-[#FF6B81] underline decoration-[#FFB6C1] underline-offset-8">
            Ready to Try?
          </h2>
          <p className="text-gray-700">Click below to explore your dashboard.</p>
          <Link href="/dashboard">
            <button className="btn-fancy mt-4">Go to Dashboard</button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 bg-[#FF6B81] text-white mt-24">
        © 2025 Confessly. Built with 💜 and honesty.
      </footer>
    </>
  );
}
