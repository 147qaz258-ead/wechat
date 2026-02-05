const OpenAI = require("openai");

const API_KEY = "912aab62-7c0b-40e3-8f19-1bf80826e258";
const ENDPOINT_ID = "ep-20260109183327-m5ndl"; 

const SYSTEM_PROMPT = `
你是一位专业的微信公众号文章编辑器。
你的任务是分析用户的原始文本，并将其格式化为结构化的 JSON 对象。
输出必须是遵循以下结构的有效 JSON 对象数组：
[ { "type": "paragraph", "content": "..." } ]
不要包含 Markdown 标记。
`;

async function test() {
    console.log("Testing with User Role Prompt & Timeout...");
    const client = new OpenAI({
        apiKey: API_KEY,
        baseURL: "https://ark.cn-beijing.volces.com/api/v3",
        timeout: 10000 // 10s timeout
    });

    try {
        const completion = await client.chat.completions.create({
            model: ENDPOINT_ID,
            messages: [
                // Move system prompt to user to see if it helps
                { role: "user", content: SYSTEM_PROMPT + "\n\n用户文本：\n简单的测试文本：AI不仅仅是工具，它是伙伴。" }
            ],
            temperature: 0.3,
        });
        console.log("SUCCESS!");
        console.log("Content:", completion.choices[0].message.content);
    } catch (error) {
        console.error("FAILED or TIMED OUT:", error.message);
    }
}

test();
