"use strict"

const express = require("express")
const routes = express.Router()
const endpoints = require("../endDestinations/userDest")
const user = require("../../models/users");

routes.post(
	endpoints.signup.path,
	async (request, response) => {
		// Validate request
		if (Object.keys(request.body).length === 0) {
			return response
				.status(endpoints.signup.failureCode)
				.send({
					message: "User account content cannot be empty"
				})
		}
		
		// Post new user & handle error
		const newUser = new user(request.body)
		try {
			await newUser.save()
			return response
				.status(endpoints.signup.successCode)
				.send({
					message: `New user ${newUser.username} added successfully`
				})
		} catch (error) {
			return response
				.status(endpoints.signup.failureCode)
				.send({
					message: `Error creating new user ${newUser.username}. Double check connection or new user credentials and try again!`
				})
		}
	}
)

routes.post(
	endpoints.signin.path,
	async (request, response) => {
		// Extract request info
		const username = request.body.username
		
		const password = request.body.password
		
		try {
			const allUsers = await user
				.find()
				.then((results) => {
					return results.map(eachUser => {
						return {
							username: eachUser.get('username'),

							password: eachUser.get('password')
						}
					})
				})
			
			let isValidLoginAttempt = false
			allUsers.forEach(anyUser => {
				// If user logs in by a matching username or email, with matching password
				if (
					(anyUser.username && (anyUser.username === username) && (anyUser.password === password))
				) {
					isValidLoginAttempt = true
				}
			})
			
			if (isValidLoginAttempt) {
				return response
					.status(endpoints.signin.successCode)
					.send({
						"status": true,
						"username": username,
						"message": "User logged in successfully"
					})
			} else {
				return response
					.status(endpoints.signin.failureCode)
					.send({
						"status": false,
						"username": username,
						"message": "Cannot log in. Unregistered username or password"
					})
			}
		} catch (error) {
			return response
				.status(500)
				.send({
					"message": "Connection error. Try again!"
				})
		}
	}
)

module.exports = routes