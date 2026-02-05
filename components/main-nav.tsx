"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const isApp = pathname.startsWith("/app");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.1] bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            AI Editor
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {!isApp && (
            <Link href="/app">
              <ShinyButton>开始创作</ShinyButton>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
