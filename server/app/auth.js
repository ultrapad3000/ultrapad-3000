const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('@srv/models/user.model')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'ULTRPD'
}

const strategy = new JwtStrategy(jwtOptions, async (payload, next) => {
    const user = await User.findById(payload.id)

    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})

function auth(app) {
    app.use(passport.initialize())
    app.use(passport.session())

    passport.use(strategy)

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user, done) => {
        done(null, user)
    })

    // Auth-related routes:
    app.post('/auth/login', async (req, res, next) => {
        const {username, password} = req.body

        const user = await User.findOne({where: {username}})

        if (!user) {
            res.status(401).json({message: 'no such user found'})
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {id: user.id}
            const token = jwt.sign(payload, jwtOptions.secretOrKey)
            res.json({message: 'ok', token})
        } else {
            res.status(401).json({message: 'passwords did not match'})
        }
        next()
    })

    app.post('/auth/reg', async (req, res, next) => {
        const {username, email, password} = req.body
        // TODO: add server-side validation
        const user = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        })

        res.json(user)
        next()
    })

    app.get('/auth/info', passport.authenticate('jwt'), async (req, res, next) => {
        res.json(req.user)
        next()
    })
}

module.exports = auth
