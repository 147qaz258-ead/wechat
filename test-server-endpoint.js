// Using global fetch (Node 18+)

async function testAppEndpoint() {
    console.log("Testing full application flow via http://localhost:3000/api/enhance...");
    
    // 10 minute timeout to be safe, though api has 60s timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000); 

    try {
        const response = await fetch("http://localhost:3000/api/enhance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: "这是一个测试文本。AI不仅仅是工具，它是伙伴。"
            }),
            signal: controller.signal
        });
        
        clearTimeout(timeout);

        console.log("Response Status:", response.status);
        
        const text = await response.text();
        console.log("Raw Response Body:", text);

        if (response.ok) {
            try {
                const json = JSON.parse(text);
                console.log("\nParsed JSON Blocks:");
                console.log(JSON.stringify(json, null, 2));
            } catch (e) {
                console.log("Valid 200 OK, but response wasn't JSON?");
            }
        }

    } catch (error) {
        console.error("Request Failed:", error);
    }
}

testAppEndpoint();
