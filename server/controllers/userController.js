const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async (req, res, next) => {
    //destructure user and pass first
    const { username, password, city } = req.body;
    console.log('user: ', req.body.username, 'password: ', req.body.password)

    //edge case: if user or pass not passed in
    if (!username || !password || !city)
        return next({
            log: 'Missing username or password in userController.createUser',
            status: 400,
            message: { err: 'Username and password are required.' },
        });

    try {
        const user = await User.create({ username, password, city });
        res.locals.username = user.username
       // res.status(200).json({ message: 'successful signup' });//sent it back in server.js instead of here, not sure it makes a diff
        return next();
    }
    catch (err) {
        return next({
            log: `an error occurred in userController.createUser: ${err}`,
            status: 500,
            message: { err: 'An error occurred.' },
        });
    }
};

userController.verifyUser = async (req, res, next) => {
     const { username, password } = req.body;

    //edge case: if user or pass does not exist, return error
    if (!username || !password)
        return next({
            log: 'Missing username or password in userController.verifyUser',
            status: 400,
            message: { err: 'An error occurred' }
        })

    try {
          const user = await User.findOne({ username }); // search for user in DB
        // console.log('user: ', user)

        // store username into res.locals object
        res.locals.username = username;

        // check authentication
        if (!user) {
            console.log('user not found OR password does not match');
            res.redirect('/signup');
        } else {
            // testing
            console.log('password: ', password);
            console.log('user.password: ', user.password);

            //check that password is is what is 
            const result = await bcrypt.compare(password, user.password);

            console.log('result: ', result)
            // if password doesn't match, redirect client to /signup page
            if (!result) return res.redirect('/signup');
            else {
                res.locals.id = user.id;
                return next();
            }
        }

    } catch (err) {
        return next({
            log: `An erorr occured in userController.verifyUser: ${err}`,
            status: 500,
            message: { err: 'An error occured.' },
        });

    }
};

module.exports = userController;