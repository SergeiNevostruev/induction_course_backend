const tryCatchDecorator = (collback) => (...arg) => {
    try {
        return collback();
    } catch (error) {
        console.log(error.message)
        return {
            message: error.message
        }
    }
}

module.exports.func = tryCatchDecorator;
// module.exports.func = 1;
