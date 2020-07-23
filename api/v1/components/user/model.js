const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs'); 

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},

    sessions: [{
        token: {type: String, required: true},
        expiresAt: {type: Number, required: true}
    }],

    country: {type: String},
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    favorites: [{type: Schema.Types.ObjectId, ref: 'Item'}],
    phone: {type: String, required: true},

});

/**
 * MIDDLEWARE
 * Hash the user's entered password before saving the document to the database
 */
UserSchema.pre('save', function(next){
    let user = this;

    // The amount of hashing rounds for the password
    let costFactor = 10;

    if(user.isModified('password')) {
        // if the password field has been edited/changed then run this code
        
        // Generate salt and hash the password
        bcrypt.genSalt(costFactor, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

// Instance Methods
require('./instance.methods')(UserSchema);


// Model Methods
require('./model.methods')(UserSchema);

const User = mongoose.model('User', UserSchema);


module.exports = User;