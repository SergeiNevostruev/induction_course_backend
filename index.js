// import os from "os";
import readline from "readline";
import { join, extname, parse } from "path";
import { readFileSync, writeFileSync, existsSync } from "fs";
import {core} from "./calc.js";

// console.log(os.arch())
// console.log('Nodemon');

// for (let i = 0; i < 10; i++) {
//     console.log(i);    
// }

// process.stdin.on('data', (d) => {
//     const data = d.toString();
//     const str = data.split(' ');
//     console.log('Вы ввели ---->', data);
//     console.log('Калькулятор ---->', core(Number(str[0]), str[1], Number(str[2])));
// })
// process.stdout
// process.stderr
// console.log(core)

// const rl = readline.createInterface(
//     {
//     input: process.stdin,
//     output: process.stdout
//     } 
// );

// rl.question('What is your favorite food? ', (answer) => {
//     console.log(`Oh, so your favorite food is ${answer}`);
//   })

// const file1 = readFileSync('calc.js', {encoding: 'utf8'});
// console.log(file1);

// if (existsSync('calc1.js')) {
//     console.log('Файл calc1.js существует!!!')
// } else {
//     writeFileSync('calc2.js', file1);
// }

console.log(parse(join(process.cwd(), 'calc.js')) )


