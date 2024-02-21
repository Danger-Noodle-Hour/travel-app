const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async (req, res, next) => {
    //destructure user and pass first
    const { username, password } = req.body;

    //edge case: if user or pass not passed in
    if (!username || !password)
    return next({
        log: 'Missing username or password in userController.createUser',
        status: 400,
        message: { err: 'An error occurred' },
    });

    try {
        const user = await User.create({ username, password });
        res.locals.username = user.username
       // res.status(200).json({ message: 'successful signup'});//sent it back in server.js instead of here, not sure it makes a diff
        return next();
    }
    catch (err){
        return next({
            log: `an error occurred in userController.createUser: ${err}`,
            status: 500,
            message: { err: 'An error occurred.' },
        });
    }
};

module.exports = userController;