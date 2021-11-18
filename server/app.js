// External Dependencies
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const path = require('path')
const cors = require('cors')

// Internal Dependencies
const {
  notFoundHandler,
  errorHandler,
} = require('./middlewares/common/errorHandler')
const userRouter = require('./routers/userRouter')

// Configuraton
const app = express()
dotenv.config()

// Request Middleware
app.use(cors())
app.use(express.json())

// Public Assets Path
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/user', userRouter)

// Not Found Handler
app.use(notFoundHandler)

// Error Handler
app.use(errorHandler)

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`.rainbow.bold)
})
