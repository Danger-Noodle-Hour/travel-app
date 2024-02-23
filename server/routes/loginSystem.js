const express = require('express');
const path = require('path');

const userController = require('../controllers/userController');


const router = express.Router();

// app.use(express.static(path.resolve(__dirname, '../../build')));

router.get('/', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../../src/components/Login.jsx' ))
});

router.get('/signup', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../../src/components/Signup.jsx'))
});


router.post('/signup', userController.createUser, (req, res) => {
    return res.status(200).json({ redirect: './map' })
});

router.post('/login', userController.verifyUser, (req, res) => {
    return res.status(200).json({ redirect: './map' })
});


//will need to verify that they have an express session first
router.get('/map', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../../build/main.js'))
});



module.exports = router;
