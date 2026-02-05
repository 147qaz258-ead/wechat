// Using global fetch (Node 18+)

async function testStressEndpoint() {
    console.log("Testing full application flow with LARGE payload...");
    
    // Generate ~4KB of text
    const longText = "AI不仅仅是工具，它是伙伴。".repeat(200);
    console.log("Payload size:", longText.length, "chars");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 300000); // 5 min timeout

    const startTime = Date.now();
    try {
        const response = await fetch("http://localhost:3000/api/enhance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: longText
            }),
            signal: controller.signal
        });
        
        clearTimeout(timeout);
        const duration = Date.now() - startTime;

        console.log(`Response Status: ${response.status} (took ${duration}ms)`);
        
        const text = await response.text();
        if (response.ok) {
            try {
                const json = JSON.parse(text);
                console.log("SUCCESS! Got valid JSON response.");
                console.log("Blocks count:", json.blocks ? json.blocks.length : 0);
            } catch (e) {
                console.log("Valid 200 OK, but invalid JSON?");
                console.log("RECEIVED BODY:", text);
            }
        } else {
            console.error("Server Error Body:", text);
        }

    } catch (error) {
        console.error("Request Failed:", error);
    }
}

testStressEndpoint();
