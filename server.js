const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000;

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/apiRoutes'))
app.use(errorHandler)

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Server Not Running!`)
    } else {
        console.log(`Server started successfully on http://localhost:${PORT}`)
    }
})