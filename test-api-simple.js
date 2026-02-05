const OpenAI = require("openai");

const API_KEY = "912aab62-7c0b-40e3-8f19-1bf80826e258";
const ENDPOINT_ID = "ep-20260109183327-m5ndl"; 

async function test() {
    console.log("Testing Simple Chinese Prompt...");
    const client = new OpenAI({
        apiKey: API_KEY,
        baseURL: "https://ark.cn-beijing.volces.com/api/v3",
        timeout: 30000 
    });

    try {
        const completion = await client.chat.completions.create({
            model: ENDPOINT_ID,
            messages: [
                { role: "user", content: "请把这句话翻译成英文：你好。" }
            ],
            temperature: 0.3,
        });
        console.log("SUCCESS!");
        console.log("Content:", completion.choices[0].message.content);
    } catch (error) {
        console.error("FAILED:", error.message);
    }
}

test();
