const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    if (email=='' || password=='') return res.status(400).json({ 'message': 'Username and password are required.' });

    try {
        console.log("email: " + email);
        console.log("password: " + password);
        const user = await UserModel.findByCredentials(email,password);

        // create JWTs

        const accessToken = jwt.sign(
            { _id: user._id.toString() },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10000s' }
        );
        const refreshToken = jwt.sign(
            { _id: user._id.toString() },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving refreshToken with current user

        user.refreshToken = refreshToken;
        const result = await user.save();
        console.log(result);

        // Creates Secure Cookie with refresh token

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user

        res.status(200).json({ user, accessToken });

    } catch (error) {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

   
}

module.exports = { LoginUser };