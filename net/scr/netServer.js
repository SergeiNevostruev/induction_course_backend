import net from "node:net";

console.log("---- Server ----");

const socketHandler = (socket) => {
    // console.log(socket);
    console.log(socket.address());
    socket.write("Hello!");
    socket.on('connect', () => {
        console.log("Произошло соединение!");
    });
    socket.on('data', (data) => {
        console.log('Client write --->', data.toString());
    });
    socket.on('end', () => {
        console.log("Client disconnect");
    });
    socket.on('error', (e) => {
        console.log(e);
    });
}

const server = net.createServer(socketHandler);

server.listen(3000);