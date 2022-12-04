const mongoose = require('mongoose')
const RegExpression = require('../constants/RegularExpression')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        unique: true,
        index: true
    },
    email : {
        type: String,
        unique: true,
        validate(value) {
			return !/RegExpression.forValidEmail/.test(value)
		}
    },
    password : {
        type: String,
    }
    
})
const userModel = mongoose.model('users',userSchema)
module.exports = userModel