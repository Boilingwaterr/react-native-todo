const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; // 0[bearer], 1[token]
        
        if (!token) {
            return res.status(401).json({message: 'The user is not logged in.'});
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({message: 'The user is not logged in.'});
    }
}
