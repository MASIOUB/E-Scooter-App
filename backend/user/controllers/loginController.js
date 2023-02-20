const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const generateToken = require('../middlewares/generateToken');

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email});

    if (!user) {
        return res.status(400).json({
            error: "user not found",
        });
    };

    const validePassword = await bcrypt.compare(password, user.password);

    if (!validePassword) {
        return res.status(400).json({
            error: "invalid password",
        });
    };

    if (user && validePassword) {
        return res.status(200).json({
            token: generateToken(user.id),
        })
    }
}

module.exports = loginUser;