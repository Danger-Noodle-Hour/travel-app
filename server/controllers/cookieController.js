const User = require ('../models/userModel'); //double check pathing
const cookieController = {};

cookiesController.setCookie = (req, res, next) => {
<<<<<<< HEAD

=======
res.cookie()
>>>>>>> 5e545d546c311c1be0d7b6bb7153048d84ef200b
};



cookiesController.setSSIDCookie = (req, res, next) => {
<<<<<<< HEAD

};
=======
res.cookie('ssid', res.locals.user._id,{
    maxAge: 50000,
    httpOnly: true,
    secure: true
})
console.log(res.cookie);
next();
}

;
>>>>>>> 5e545d546c311c1be0d7b6bb7153048d84ef200b

module.exports = cookieController;