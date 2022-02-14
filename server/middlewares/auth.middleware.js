const { validateAccessToken } = require('../helpers/jwt');
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        validateAccessToken(token,req, res, next)
    } else {
        return res.status(401).json({
            message: "Unauthourized"
        });
    }
};

module.exports = {
    authenticateToken
}