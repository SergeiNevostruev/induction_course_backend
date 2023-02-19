import http from "node:http";
import fs from "node:fs/promises";
import { join } from "node:path";
import { parse } from "url";

const path = join(process.cwd(), 'scr', 'index.html')

const server = http.createServer((req, res) => {
    console.clear();
    console.log(req.method, parse(req.url), 
    // req.headers
    );
    if (req.method === "GET" && parse(req.url).pathname === "/") {
        fs.readFile(path, {encoding: 'utf8'})
        .then((file) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(file);
        }).catch(e => {
            console.log(e);
        })
    } else if (req.method === "POST") {
        let input = '';
        req.on('data', (chunk) => {
            input += chunk.toString();
        });
        req.on('end', () => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end( 'Return ---> ' + input);
        })

    } else {
        res.writeHead(404);
        res.end('404 Error');
    }
});

server.on('clientError', (err, socket) => {
    console.log(err);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(8000);