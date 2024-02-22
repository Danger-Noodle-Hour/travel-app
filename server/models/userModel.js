const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10; 

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6},
    city: {type: String, required: true},
})

//pre-hook to hash password
userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_WORK_FACTOR,
        (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            return next();
        });
    })


//for user roles, add access level ex--> access:{ level: 5, group; "paid"}

module.exports = mongoose.model('User', userSchema); 