"use strict"
const userDestinations = {
    signUp: {
        path: "/signUp",
		successCode: 201,
		failureCode: 400
    },
    signIn : {
        path: "/signIn",
        successCode: 200,
		failureCode: 401
    }
}

module.exports = userDestinations