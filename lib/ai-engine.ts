// Define type locally to avoid circular dependency
export type StylePreset = "tech" | "emotional" | "minimal";

interface ThemeStyles {
  container: React.CSSProperties;
  h1: React.CSSProperties;
  h2: React.CSSProperties;
  p: React.CSSProperties;
  quote: React.CSSProperties;
  highlight: React.CSSProperties;
  list: React.CSSProperties;
  listItem: React.CSSProperties;
  code: React.CSSProperties; // New
  hr: React.CSSProperties;   // New
}

const themes: Record<StylePreset, ThemeStyles> = {
  tech: {
    container: {
      padding: "20px",
      fontSize: "16px",
      lineHeight: "1.75",
      color: "#333",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    h1: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#000",
      borderLeft: "4px solid #7c3aed",
      paddingLeft: "12px",
      marginTop: "30px",
      marginBottom: "20px",
      background: "linear-gradient(to right, rgba(124, 58, 237, 0.1), transparent)",
      padding: "10px 12px",
      borderRadius: "0 8px 8px 0",
    },
    h2: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#4b5563",
      marginTop: "24px",
      marginBottom: "16px",
    },
    p: {
      margin: "0 0 20px 0",
      textAlign: "justify",
    },
    quote: {
      margin: "20px 0",
      padding: "20px",
      background: "#f3f4f6",
      borderLeft: "4px solid #7c3aed",
      borderRadius: "8px",
      color: "#4b5563",
      fontStyle: "italic",
    },
    highlight: {
      background: "rgba(124, 58, 237, 0.1)",
      color: "#7c3aed",
      padding: "2px 6px",
      borderRadius: "4px",
      fontWeight: "500",
    },
    list: {
      margin: "0 0 20px 20px",
      padding: "0",
    },
    listItem: {
      marginBottom: "10px",
    },
    code: {
      display: "block",
      background: "#1e1e1e",
      color: "#d4d4d4",
      padding: "15px",
      borderRadius: "8px",
      fontFamily: "Consolas, Monaco, 'Andale Mono', monospace",
      fontSize: "14px",
      overflowX: "auto",
      margin: "20px 0",
      whiteSpace: "pre-wrap",
    },
    hr: {
      border: "none",
      borderTop: "2px dashed #e5e5e5",
      margin: "30px 0",
    }
  },
  emotional: {
    container: {
      padding: "20px",
      fontSize: "17px",
      lineHeight: "1.8",
      color: "#4a4a4a",
      fontFamily: "Optima, 'Microsoft Yahei', serif",
    },
    h1: {
      fontSize: "24px",
      fontWeight: "normal",
      color: "#834444",
      textAlign: "center",
      marginTop: "40px",
      marginBottom: "30px",
      borderBottom: "1px solid #e5e5e5",
      paddingBottom: "15px",
    },
    h2: {
      fontSize: "20px",
      fontWeight: "normal",
      color: "#834444",
      marginTop: "30px",
      marginBottom: "20px",
    },
    p: {
      margin: "0 0 24px 0",
      letterSpacing: "0.05em",
    },
    quote: {
      margin: "40px 20px",
      color: "#834444",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "18px",
    },
    highlight: {
      textDecoration: "underline",
      textDecorationColor: "#fca5a5",
      textDecorationThickness: "2px",
      textUnderlineOffset: "4px",
    },
    list: {
      margin: "0 0 24px 20px",
    },
    listItem: {
      marginBottom: "12px",
    },
    code: {
      display: "block",
      background: "#fff1f2",
      color: "#881337",
      padding: "15px",
      borderRadius: "8px",
      fontFamily: "serif",
      fontSize: "14px",
      margin: "20px 0",
      border: "1px solid #fecdd3",
    },
    hr: {
      border: "none",
      borderTop: "1px solid #fca5a5",
      margin: "40px 100px", // Short center line
    }
  },
  minimal: {
    container: {
      padding: "20px",
      fontSize: "16px",
      lineHeight: "1.8",
      color: "#1a1a1a",
      fontFamily: "-apple-system, sans-serif",
    },
    h1: {
      fontSize: "24px",
      fontWeight: "900",
      color: "#000",
      marginTop: "40px",
      marginBottom: "20px",
      letterSpacing: "-0.03em",
    },
    h2: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#000",
      marginTop: "30px",
      marginBottom: "16px",
    },
    p: {
      margin: "0 0 24px 0",
    },
    quote: {
      margin: "30px 0",
      paddingLeft: "20px",
      borderLeft: "2px solid #000",
      color: "#666",
    },
    highlight: {
      background: "#000",
      color: "#fff",
      padding: "2px 6px",
    },
    list: {
      margin: "0 0 24px 20px",
    },
    listItem: {
      marginBottom: "8px",
    },
    code: {
      display: "block",
      background: "#f4f4f5",
      color: "#18181b",
      padding: "15px",
      borderRadius: "0",
      fontFamily: "monospace",
      fontSize: "13px",
      margin: "20px 0",
      borderLeft: "2px solid #000",
    },
    hr: {
      border: "none",
      borderTop: "1px solid #000",
      margin: "30px 0",
    }
  },
};

