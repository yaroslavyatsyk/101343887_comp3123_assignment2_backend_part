"use strict"
const userDestinations = {
    signUp: {
        path: "/signup",
		successCode: 201,
		failureCode: 400
    },
    login : {
        path: "/login",
        successCode: 200,
		failureCode: 401
    }
}

module.exports = userDestinations