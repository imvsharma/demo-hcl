const jwt = require('jsonwebtoken');
const config = require('config.json');

const generateAccessToken = payload => {
    return jwt.sign({ sub: payload }, process.env.SECRET, { expiresIn: '7d' });
}

const validateAccessToken = async (token, req, res, next) => {
    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthourized"
            });
        }

        req.user = user;
        next();
    })
}

module.exports = {
    generateAccessToken: generateAccessToken,
    validateAccessToken: validateAccessToken
}