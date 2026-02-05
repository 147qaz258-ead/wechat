const http = require('http');

const ports = [3000, 3001, 3002, 3003, 8080];

function checkPort(port) {
    return new Promise((resolve) => {
        const req = http.request({
            hostname: 'localhost',
            port: port,
            path: '/api/enhance',
            method: 'POST', // POST might return 400 or 500 if alive, which is better than 404 HTML
            headers: { 'Content-Type': 'application/json' }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const isHtml = data.trim().startsWith('<');
                console.log(`Port ${port}: Status ${res.statusCode}, IsHTML: ${isHtml}`);
                if (!isHtml && (res.statusCode === 400 || res.statusCode === 200 || res.statusCode === 500)) {
                    console.log(`FOUND POSSIBLE API ON PORT ${port}`);
                }
                resolve();
            });
        });

        req.on('error', (e) => {
            // console.log(`Port ${port}: Error ${e.message}`);
            resolve();
        });
        
        req.write(JSON.stringify({ text: "ping" }));
        req.end();
    });
}

(async () => {
    console.log("Scanning ports...");
    for (const p of ports) {
        await checkPort(p);
    }
})();
