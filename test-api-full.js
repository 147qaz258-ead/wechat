const OpenAI = require("openai");

const API_KEY = "912aab62-7c0b-40e3-8f19-1bf80826e258";
const ENDPOINT_ID = "ep-20260109183327-m5ndl"; 

const SYSTEM_PROMPT = `你是一位专业的微信公众号文章编辑器。
你的任务是分析用户的原始文本，并将其格式化为结构化的 JSON 对象。
请不要改变核心含义或大幅重写文本，但你应该：
1. 识别并将文本分割成逻辑块。
2. 检测潜在的标题（h1, h2）。
3. 检测引用金句或关键结论（quote）。
4. 检测列表（list）。
5. 检测需要高亮的短语（highlight）。

输出必须是遵循以下结构的有效 JSON 对象数组：
[
  { "type": "h1 | h2 | p | quote | list | highlight", "content": "string..." }
]

规则：
- 如果段落过长，请在必要时进行拆分，保持阅读舒适度。
- 识别“金句”并将其设为 'quote' 或 'highlight' 类型。
- 确保输出的是纯 JSON 数组，不要包含 \`\`\`json 等 Markdown 标记。
`;

async function test() {
    console.log("Testing with Full Chinese Prompt...");
    const client = new OpenAI({
        apiKey: API_KEY,
        baseURL: "https://ark.cn-beijing.volces.com/api/v3",
    });

    try {
        const completion = await client.chat.completions.create({
            model: ENDPOINT_ID,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: "简单的测试文本：AI不仅仅是工具，它是伙伴。" }
            ],
            temperature: 0.3,
        });
        console.log("SUCCESS!");
        console.log("Content:", completion.choices[0].message.content);
    } catch (error) {
        console.error("FAILED:", error);
    }
}

test();
