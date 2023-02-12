import { createReadStream, createWriteStream, readFileSync, writeFile } from "fs";
import { gzip, unzip, createGzip, createUnzip } from "zlib";
import { join } from "path";
import { pipeline } from "stream";

const pathIn = join(process.cwd(), 'file.txt');
const pathOut = join(process.cwd(), 'file.txt.gz');

const data = "HelloWorldHelloWorldHelloWorldHelloWorld123";

// gzip(data, (e, res) => {
//     console.log("zip --->", res);
//     writeFile(pathOut, res, {}, (e) => {
//         console.log(e);
//     })
// });

// unzip(readFileSync(pathOut), (e, res) => {
//     console.log(res);
//     writeFile(pathIn, res, {}, (e) => {
//         console.log(e);
//     })
// })

const input = createReadStream(pathIn);
const output = createWriteStream(pathOut);

pipeline(input, createGzip(), output, (e) =>{});

input.on('data', (d) => {
    console.log(d);
})