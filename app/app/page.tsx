"use client";
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/main-nav";
import { InputZone } from "@/components/editor/input-zone";
import { PreviewZone } from "@/components/editor/preview-zone";
import { processContent, renderAIBlocks, StylePreset } from "@/lib/ai-engine";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultText = `# Why Simplicity Wins

> "Simplicity is the ultimate sophistication." 
> — Leonardo da Vinci

In a world of noise, clarity is power. When you strip away the non-essential, you allow the **essence** of your message to shine through.

- Focus on the core message
- Remove visual clutter
- Use whitespace intentionally

Good design acts like a lens, focusing the user's attention exactly where you want it.`;

export default function EditorPage() {
  const [input, setInput] = useState(defaultText);
  const [output, setOutput] = useState("");
  const [preset, setPreset] = useState<StylePreset>("tech");
  const [copied, setCopied] = useState(false);
  
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [aiBlocks, setAiBlocks] = useState<any[] | null>(null);

  // Re-run processing only when input changes OR preset changes
  useEffect(() => {
    if (aiBlocks) {
      // If we have AI blocks, render those with the new preset
      const html = renderAIBlocks(aiBlocks, preset);
      setOutput(html);
    } else {
      // Fallback to local regex engine
      const html = processContent(input, preset);
      setOutput(html);
    }
  }, [input, preset, aiBlocks]);

  // Stream handling helper
  const handleEnhance = async () => {
    setIsEnhancing(true);
    setAiBlocks(null); // Clear previous blocks
    setOutput(""); // Clear output for streaming
    
    let accumulatedText = "";

    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        
        const chunkValue = decoder.decode(value, { stream: true });
        
        // Process SSE lines
        const lines = chunkValue.split("\n");
        for (const line of lines) {
            if (line.startsWith("data: ")) {
                const dataStr = line.replace("data: ", "").trim();
                
                if (dataStr === "[DONE]") {
                    break;
                }
                
                try {
                    const data = JSON.parse(dataStr);
                    const delta = data.choices?.[0]?.delta?.content || "";
                    if (delta) {
                        accumulatedText += delta;
                        // Real-time render
                        const html = processContent(accumulatedText, preset);
                        setOutput(html);
                    }
                } catch (e) {
                    // Ignore parse errors for partial json
                }
            }
        }
      }

    } catch (e) {
      console.error("Enhance failed", e);
      alert("AI 连接失败，请检查网络或重试。");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleCopy = async () => {
    try {
      // Create a Blob with text/html content to preserve styles
      // We also provide text/plain as a fallback
      const htmlBlob = new Blob([output], { type: "text/html" });
      const textBlob = new Blob([output.replace(/<[^>]+>/g, "")], { type: "text/plain" });
      
      const data = [new ClipboardItem({ 
          "text/html": htmlBlob,
          "text/plain": textBlob 
      })];

      await navigator.clipboard.write(data);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
      // Fallback to legacy execCommand if Clipboard API fails
      try {
          const tempEl = document.createElement("div");
          tempEl.innerHTML = output;
          tempEl.style.position = "fixed";
          tempEl.style.left = "-9999px";
          document.body.appendChild(tempEl);
          
          const range = document.createRange();
          range.selectNodeContents(tempEl);
          const selection = window.getSelection();
          if(selection) {
              selection.removeAllRanges();
              selection.addRange(range);
              document.execCommand("copy");
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              selection.removeAllRanges();
          }
          document.body.removeChild(tempEl);
      } catch (legacyError) {
          console.error("Legacy copy also failed", legacyError);
          alert("复制失败，请尝试手动全选复制");
      }
    }
  };

  return (
    <main className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      <Navbar />
      <div className="pt-16 flex-1 flex relative overflow-hidden">
        {/* Left: Input */}
        <div className="w-1/2 h-full z-10 relative flex flex-col overflow-hidden">
          <InputZone 
            value={input} 
            onChange={(val) => {
               setInput(val);
               setAiBlocks(null); // Reset AI blocks on manual edit to avoid sync issues
            }}
            onEnhance={handleEnhance}
            isEnhancing={isEnhancing}
          />
        </div>

        {/* Right: Preview */}
        <div className="w-1/2 h-full z-0 relative flex flex-col overflow-hidden bg-neutral-100 dark:bg-neutral-950">
          <PreviewZone html={output} />
        </div>

        {/* Floating Toolbar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-neutral-900/90 backdrop-blur-md rounded-full border border-white/10 shadow-2xl z-50">
           <div className="flex bg-white/5 rounded-full p-1 mr-2">
              <button 
                onClick={() => setPreset("tech")}
                className={cn("px-4 py-1.5 rounded-full text-xs font-medium transition", preset === "tech" ? "bg-violet-600 text-white shadow-lg" : "text-neutral-400 hover:text-white")}
              >
                Tech
              </button>
              <button 
                onClick={() => setPreset("emotional")}
                className={cn("px-4 py-1.5 rounded-full text-xs font-medium transition", preset === "emotional" ? "bg-rose-500 text-white shadow-lg" : "text-neutral-400 hover:text-white")}
              >
                Emotional
              </button>
              <button 
                onClick={() => setPreset("minimal")}
                className={cn("px-4 py-1.5 rounded-full text-xs font-medium transition", preset === "minimal" ? "bg-white text-black shadow-lg" : "text-neutral-400 hover:text-white")}
              >
                Minimal
              </button>
           </div>
           
           <ShinyButton onClick={handleCopy} className="h-9 px-4 text-xs bg-emerald-600/20 text-emerald-400 hover:shadow-emerald-500/20">
              {copied ? (
                 <span className="flex items-center gap-2"><Check className="w-3 h-3" /> Copied</span>
              ) : (
                 <span className="flex items-center gap-2"><Copy className="w-3 h-3" /> Copy for WeChat</span>
              )}
           </ShinyButton>
        </div>
      </div>
    </main>
  );
}
