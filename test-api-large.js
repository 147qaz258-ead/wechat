const OpenAI = require("openai");

const API_KEY = "912aab62-7c0b-40e3-8f19-1bf80826e258";
const ENDPOINT_ID = "ep-20260109183327-m5ndl"; 

async function test() {
    console.log("Testing Volcengine API with LARGE payload...");
    
     // Generate ~4KB of text (matching the failing request)
    const longText = "AI不仅仅是工具，它是伙伴。".repeat(300);
    console.log("Payload size:", longText.length, "chars");

    const client = new OpenAI({
        apiKey: API_KEY,
        baseURL: "https://ark.cn-beijing.volces.com/api/v3",
        timeout: 60000 // 60s matching route.ts
    });

    try {
        const timeStart = Date.now();
        const completion = await client.chat.completions.create({
            model: ENDPOINT_ID,
            messages: [
                { role: "user", content: "请把这段话总结成JSON:\n" + longText }
            ],
            temperature: 0.3,
        });
        const duration = Date.now() - timeStart;
        console.log(`API_TEST_RESULT: SUCCESS (Took ${duration}ms)`);
        console.log("AI_RESPONSE_PREVIEW:", completion.choices[0].message.content.substring(0, 100));
    } catch (error) {
        console.log("API_TEST_RESULT: FAILED");
        console.error("ERROR_DETAILS:", error.message);
        if (error.cause) console.error("CAUSE:", error.cause);
    }
}

test();
