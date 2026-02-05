import { NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.VOLC_API_KEY;
const ENDPOINT_ID = process.env.VOLC_ENDPOINT_ID; 
const BASE_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

const SYSTEM_PROMPT = `你是一位专业的微信公众号文章编辑器。
你的任务是优化用户的原始文本，使其更具吸引力、逻辑更清晰、排版更美观。
请保留核心含义，但可以进行润色。

格式要求：
- 请直接输出 Markdown 格式的文本。
- 使用 # 表示主标题（H1）。
- 使用 ## 表示副标题（H2）。
- 使用 > 表示金句或引用。
- 使用 - 或 1. 表示列表。
- 使用 **加粗** 来表示重点。

请不要输出任何 JSON 格式，也不要包含 \`\`\`markdown 代码块包裹，直接输出正文即可。
`;

export const maxDuration = 300; // 5 mins
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }
    
    console.log(`[API] Received request. Text length: ${text.length} chars.`);
    // Debug info for proxy environment
    console.log(`[API] Using Axios Stream. Env HTTP_PROXY: ${process.env.HTTP_PROXY || 'Not Set'}`);

    try {
        console.log(`[API] Sending streaming request to Volcengine...`);
        
        const response = await axios.post(BASE_URL, {
            model: ENDPOINT_ID,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: "用户文本：\n" + text }
            ],
            temperature: 0.3,
            stream: true, // Enable streaming
            proxy: false // Force direct connection, bypass system proxy
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            responseType: 'stream', // Important for Axios to return stream
            timeout: 300000 // 5 mins
        });

        // Create a ReadableStream to pipe the data to the client
        const stream = new ReadableStream({
            async start(controller) {
                const axiosStream = response.data;
                
                axiosStream.on('data', (chunk: Buffer) => {
                    const textChunk = chunk.toString();
                    // Volcengine/OpenAI streams data in "data: { ...JSON... }\n\n" format
                    // We need to parse it server-side or pass it raw?
                    // Passing raw matches typical SSE patterns, but let's clean it slightly 
                    // or just pass it through. 
                    // For simplicity and standard SSE compatibility, we pass the raw chunks.
                    // The client will handle parsing the SSE protocol.
                    controller.enqueue(new TextEncoder().encode(textChunk));
                });

                axiosStream.on('end', () => {
                    controller.close();
                });

                axiosStream.on('error', (err: any) => {
                    console.error("Stream error:", err);
                    controller.error(err);
                });
            }
        });

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error: any) {
        console.error(`[API] Axios Stream Error:`, error.message);
        
        return NextResponse.json({ 
            error: "AI Service Error", 
            details: error.message,
            code: error.code
        }, { status: 500 });
    }

  } catch (error: any) {
    console.error("[API] Route Handler Error:", error);
    return NextResponse.json({ 
        error: "Internal Server Error", 
        details: error.message 
    }, { status: 500 });
  }
}
