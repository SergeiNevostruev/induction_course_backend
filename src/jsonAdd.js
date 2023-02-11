import { readFileSync, writeFileSync } from "fs";
import { parse, join } from "path";

const fileName = "obj.json";

const jsonAdd = (fileName, key, data) => {
    const pathRead = join(process.cwd(), 'src', fileName);
    let dataJson;
    try {
        dataJson = JSON.parse(readFileSync(pathRead, {encoding: 'utf8'}));
    } catch (e) {
        console.log(e);
        throw new Error('Некорректный json')
    }
    dataJson[key] = data;
    writeFileSync(pathRead,JSON.stringify(dataJson, null, 2), {encoding: 'utf8'});
}

// jsonAdd(fileName, 'name', 'Oleg');
// jsonAdd(fileName, 'age', 18);
jsonAdd(fileName, 'friends', ['Valera', 'Varya']);