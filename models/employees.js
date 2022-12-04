const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    gender : {
        type: String,
        enum : ['Male', 'Female', 'Other'],
        default: 'Male'
    },
    salary : {
        type: Number,
        require: true
    }
})

const employeeModel = mongoose.model('employees', employeeSchema)

module.exports = employeeModel