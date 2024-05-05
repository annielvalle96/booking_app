// Importing Express.
import express from 'express'
// Importing the connection function before `dotenv` so that environment variables can be used within the connection function.
import connectDB from './src/database/connection.js'
// Importing `dotenv` library to create environment variables.
import dotenv from 'dotenv'
// Importing `morgan` to see the Frontend requests in the Backend console.
import morgan from 'morgan'
// Importing the routers.
import hotelsRouters from './src/routes/hotels.routers.js'
import roomsRouters from './src/routes/rooms.routers.js'
import usersRouters from './src/routes/users.routers.js'
// Importing cookie-parser library.
import cookieParser from 'cookie-parser'
// importing cors library.
import cors from 'cors'

// Setting up of the environment variables from `.env` file.
dotenv.config()

// Executing the connection function.
connectDB()

// Creating the app.
const app = express()

// CORS definition to indicate that: all domains that can communicate with this server.
// The argument: {origin: 'http://localhost:3000'}, of the cors() function is not required to be used.
// In this case, this argument is indicating that the server only connect to the application deployed at: http://localhost:3000.
// The attribute: credentials: true, is so that the api, here in the backend can set the cookies.
app.use(cors({
  origin: [process.env.FRONTEND_URL_1, process.env.FRONTEND_URL_2],
  credentials: true
}))

// "morgan('dev')" displays a short message through the console with the requests that arrive at the backend to know what requests we are making at all times.
app.use(morgan('dev'))

// express.json() allows express to be able to become and recognize the req.body in a JSON file.
app.use(express.json())

// This Middleware converts a browser Cookie into a JSON object and obtains browser Cookies, such as req.cookies.
app.use(cookieParser())

// Defining the routers.
app.use('/api/v1', hotelsRouters)
app.use('/api/v1', roomsRouters)
app.use('/api/v1', usersRouters)

// Error handling.
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

// Creating the listening port.
app.listen(process.env.PORT, () => { console.log(`>>> Server running on: http://localhost:${process.env.PORT}`) })
