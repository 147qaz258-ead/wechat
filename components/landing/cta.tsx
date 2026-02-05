"use client";
import Link from "next/link";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to transform your content?
        </h2>
        <p className="text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
          Join 10,000+ creators who use our platform to publish magazine-quality articles every day.
        </p>
        <Link href="/app">
           <ShinyButton className="px-8 py-4 h-auto text-lg">
             Start Writing for Free <ArrowRight className="inline ml-2"/>
           </ShinyButton>
        </Link>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-600/20 rounded-full blur-[100px] -z-10 pointer-events-none" />
    </section>
  );
}
