const WebSocket = require("ws");

const port = 5002;
const wss = new WebSocket.Server({ port: { port } });

//모든 클라이언트에 메시지 브로드캐스트
const broadcast = (message, sender) => {
    wss.clients.forEach((client) => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            console.log(message);
            client.send(JSON.stringify(message.toString()));
        }
    });
};

wss.on("connection", (ws) => {
    console.log("New client connected");

    //클라이언트로부터 메시지 수신
    ws.on("message", (message) => {
        console.log(`Received: ${message}`);
        broadcast(message, ws); // 다른 클라이언트에게 메시지 브로드캐스트
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log(`WebSocket server is running on ws://localhost:${port}/`);
