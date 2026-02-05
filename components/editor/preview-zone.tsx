"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";

interface PreviewZoneProps {
  html: string;
}

export function PreviewZone({ html }: PreviewZoneProps) {
  return (
    <div className="flex-1 h-full bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center p-8 overflow-hidden relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: "radial-gradient(#6366f1 1px, transparent 1px)", backgroundSize: "20px 20px" }} 
      />

      <div className="relative w-[375px] h-[812px] bg-white text-black shadow-2xl rounded-[3rem] border-8 border-neutral-800 overflow-hidden flex flex-col">
        {/* Notch / Status Bar */}
        <div className="h-12 bg-white flex items-center justify-between px-6 border-b border-neutral-100 shrink-0 z-10">
           <span className="text-xs font-bold text-neutral-900">9:41</span>
           <div className="w-20 h-6 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2" />
           <div className="flex gap-1">
             <div className="w-4 h-2.5 bg-neutral-900 rounded-[1px]" />
             <div className="w-0.5 h-2.5 bg-neutral-900/30 rounded-[1px]" />
           </div>
        </div>

        {/* Browser Header Simulation */}
        <div className="h-12 bg-[#ededed] flex items-center px-4 border-b border-neutral-200 shrink-0">
           <span className="text-xs text-neutral-500 font-medium mx-auto">mp.weixin.qq.com</span>
        </div>

        {/* Content Area */}
        <div 
          className="flex-1 overflow-y-auto scroll-smooth bg-white"
          dangerouslySetInnerHTML={{ __html: html || "<div style='padding:20px; color:#999; text-align:center; padding-top:100px;'>Preview will appear here...</div>" }}
        />

        {/* Bottom Bar */}
        <div className="h-16 bg-[#f7f7f7] border-t border-neutral-200 shrink-0 flex items-center justify-around px-4">
             <div className="w-8 h-8 rounded-full bg-neutral-200" />
             <div className="w-32 h-8 rounded-full bg-neutral-200" />
             <div className="w-8 h-8 rounded-full bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
