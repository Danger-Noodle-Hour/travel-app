const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser'); //if we add cookies 
const mongoose = require("mongoose");
const apiRouter = require('./routes/api.js');
const MongoStore = require('connect-mongo'); //used to interface with express-session
const PORT = 3000;
const session = require('express-session');
const userController = require ('./controllers/userController.js')
const cors = require('cors');



//Allowing all IP Addresses via Atalas, need to change settings in Atlas for this to happen
const connectionString = 'mongodb+srv://solo:thisisdumb75@cluster0.6zuzqbm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';//will need mongoose connect function

mongoose.connect(connectionString, {
    useNewUrlParser: true, //heads up: terminal says useNewUrlParser and useUnifiedTopology are deprecated and have no effect
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Connection error: ', error)
});

// define session here via express-session. cookie-parser no longer needed 
app.use(session({
    secret: 'thisisacoolapp', //used to create hash to sign session ID cookie. required
    store: MongoStore.create({
        mongoUrl: connectionString,
        collection: 'mySessionCollection'}),//using connect-mongo as a session store instead of MemoryStore
    cookie:{
        sameSite: 'strict', //same site enforcement, not sure if we need it
    }
}));
app.use(cors());app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//static files
app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/map/api', (req, res, next) => {
    console.log('Request received for /map:', req.method, req.url);
    next();
}, apiRouter);

app.use('/', console.log('going to api file'), apiRouter);

//this will route any get requests back to front-end so we can use react-router
//going to wait until we rearrange their files before committing to a file path
app.get('*', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../build/index.html')); 
});

app.post('/signup', userController.createUser, (req, res) => {
    return res.status(200).json({user: res.locals.newUser});
})

//catch all error handler
app.use((req, res) => res.status(404).send('This page does not exist'));

//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: `Express error handler caught unknown middleware error: ${err}`,
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () =>  console.log(`Server is running on port ${PORT}`));