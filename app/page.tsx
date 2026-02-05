import { Navbar } from "@/components/main-nav";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white selection:bg-violet-500/30">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <CTA />
      
      <footer className="py-8 text-center text-neutral-600 text-sm border-t border-white/5">
        <p>© 2024 WeChat Content OS. All rights reserved.</p>
      </footer>
    </main>
  );
}
