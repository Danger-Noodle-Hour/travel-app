const express = require('express');
const path = require('path');
//not sure if cookie parser needs to be in server or api or both so stay tuned
const cookieParser = require('cookie-parser');

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
<<<<<<< HEAD

const router = express.Router();

router.get('/')
=======
const apiController = require('../controllers/apiController');

const router = express.Router();
router.use(cookieParser());

router.get('/', cookieController.setCookie, (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../../src/components/Login.jsx' ))
});

router.get('/signup', (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../../src/components/Signup.jsx'))
});

//will add in below once they are built out: cookieController.setSSIDCookie, sessionController.startSession,  n
router.post('/signup', userController.createUser, (req, res) => {
    return res.status(200).json({ redirect: './map' })
});

//will add in below once they are built out: cookieController.setSSIDCookie, sessionController.startSession,
router.post('/login', userController.verifyUser, (req, res) => {
    return res.status(200).json({ redirect: './map' })
});

router.get('/map/api/:stateName', apiController.getStateData, (req, res) => {
    const { stateName } = req.params;
    console.log(stateName)
    console.log(req.params)
    // return res.status(200).sendFile(path.resolve(__dirname, '../../src/components/Map.jsx'))
    // return fetched data in response
    return res.status(200).json({hello: 'test'})
});

router.get('/map', sessionController.isLoggedIn, (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../../src/components/Map.jsx'))
});


>>>>>>> 5e545d546c311c1be0d7b6bb7153048d84ef200b
