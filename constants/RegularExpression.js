const RegExpression = {
	/*
	* Email is in this format: johndoe@example.com or johndoe@example.co.uk
	*/
	forValidEmail: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
	/*
	* Password is at least 1 lower case, 1 numeric digit,
	* 1 special character, and minimum length of 8
	*/
	forStrongPassword: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}\\S+$"
}

module.exports = RegExpression