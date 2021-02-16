module.exports = class CustomError extends Error {
    constructor(...params) {
        super(...params)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }
        this.name = 'CustomError'
        this.date = new Date()
    }
}
