const OpenAI = require("openai");

const API_KEY = "912aab62-7c0b-40e3-8f19-1bf80826e258";
const ENDPOINT_ID = "ep-20260109183327-m5ndl"; 

async function test() {
    console.log("Testing Volcengine API...");
    console.log("Endpoint:", ENDPOINT_ID);
    console.log("Base URL: https://ark.cn-beijing.volces.com/api/v3");

    const client = new OpenAI({
        apiKey: API_KEY,
        baseURL: "https://ark.cn-beijing.volces.com/api/v3",
    });

    try {
        const completion = await client.chat.completions.create({
            model: ENDPOINT_ID,
            messages: [
                { role: "user", content: "Hello, reply with exactly the word SUCCESS" }
            ],
            temperature: 0.3,
        });
        console.log("API_TEST_RESULT: SUCCESS");
        console.log("AI_RESPONSE:", completion.choices[0].message.content);
    } catch (error) {
        console.log("API_TEST_RESULT: FAILED");
        console.error("ERROR_DETAILS:", error.message);
    }
}

test();
