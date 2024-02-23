const express = require('express');
const path = require('path');

const userController = require('../controllers/userController');


const router = express.Router();


router.get('/', (req, res) => {
    console.log('get request is a ok')
    return res.status(200).sendFile(path.resolve(__dirname, '../../src/components/Login.jsx' ))
});

router.get('/signup', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../../src/components/Signup.jsx'))
});


router.post('/signup', userController.createUser, (req, res) => {
    return res.status(200).json({ redirect: './map' })
});

router.post('/login', userController.verifyUser, (req, res) => {
    console.log('You have logged in!')
    return res.status(200).json({user: res.locals.id});
});


//will need to verify that they have an express session first
router.get('/map', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../../src/components/Map.jsx'))
});



module.exports = router;
