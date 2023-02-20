const bcrypt = require('bcryptjs');
const User = require('../models/userModel')

const registerUser = async(req, res) => {
    if(Object.keys(req.body).length > 0) {
        const { email, password } = req.body;

        // check fieilds 
        if (!email || !password ) return console.log('all fields are required');

        // check email
        const isUserExist = await User.findOne({ email });

        // if (isUserExist) return console.log('this email is already in use');
        if (isUserExist) return res.status(422).json({error:'this email is already in use'});

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const user = await User.create({
            email,
            password: hashedPassword,
        })

        user ? res.status(201).json({
            // email: user.email,
            // password: hashedPassword,
            message : 'user is successfully created'
        })
        : null;
    }
}

module.exports = registerUser;