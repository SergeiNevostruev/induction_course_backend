const tryCatch = require('./tryCatch.cjs');
const core = require('./core.cjs');


const programm = () => {
    if (process.argv.length > 5) {
        throw new Error('Слишком много аргументов');
    }

    const [_, __, n1, operator, n2] = process.argv;

    const help = "Программа-калькулятор, введите комманду в формате num1 + num2";

    if (n1 == "-h" || n1 == "--help") {
        console.log(help);
        return {};
    }

    const num1 = Number(n1);
    const num2 = Number(n2);

    if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Введеные некорректные числа');
    }

    const result = core.core(num1, operator, num2)    
    return {
        number1: num1,
        operator,
        number2: num2,
        result
    }
}

const decorProgramm = tryCatch.func(programm);

console.log(decorProgramm());