"use client";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { 
  Palette, 
  Wand2, 
  Smartphone, 
  Copy, 
  Zap,
  LayoutDashboard
} from "lucide-react";

export function Features() {
  return (
    <section className="py-24 bg-neutral-950/50 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
            称霸微信公众号 <br /> 你所需要的一切
          </h2>
          <p className="mt-4 text-neutral-400 max-w-xl mx-auto">
             别再使用笨重的编辑器了。我们这款日式便当风格的工具，让您随时随地拥有专业设计团队的力量。
          </p>
        </div>
        
        <BentoGrid className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-white/5 ${className}`}></div>
);

const items = [
  {
    title: "AI语义风格",
    description: "自动检测引用、标题和列表。",
    header: <Skeleton className="from-violet-900/20 to-indigo-900/20" />,
    icon: <Wand2 className="h-4 w-4 text-violet-500" />,
  },
  {
    title: "即时移动预览",
    description: "你在 iPhone 14 上看到的和他们在 iPhone 14 上看到的一模一样。",
    header: <Skeleton className="from-blue-900/20 to-cyan-900/20" />,
    icon: <Smartphone className="h-4 w-4 text-blue-500" />,
  },
  {
    title: "一键同步",
    description: "将内联样式完美复制到微信公众号。",
    header: <Skeleton className="from-emerald-900/20 to-teal-900/20" />,
    icon: <Copy className="h-4 w-4 text-emerald-500" />,
  },
  {
    title: "高级组件库",
    description: "即刻访问 50+ 杂志级布局。",
    header: <Skeleton className="from-pink-900/20 to-rose-900/20" />,
    icon: <Palette className="h-4 w-4 text-pink-500" />,
  },
  {
    title: "闪电般快",
    description: "基于 Next.js 14 构建，交互瞬间响应。",
    header: <Skeleton className="from-yellow-900/20 to-orange-900/20" />,
    icon: <Zap className="h-4 w-4 text-yellow-500" />,
  },
];
