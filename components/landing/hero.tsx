"use client";
import { motion } from "framer-motion";
import { ArrowRight, Wand2 } from "lucide-react";
import Link from "next/link";
import { ShinyButton } from "@/components/ui/shiny-button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-4">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse" />
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl opacity-50 mix-blend-screen animate-pulse delay-1000" />
      </div>

      <div className="max-w-5xl mx-auto text-center z-10 space-y-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-violet-200 mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-pulse"></span>
            AI 驱动的微信编辑器
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            将枯燥的文本转化为 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              杂志品质的文章
            </span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-8">
            别再为格式问题烦恼了。只需粘贴文本，我们的人工智能就能将其重新构建成精美且响应式的微信布局。
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Link href="/app">
                <ShinyButton className="h-12 px-8 text-base">
                  立即免费开始创作 <ArrowRight className="inline ml-2 w-4 h-4"/>
                </ShinyButton>
             </Link>
          </div>
        </motion.div>

        {/* Demo Stage - Using User Uploaded Image for better context */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3, duration: 0.5 }}
           className="mt-16 relative w-full max-w-4xl mx-auto rounded-2xl border border-white/10 shadow-2xl overflow-hidden group"
        >
           <Image 
             src="/assets/hero-demo.png" 
             alt="Hero Demo" 
             width={1920} 
             height={1080}
             className="w-full h-auto object-cover"
           />
           
           {/* Center Badge Overlay */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-black/50 border border-white/20 rounded-full flex items-center justify-center z-20 shadow-2xl backdrop-blur-md animate-pulse">
              <Wand2 className="w-8 h-8 text-violet-400" />
           </div>
        </motion.div>
      </div>
    </section>
  );
}
