const axios = require('axios');

const API_KEY = "912aab62-7c0b-40e3-8f19-1bf80826e258";
const ENDPOINT_ID = "ep-20260109183327-m5ndl"; 
const BASE_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

const SYSTEM_PROMPT = `你是一位专业的微信公众号文章编辑器。...`; // Simplified

async function testAxios() {
    console.log("Testing Volcengine API using Axios (Matching route.ts)...");
    
    // Generate ~4KB of text (matching the failing request)
    const longText = "AI不仅仅是工具，它是伙伴。".repeat(300);
    console.log("Payload size:", longText.length, "chars");

    console.log(`[API] Using Axios. Env HTTP_PROXY: ${process.env.HTTP_PROXY || 'Not Set'}`);
    const timeStart = Date.now();

    try {
        const response = await axios.post(BASE_URL, {
            model: ENDPOINT_ID,
            messages: [
                { role: "system", content: "You are a helper." },
                { role: "user", content: "请把这段话总结成JSON:\n" + longText }
            ],
            temperature: 0.3
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            timeout: 120000, // 2 minutes matching failing route
            maxBodyLength: Infinity
        });

        const duration = Date.now() - timeStart;
        console.log(`[API] Success! Took ${duration}ms`);
        console.log("Response Preview:", response.data.choices[0].message.content.substring(0, 50));

    } catch (error) {
        const duration = Date.now() - timeStart;
        console.error(`[API] Failed after ${duration}ms`);
        console.error("Error Message:", error.message);
        console.error("Error Code:", error.code);
        if (error.response) {
            console.error("Response Status:", error.response.status);
            console.error("Response Data:", error.response.data);
        }
    }
}

testAxios();
