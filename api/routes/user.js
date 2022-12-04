"use strict"

const express = require("express")
const routes = express.Router()
const userPoints = require("../endDestinations/user")
const user = require("../../models/users");

routes.post(
	userPoints.signUp.path,
	async (request, response) => {
		// Validate request
		if (Object.keys(request.body).length === 0) {
			return response
				.status(userPoints.signUp.failureCode)
				.send({
					message: "User account content cannot be empty"
				})
		}
		
		// Post new user & handle error
		const newUser = new user(request.body)
		try {
			await newUser.save()
			return response
				.status(userPoints.signUp.successCode)
				.send({
					message: `New user ${newUser.username} added successfully`
				})
		} catch (error) {
			return response
				.status(userPoints.signUp.failureCode)
				.send({
					message: `Error creating new user ${newUser.username}. Double check connection or new user credentials and try again!`
				})
		}
	}
)

routes.post(
	userPoints.login.path,
	async (request, response) => {
		// Extract request info
		const username = request.body.username
		
		const password = request.body.password
		
		try {
			const users = await user
				.find()
				.then((results) => {
					return results.map(user => {
						return {
							username: user.get('username'),

							password: user.get('password')
						}
					})
				})
			
			let isValidLoginAttempt = false
			users.forEach(user => {
				// If user logs in by a matching username or email, with matching password
				if (
					(user.username && (user.username === username) && (user.password === password))
				) {
					isValidLoginAttempt = true
				}
			})
			
			if (isValidLoginAttempt) {
				return response
					.status(userPoints.login.successCode)
					.send({
						"status": true,
						"username": username,
						"message": "User logged in successfully"
					})
			} else {
				return response
					.status(userPoints.login.failureCode)
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