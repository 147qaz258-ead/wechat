import { Wand2, Loader2 } from "lucide-react";
import { ShinyButton } from "@/components/ui/shiny-button";

interface InputZoneProps {
  value: string;
  onChange: (value: string) => void;
  onEnhance: () => void;
  isEnhancing: boolean;
}

export function InputZone({ value, onChange, onEnhance, isEnhancing }: InputZoneProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center bg-neutral-50 dark:bg-neutral-900/50">
         <span className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Editor</span>
         <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 mr-2">Markdown supported</span>
            <button 
              onClick={onEnhance}
              disabled={isEnhancing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors shadow-sm"
            >
              {isEnhancing ? <Loader2 className="w-3 h-3 animate-spin"/> : <Wand2 className="w-3 h-3"/>}
              AI Enhance
            </button>
         </div>
      </div>
      <textarea
        className="flex-1 w-full p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 overflow-y-auto"
        placeholder="# Paste your article here...&#10;&#10;Use markdown or just plain text.&#10;We will handle the rest."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
