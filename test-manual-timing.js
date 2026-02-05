const axios = require('axios');

const API_KEY = "912aab62-7c0b-40e3-8f19-1bf80826e258";
const ENDPOINT_ID = "ep-20260109183327-m5ndl"; 
const BASE_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

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

async function runBenchmark() {
    console.log("Generating 4000-char realistic text...");
    // Generate a pseudo-realistic article to avoid simple repetition patterns that might trigger compression optimization
    const paragraphs = [
        "人工智能正在改变我们的生活方式，从智能家居到自动驾驶，无处不在。",
        "深度学习作为AI的核心技术，模拟人脑神经网络，实现了惊人的识别能力。",
        "在医疗领域，AI辅助诊断大大提高了癌症早期筛查的准确率，挽救了无数生命。",
        "教育行业也迎来了变革，个性化推荐算法让因材施教成为可能。",
        "然而，隐私保护和伦理问题也随之而来，我们需要建立健全的法律法规。",
        "未来的工作会被AI取代吗？这取决于我们如何与机器协作，发挥人类独有的创造力。",
        "量子计算的突破将为AI提供指数级的算力支持，开启新的纪元。",
        "从ChatGPT到Sora，生成式AI的爆发式增长让人类惊叹于硅基智能的潜力。",
        "我们不仅要关注技术本身，更要关注技术背后的价值观和对社会结构的影响。",
        "让我们拥抱变化，终身学习，在这个快速演进的时代找到自己的位置。"
    ];
    
    let longText = "";
    while (longText.length < 4000) {
        longText += paragraphs[Math.floor(Math.random() * paragraphs.length)] + "\n";
    }
    longText = longText.substring(0, 4000); // Exact 4000 chars
    
    console.log(`Payload prepared: ${longText.length} chars.`);
    console.log("Sending request (Non-Streaming)...");
    
    const start = Date.now();
    
    try {
        const response = await axios.post(BASE_URL, {
            model: ENDPOINT_ID,
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: "用户文本：\n" + longText }
            ],
            temperature: 0.3
        }, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            timeout: 300000 // 5 mins
        });
        
        const duration = Date.now() - start;
        const content = response.data.choices[0].message.content;
        
        console.log("--------------------------------------------------");
        console.log(`BENCHMARK SUCCESS`);
        console.log(`Total Duration: ${(duration / 1000).toFixed(2)} seconds`);
        console.log(`Output Length: ${content.length} chars`);
        console.log(`Speed: ${(content.length / (duration / 1000)).toFixed(2)} chars/sec`);
        console.log("--------------------------------------------------");

    } catch (e) {
        const duration = Date.now() - start;
        console.log(`BENCHMARK FAILED after ${(duration / 1000).toFixed(2)}s`);
        console.error(e.message);
        if (e.response) console.error(e.response.data);
    }
}

runBenchmark();
