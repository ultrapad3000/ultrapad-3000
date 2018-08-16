const errors = require('./errors.config')

const errorThrower = type => {
    const error = errors[type]

    return error || errors.unknown
}

module.exports = errorThrower
