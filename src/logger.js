import { writeFileSync } from "fs";
import { join } from "path";
import { EOL } from "os";

const loggerDecorator = (func, logFileName) => (...args) => {
    const path = join(process.cwd(), 'src', logFileName);
    const result = func(...args);
    const strLog = `${new Date()}   функция: ${func.name}    аргументы: ${args}    результат: ${result}${EOL}`
    writeFileSync(path, strLog, {flag: 'a+', encoding: 'utf8'})
    return result;
}

function sum (a, b) {
    return a + b;
}

const sumWithLog = loggerDecorator(sum, "log.txt");

console.log(sumWithLog(1, 2));
console.log(sumWithLog(2, 2));
console.log(sumWithLog(3, 2));
console.log(sumWithLog(4, 2));