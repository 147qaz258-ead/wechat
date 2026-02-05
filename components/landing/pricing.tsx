"use client";
import { Check, Zap } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-neutral-950" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-neutral-400">
            Start for free, upgrade for power.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="p-8 rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm hover:border-violet-500/50 transition duration-300">
            <h3 className="text-xl font-bold text-white mb-2">Creator</h3>
            <div className="text-4xl font-bold text-white mb-4">$0 <span className="text-base font-normal text-neutral-500">/mo</span></div>
            <p className="text-neutral-400 mb-8">Perfect for hobbyists and individual writers.</p>
            <ul className="space-y-4 mb-8">
              {["Basic AI Formatting", "Standard Templates", "Mobile Preview", "5 Articles / month"].map((feature, i) => (
                <li key={i} className="flex items-center text-neutral-300">
                  <Check className="w-5 h-5 text-neutral-500 mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition">
              Get Started
            </button>
          </div>

          {/* Pro Tier */}
          <div className="relative p-8 rounded-2xl border border-violet-500/30 bg-gradient-to-b from-violet-950/20 to-neutral-900/50 backdrop-blur-sm shadow-2xl overflow-hidden group">
            <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              POPULAR
            </div>
            <div className="absolute inset-0 bg-violet-600/5 -z-10 group-hover:bg-violet-600/10 transition duration-500"/>
            
            <h3 className="text-xl font-bold text-white mb-2 flex items-center">
              Pro <Zap className="w-4 h-4 text-amber-400 ml-2 fill-amber-400" />
            </h3>
            <div className="text-4xl font-bold text-white mb-4">$19 <span className="text-base font-normal text-neutral-500">/mo</span></div>
            <p className="text-neutral-400 mb-8">For professional content teams.</p>
            <ul className="space-y-4 mb-8">
              {["Advanced AI Styling Engine", "Custom Branding", "Unlimited Articles", "Priority Support", "Team Collaboration"].map((feature, i) => (
                <li key={i} className="flex items-center text-white">
                  <Check className="w-5 h-5 text-violet-500 mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <ShinyButton className="w-full justify-center">
              Upgrade to Pro
            </ShinyButton>
          </div>
        </div>
      </div>
    </section>
  );
}
