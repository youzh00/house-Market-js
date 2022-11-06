const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    
    if (!cookies?.jwt) return res.status(401).json({'message':'Cookie not found'});
    
    const refreshToken = cookies.jwt;

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            
            if (err ) res.status(403).json({ message: 'Forbidden' })

            const user = await UserModel.findById(decoded._id ).exec();

            if (!user) return res.status(401).json({ message: 'Unauthorized' })
            console.log("refresh token----------------------------------------------------")
            console.log(user)
            const accessToken = jwt.sign(
                { _id: user._id.toString() },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '2m' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }