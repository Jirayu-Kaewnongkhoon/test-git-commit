const testMiddleware = (req, res, next) => {
    console.log('middleware');
    next();
}

module.exports = {
    testMiddleware
}