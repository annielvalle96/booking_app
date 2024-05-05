// Importing the jsonwebtoken library to work with the Tokens.
import jwt from 'jsonwebtoken'
// Importing the function that personalizes the errors.
import { createError } from '../useful/error.js'
import User from '../models/user.model.js'

export const verifyToken = (req, res, next) => {
  // Obtaining the Token, having its name, since the environment variables.
  const token = req.cookies[process.env.TOKEN_NAME]
  // Checking the Token is not empty.
  if (!token) return next(createError(401, 'You must make a login!'))
  // Verifying the Token.
  jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, decoded) => {
    // Checking that the Token verification was done well.
    if (!err) {
      // Save in req.userAuthenticated the object that contains the id and the isAdmin.
      req.userAuthenticated = decoded
      // Continue the flow of events.
      next()
    } else {
      return next(createError(403, 'You must make a login!'))
    }
  })
}

export const verifyUser = (req, res, next) => {
  // Checking the id is valid.
  if (!req.params.id) return next(createError(403, 'You need to provide the user id!'))
  if (req.userAuthenticated.id === req.params.id && req.userAuthenticated.username === req.params.username) {
    // Continue the flow of events.
    next()
  } else {
    return next(createError(403, 'You must make a login!'))
  }
}

export const isAdminUser = (req, res, next) => {
  if (req.userAuthenticated.isAdmin) {
    // Continue the flow of events.
    next()
  } else {
    // Continue the flow of events.
    return next(createError(403, 'You are not a admin user!'))
  }
}

export const isEmail = async (req, res, next) => {
  try {
    // Checking the request body is not empty. I commented on this because this will be checked in the schema validator.
    // if (Object.keys(req.body).length === 0) return next(createError(404, 'You must input some email!'))
    // if (req.body.email === '') return next(createError(404, 'You must input some email!'))
    // if (!req.body) return next(createError(404, 'You must input some email!'))

    // Looking for the email in the DB.
    const user = await User.findOne({ email: req.body.email })
    // Checking that the email was found.
    if (user) return next(createError(404, `The email ${req.body.email} already exists!`))
    // Continue the flow of events.
    next()
  } catch (err) {
    next(err)
  }
}

export const isUsername = async (req, res, next) => {
  try {
    // Checking the request body is not empty. I commented on this because this will be checked in the schema validator.
    // if (Object.keys(req.body).length === 0) return next(createError(404, 'You must input some username!'))
    // if (req.body.username === '') return next(createError(404, 'You must input some username!'))
    // if (!req.body) return next(createError(404, 'You must input some username!'))

    // Looking for the username in the DB.
    const user = await User.findOne({ username: req.body.username })
    // Checking that the username was found.
    if (user) return next(createError(404, `The username ${req.body.username} already exists!`))
    // Continue the flow of events.
    next()
  } catch (err) {
    next(err)
  }
}
