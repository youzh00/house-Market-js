const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({'message':'Cookie not found'});
    const refreshToken = cookies.jwt;

    const user = await UserModel.findOne({ refreshToken }).exec();
    if (!user) return res.status(403).json({'message': 'Refresh token not found'}); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user._id !== decoded._id) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { _id: user._id.toString() },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '40s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }