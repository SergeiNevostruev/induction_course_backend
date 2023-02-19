import net from "node:net";

console.log("---- Client ----");

const socket = new net.Socket();

socket.connect({
    port: 3000
}, () => {
    socket.write('Привет');
})

socket.on('data', (data) => {
    console.log('Server --->', data.toString());
    socket.end()
})

socket.on('error', (e) => {
    console.log('Error');
})

