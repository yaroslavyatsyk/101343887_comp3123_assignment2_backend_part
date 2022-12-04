"use strict"
const userDestinations = {
    signup: {
        path: "/signup",
		successCode: 201,
		failureCode: 400
    },
    signin : {
        path: "/signin",
        successCode: 200,
		failureCode: 401
    }
}

module.exports = userDestinations