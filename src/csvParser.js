import { readFileSync, writeFileSync } from "fs";
import { EOL } from "os";
import { parse, join } from "path";
const fileName = "test.csv";

const csvParser = (fileName, sep = ';') => {
    const fileInfo = parse(fileName);
    const pathRead = join(process.cwd(), 'src', fileName);
    const pathWrite = join(process.cwd(), 'src', fileInfo.name + '.json');
    const data = readFileSync(pathRead, {encoding: 'utf8'}).split(EOL);
    const paramNames = data[0].split(sep);
    const paramInfo = data.slice(1);
    const arrForJson = [];
    for (const str of paramInfo) {
        const params = str.split(sep);
        const obj = {};
        for (let i = 0; i < paramNames.length; i++) {
            const key = paramNames[i];
            obj[key] = params[i];            
        }
        arrForJson.push(obj);
    }
    const json = JSON.stringify(arrForJson, null, 2);
    writeFileSync(pathWrite, json, {encoding: 'utf8'});
    return json;
}

csvParser(fileName);