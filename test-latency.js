const axios = require('axios');

const API_KEY = "912aab62-7c0b-40e3-8f19-1bf80826e258";
const ENDPOINT_ID = "ep-20260109183327-m5ndl"; 
const BASE_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

async function testLatency() {
    console.log("Starting Latency Test...");
    const longText = "AI不仅仅是工具，它是伙伴。".repeat(100); // 1400 chars (Medium payload)
    console.log("Payload Length:", longText.length);

    const start = Date.now();
    let dnsDone, connectDone, ttfbDone;

    try {
        // Use a raw request to inspect timing if possible, but axios interceptors work too.
        // For simplicity, we just measure total time for non-stream.
        // To measure TTFB with Axios on a non-stream response is hard because it waits for end.
        // SO we will use STREAM: TRUE for this test to measure TTFB!
        
        console.log("Sending Stream Request to measure TTFB...");
        
        const response = await axios.post(BASE_URL, {
            model: ENDPOINT_ID,
            messages: [
                { role: "user", content: "请复述这段话:\n" + longText }
            ],
            stream: true // ENABLE STREAM to check if packets arrive quickly
        }, {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            responseType: 'stream',
            timeout: 60000
        });

        const ttfb = Date.now() - start;
        console.log(`[Timer] TTFB (Time to First Byte): ${ttfb}ms`);
        
        let firstChunk = true;
        let chunkCount = 0;
        
        response.data.on('data', (chunk) => {
            chunkCount++;
            if (firstChunk) {
                console.log(`[Timer] First chunk received at: ${Date.now() - start}ms`);
                firstChunk = false;
            }
            // console.log("Got chunk size:", chunk.length);
        });

        response.data.on('end', () => {
            const totalProfile = Date.now() - start;
            console.log(`[Timer] Total Time: ${totalProfile}ms`);
            console.log(`[Timer] Total Chunks: ${chunkCount}`);
            console.log(`[Timer] Avg Speed: ${(totalProfile / chunkCount).toFixed(2)} ms/chunk (Rough est)`);
            
            if (ttfb > 5000) {
                 console.log("ANALYSIS: Slow Start. AI processing or Connection setup is slow.");
            } else if (totalProfile - ttfb > 10000 && chunkCount < 50) {
                 console.log("ANALYSIS: Slow Download. Network throughput is low.");
            } else {
                 console.log("ANALYSIS: Speed seems normal for streaming.");
            }
        });

    } catch (e) {
        console.error("Error:", e.message);
        if (e.response) console.error(e.response.data);
    }
}

testLatency();
