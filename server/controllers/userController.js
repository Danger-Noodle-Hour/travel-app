const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController = {};


userController.createUser = async (req, res, next) => {
    // Destructure username, password, and city from request body
    const { username, password, city } = req.body;

    try {
        // Check if the username already exists in the database
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            // If the username is already taken, return an error response
            return res.status(400).json({ message: 'Username is already taken. Please choose a different one.' });
        }

        // If the username is not taken, create a new user
        const user = await User.create({ username, password, city });
        res.locals.username = user.username;
        return next();
    } catch (error) {
        // Handle any errors that occur during user creation
        return next({
            log: `An error occurred in userController.createUser: ${error}`,
            status: 500,
            message: { error: 'An error occurred.' },
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
        // res.locals.username = username;

        // check authentication
        if (!user) {
            return res.status(401).json({
                error: 'Invalid username or password',
            });
        } else {
            // testing
            // console.log('password: ', password);
            // console.log('user.password: ', user.password);

            //check that password matches in db
            const result = await bcrypt.compare(password, user.password);

            if(!result) {
                return res.status(401).json({
                    error: 'Invalid username or password'
                });
            }
            // if password doesn't match, redirect client to /signup page
            // if (!result) return res.redirect('/signup');//redirect happening on frontend
            else {
                res.locals.id = user.id;// is it _id?
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