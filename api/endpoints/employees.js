const EmployeeDestinations = {
	viewAll: {
		path: "/",
		successCode: 200
	},
	addNew: {
		path: "/",
		successCode: 201,
		failureCode: 400
	},
	viewById: {
		path: "/:eid",
		successCode: 200,
		failureCode: 404
	},
	editById: {
		path: "/:eid",
		successCode: 200,
		badRequestCode: 400, // for example: when request body is empty
		failureCode: 404
	},
	removeById: {
		path: "/",
		successCode: 204,
		badRequestCode: 400, // for example: when request body is empty
		failureCode: 400
	}
}

module.exports = EmployeeDestinations