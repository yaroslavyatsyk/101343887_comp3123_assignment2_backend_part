const mongoose = require('mongoose')
const appSchema = require('../constants/AppSchema')
const RegExpression = require('../constants/RegularExpression')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    email : {
        type: String,
        unique: true,
        required: true,
        validate(value) {
			return !/RegExpression.forValidEmail/.test(value)
		}
        
    },
    password : {
        type: String,
        required: true,
        validate(value) {
			return !/RegExpression.forStrongPassword/.test(value)
		},
        info: props => `${props.value} is not a strong password`
    }
    
},
{
    set: appSchema.userSet
})
const userModel = mongoose.model('users',userSchema)
module.exports = userModel