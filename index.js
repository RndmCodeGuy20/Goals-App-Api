const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/error.middleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000;

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.json({
    info: "goals api"
  })
})

app.use('/api/goals', require('./routes/goalRoutes'))
// app.use('/api/goals', require('./routes/Like'))
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Server Not Running!`)
    } else {
        console.log(`Server started successfully on http://localhost:${PORT}`)
    }
})

module.exports = app;