const toStyleString = (style: React.CSSProperties): string => {
  return Object.entries(style)
    .map(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${kebabKey}:${value}`;
    })
    .join(";");
};

// Improved Markdown Parser using Tokenizer pattern
export function processContent(text: string, preset: StylePreset = "tech"): string {
  if (!text) return "";
  const style = themes[preset];
  
  let html = `<div style="${toStyleString(style.container)}">`;
  
  // Normalize line endings
  const normalizedText = text.replace(/\r\n/g, "\n");
  
  // Definition of block patterns
  const patterns = [
    { type: 'code', regex: /^```[\s\S]*?^```/gm }, // Code blocks
    { type: 'hr', regex: /^---$/gm },               // Horizontal rules
    { type: 'h1', regex: /^#\s+(.+)$/gm },          // H1
    { type: 'h2', regex: /^##\s+(.+)$/gm },         // H2
    { type: 'quote', regex: /^>\s?([\s\S]*?)(?=\n\n|$)/gm }, // Blockquotes
    { type: 'list', regex: /^((?:[-*]\s+.+\n?)+)/gm } // Lists
  ];

  // We will split the text by these recognized blocks? 
  // Easier approach: Split by double newline to get paragraphs, 
  // then check if a paragraph MATCHES a block type.
  // HOWEVER, Code blocks contain newlines.
  
  // Robust Strategy: 
  // 1. Identify Code Blocks FIRST and replace with placeholders to protect them.
  // 2. Process the rest normally.
  
  const codeBlocks: string[] = [];
  let protectedText = normalizedText.replace(/^```(\w*)\n([\s\S]*?)^```/gm, (match) => {
      codeBlocks.push(match); // Store full match for later parsing if needed, or just content
      // Note: regex match logic above captures [1]=lang, [2]=content
      return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  const blocks = protectedText.split(/\n\s*\n/);

  blocks.forEach((block) => {
    block = block.trim();
    if (!block) return;

    // Restore Code Block
    if (block.match(/^__CODE_BLOCK_\d+__$/)) {
        const index = parseInt(block.replace("__CODE_BLOCK_", "").replace("__", ""));
        const originalCode = codeBlocks[index];
        // Extract content from ```...```
        const contentMatch = originalCode.match(/^```(\w*)\n([\s\S]*?)^```/m);
        if (contentMatch) {
            // const lang = contentMatch[1];
            const codeContent = contentMatch[2];
            html += `<pre style="${toStyleString(style.code)}"><code>${codeContent.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
        }
        return;
    }

    const lines = block.split("\n").map(l => l.trim());
    const firstLine = lines[0];

    // Detect Block Types
    if (block === "---" || block === "***") {
        html += `<hr style="${toStyleString(style.hr)}" />`;
    } 
    else if (lines.length === 1 && firstLine.startsWith("# ")) {
        const content = block.replace(/^#\s+/, "");
        html += `<h1 style="${toStyleString(style.h1)}">${parseInline(content, style)}</h1>`;
    }
    else if (lines.length === 1 && firstLine.startsWith("## ")) {
        const content = block.replace(/^##\s+/, "");
        html += `<h2 style="${toStyleString(style.h2)}">${parseInline(content, style)}</h2>`;
    }
    else if (firstLine.startsWith(">")) {
        // Quote
        const content = lines.map(l => l.replace(/^>\s?/, "")).join("<br/>");
        html += `<blockquote style="${toStyleString(style.quote)}">${parseInline(content, style)}</blockquote>`;
    }
    else if (lines.every(l => l.startsWith("- ") || l.startsWith("* ") || /^\d+\./.test(l))) {
        // List
        html += `<ul style="${toStyleString(style.list)}">`;
        lines.forEach(line => {
            const cleanText = line.replace(/^[-*]\s+|\d+\.\s+/, "");
            html += `<li style="${toStyleString(style.listItem)}">${parseInline(cleanText, style)}</li>`;
        });
        html += `</ul>`;
    }
    else {
        // Normal Paragraph
        // Restore headers if they were multiline? No, assume header is single line in this logic.
        // Fallback for strict H1/H2 matching failing:
        if (firstLine.startsWith("#")) {
             // Maybe a H3 or H4, treat as H2/Bold?
             const content = lines.join("<br/>").replace(/^#+\s+/, "");
             html += `<h2 style="${toStyleString(style.h2)}">${parseInline(content, style)}</h2>`;
        } else {
             const content = lines.join("<br/>");
             html += `<p style="${toStyleString(style.p)}">${parseInline(content, style)}</p>`;
        }
    }
  });

  html += "</div>";
  return html;
}

// Helper for inline styles (bold, link, code span)
function parseInline(text: string, style: ThemeStyles): string {
    return text
        // Bold
        .replace(/\*\*(.*?)\*\*/g, `<span style="${toStyleString(style.highlight)}">$1</span>`)
        // Italic
        .replace(/\*(.*?)\*/g, `<em>$1</em>`)
        // Inline Code
        .replace(/`([^`]+)`/g, `<code style="background:rgba(0,0,0,0.05); padding:2px 4px; border-radius:3px;">$1</code>`);
}

// Keep renderAIBlocks for backward compatibility or future JSON use
export interface AIBlock {
  type: string;
  content: string;
}

export function renderAIBlocks(blocks: AIBlock[], preset: StylePreset = "tech"): string {
    // ... Stub or partial implementation if needed ...
    // Since we are using Streaming Text now, this is less used, but we can map it to processContent logic.
    const text = blocks.map(b => {
        if (b.type === 'h1') return `# ${b.content}`;
        if (b.type === 'h2') return `## ${b.content}`;
        if (b.type === 'quote') return `> ${b.content}`;
        if (b.type === 'list') return Array.isArray(b.content) ? b.content.map((i:string) => `- ${i}`).join("\n") : b.content;
        return b.content;
    }).join("\n\n");
    return processContent(text, preset);
}
