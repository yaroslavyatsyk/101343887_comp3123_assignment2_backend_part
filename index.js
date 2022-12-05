const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./server/routes/user')
const employeeRouter = require('./server/routes/employees')
const cors = require('cors')
const app = express()
app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/emp/employees',employeeRouter)
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.Promise = global.Promise

mongoose.connect("mongodb+srv://yaroslav9728:Education@cluster0.elr77qb.mongodb.net/ass1db?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Employee app - Assignment 2</h1>");
});


app.listen(3001, () => {
    console.log(`Server is listening on port http://localhost:${3001}`);
});