/* eslint-disable-next-line no-unused-vars */ // - express error handler middleware MUST always have four arguments
function errorHandlerMiddleware(err, req, res, next) {
    if (err.isBoom) {
        res.status(err.output.statusCode).send(err.output)
    } else {
        res.status(500).send('500 happened')
    }
}

module.exports = errorHandlerMiddleware
