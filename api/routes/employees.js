"use strict"

const express = require("express")
const routes = express.Router()
const endpoints = require("../endpoints/employees")
const employeesPattern = require("../../models/employees")

routes.get(
	endpoints.viewAll.path,
	async (request, response) => {
		try {
			const employees = await employeesPattern.find({})
			return response
				.status(endpoints.viewAll.successCode)
				.send(employees)
		} catch (error) {
			return response
				.status(500)
				.send(error)
		}
	}
)

routes.post(
	endpoints.addNew.path,
	async (request, response) => {
		// Validate request
		if (Object.keys(request.body).length === 0) {
			return response
				.status(endpoints.addNew.failureCode)
				.send({
					message: "Employee account content cannot be empty"
				})
		}

		const newEmployee = new employeesPattern(/* from: */ {
			first_name: request.body.firstName,
			last_name: request.body.lastName,
			email: request.body.email,
			gender: request.body.gender,
			salary: request.body.salary
		})
		try {
			await newEmployee.save()
			return response
				.status(endpoints.addNew.successCode)
				.send({
					message: `New employee ${newEmployee.full_name} added`
				})
		} catch (error) {
			return response
				.status(endpoints.addNew.failureCode)
				.send({
					message: `Error creating new employee ${newEmployee.full_name}. Double check connection or new employee credentials and try again!`
				})
		}
	}
)

routes.get(
	endpoints.viewById.path,
	async (request, response) => {
		let empIdFromUrl = request.params.eid

		try {
			const employee = await employeesPattern
				.findById(empIdFromUrl)
				.select('-_id first_name last_name email gender salary')
			// get all fields except _id

			if (!employee) {
				return response
					.status(endpoints.viewById.failureCode)
					.send({
						message: `No employee with id ${empIdFromUrl} found`
					})
			}

			return response
				.status(endpoints.viewById.successCode)
				.send(employee)
		} catch (error) {
			return response
				.status(500)
				.send(error)
		}
	}
)

routes.put(
	endpoints.editById.path,
	async (request, response) => {
		let empIdFromUrl = request.params.eid

		// Validate request
		if (Object.keys(request.body).length === 0) {
			return response
				.status(endpoints.editById.badRequestCode)
				.send({
					message: "Missing update employee account content"
				})
		}

		try {
			const empToUpdate = await employeesPattern
				.findByIdAndUpdate(/* id: */ empIdFromUrl, /* with: */ request.body)

			const editedEmp = await employeesPattern.findById(empToUpdate._id)

			if (!editedEmp) {
				return response
					.status(endpoints.editById.failureCode)
					.send({ message: `No emp with id ${empIdFromUrl} found` })
			}

			return response
				.status(endpoints.editById.successCode)
				.send(editedEmp)
		} catch (error) {
			return response
				.status(500)
				.send(error)
		}
	}
)

routes.delete(
	endpoints.removeById.path,
	async (request, response) => {
		let empIdFromUrl = request.query.eid

		// Validate request
		if (!empIdFromUrl) {
			return response
				.status(endpoints.removeById.badRequestCode)
				.send({
					message: "Delete by id missing eid value"
				})
		}

		try {
			const removedEmp = await employeesPattern.findByIdAndDelete(empIdFromUrl)

			if (!removedEmp) {
				return response
					.status(endpoints.removeById.failureCode)
					.send({ message: `No employee with id ${empIdFromUrl} found to delete` })
			}

			return response
				.status(endpoints.removeById.successCode)
				.end()
		} catch (error) {
			return response
				.status(500)
				.send(error)
		}
	}
)

module.exports = routes