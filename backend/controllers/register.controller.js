const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');


//Register an user to database
//path: /auth/register
// public
const RegisterUser = async (req, res) => {
    const userBody = req.body;
    const {userName,password,email,phoneNumber,address,bio,age} = userBody;
    userBody.avatar = "/profilePictures/sample.png";
    if (!userName || !password || !email || !phoneNumber || !address || !bio || !age) {
        return res.status(400).json({ 'message': 'User Informations are required.' });
    }

    // check for duplicate usernames in the db
    const duplicate = await UserModel.findOne({ email: userBody.email }).exec();
    if (duplicate) return res.status(409).json({'message':'User email already exist'}); 

    try {
        //encrypt the password
        // const hashedPwd = await bcrypt.hash(userBody.password, 10);
        // userBody.password = hashedPwd
        //create and store the new user
        const user = new UserModel(userBody);
        await user.save();

        res.status(201).json({ 'success': `New user ${user?.userName} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}





module.exports = { RegisterUser };