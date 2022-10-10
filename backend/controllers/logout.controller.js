const UserModel = require('../models/user.model');

const LogoutUser = async (req, res) => {
    // On client, also delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(200).json({'message':'Cookie  not found'}); //No content
    const refreshToken = cookies.jwt;
    
    console.log('Logging out.......................................')
    // Is refreshToken in db?
    const user = await UserModel.findOne({ refreshToken }).exec();
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.status(204).json({'message': 'Refresh token not found'});
    }

    // Delete refreshToken in db
    user.refreshToken = '';
    const result = await user.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(204).json({'message': 'Logout Successfully'});
}

module.exports = { LogoutUser }