const str = process.argv[2];

const checkBracketType = (char) => {
    const result = {
        isBracket: false,
        isOpenType: false,
    }
    switch (char) {
        case '(':  
        case '[':
        case '{':
        case '<':          
            return {
                isBracket: true,
                isOpenType: true,
            };
        case ')':  
        case ']':
        case '}':
        case '>':          
            return {
                isBracket: true,
                isOpenType: false,
            };
        default:
            break;
    }
    return result;

}

const getCloseBracket = (char) => {
    switch (char) {
        case '(': 
            return ')';
        case '[':
            return ']';
        case '{':
            return '}';
        case '<':   
            return '>';    
        default:
            return false;
    }
}

const bracket = (str) => {
    const stack = [];    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const flags = checkBracketType(char);
        if (!flags.isBracket) continue;
        if (flags.isOpenType) {
            stack.push(char);
        } else if (stack.length) {
            const open = stack.pop();
            if (getCloseBracket(open) === char) {
                continue;
            } else {
                return false;
            }
        } 
    }
    return stack.length === 0 ? true : false;
}

console.log(str);
console.log(bracket(str));