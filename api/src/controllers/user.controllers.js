// Importing the User model.
import User from '../models/user.model.js'
// Importing the function that personalizes the errors.
import { createError } from '../useful/error.js'
// Importing the bcrypt library.
import bcrypt from 'bcrypt'
// Importing the function to create the Token.
import { createToken } from '../useful/create.token.js'

// Creating the user.
export const register = async (req, res, next) => {
  // Checking the request body is not empty.  I commented on this because this will be checked in the schema validator.
  // if (Object.keys(req.body).length === 0) return next(createError(404, 'You must input all the data!'))
  // if (req.body.username === '' || req.body.email === '' || req.body.password === '') return next(createError(404, 'You must input all the data!'))
  // if (!req.body.username || !req.body.email || !req.body.password) return next(createError(404, 'Type your credentials correctly!'))

  // Encrypting the password.
  const passwordHash = await bcrypt.hash(req.body.password, 10)
  const newUser = new User({ ...req.body, password: passwordHash })
  try {
    // Saving the user.
    const savedUser = await newUser.save()
    // Handle that: do not send the password and isAdmin attributes to the client for security reasons, as these attributes should not be edited on the client by mistake.
    // I also removed the __v attribute of the response because of aesthetic reasons.
    // const { __v, password, isAdmin, ...otherDetails } = savedUser._doc
    const { __v, password, ...otherDetails } = savedUser._doc
    // The response contains:
    // 1. Define the Cookie:
    //  - Parameter 1: define the name of the Cookie as access_token.
    //  - Parameter 2: create the Cookie, which will contain the id and isAdmin of the user who is logging in.
    //  - Parameter 3: indicate that this Cookie will only be accessed through the http protocol, making it more secure.
    // 2. Define the status of the response, as positive.
    // 3. Return all the user attributes, leaving the id and isAdmin out of the response, for security reasons.
    // OJO. I made some last-minute changes to the response that are not the regular way of working with "...otherDetails". I mean "details: {...other details}".
    // return res.cookie(process.env.TOKEN_NAME, await createToken({ id: savedUser._id, username: savedUser.username, isAdmin: savedUser.isAdmin }), { httpOnly: true }).status(200).json({ details: { ...otherDetails }, isAdmin })
    return res.cookie(process.env.TOKEN_NAME, await createToken({ id: savedUser._id, username: savedUser.username, isAdmin: savedUser.isAdmin }), { httpOnly: true }).status(200).json({ ...otherDetails })
  } catch (err) {
    next(err)
  }
}

// Creating the user.
export const create = async (req, res, next) => {
  // Checking the request body is not empty.  I commented on this because this will be checked in the schema validator.
  // if (Object.keys(req.body).length === 0) return next(createError(404, 'You must input all the data!'))
  // if (req.body.username === '' || req.body.email === '' || req.body.password === '') return next(createError(404, 'You must input all the data!'))
  // if (!req.body.username || !req.body.email || !req.body.password) return next(createError(404, 'Type your credentials correctly!'))

  // Encrypting the password.
  const passwordHash = await bcrypt.hash(req.body.password, 10)
  const newUser = new User({ ...req.body, password: passwordHash })
  try {
    // Saving the user.
    const savedUser = await newUser.save()
    // Handle that: do not send the password and isAdmin attributes to the client for security reasons, as these attributes should not be edited on the client by mistake.
    // I also removed the __v attribute of the response because of aesthetic reasons.
    // const { __v, password, isAdmin, ...otherDetails } = savedUser._doc
    const { __v, password, ...otherDetails } = savedUser._doc
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the user attributes, leaving the id and isAdmin out of the response, for security reasons.
    // OJO. I made some last-minute changes to the response that are not the regular way of working with "...otherDetails". I mean "details: {...other details}".
    return res.status(200).json({ ...otherDetails })
  } catch (err) {
    next(err)
  }
}

// Logging the user.
export const login = async (req, res, next) => {
  // Checking the request body is not empty. I commented on this because this will be checked in the schema validator.
  // if (Object.keys(req.body).length === 0) return next(createError(404, 'You must input some data!'))
  // if ((req.body.username === '' && req.body.email === '') || req.body.password === '') return next(createError(404, 'You must input all the data!'))
  // if ((!req.body.username && !req.body.email) || !req.body.password) return next(createError(404, 'Type your credentials correctly!'))

  try {
    // Find the user by username or email.
    let user = null
    if (req.body.username) {
      // Finding the user.
      user = await User.findOne({ username: req.body.username })
      // Check if the user is found.
      if (!user) return next(createError(404, 'Username not found!'))
    }
    if (req.body.email) {
      // Finding the user.
      user = await User.findOne({ email: req.body.email })
      // Check if the user is found.
      if (!user) return next(createError(404, 'Email not found!'))
    }
    // Find the user's password.
    // Compare the password provided by the user as a login credential with the decrypted password found for this user in the database.
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    // Checking the password authenticity.
    if (!isPasswordCorrect) return next(createError(400, 'Wrong password!'))
    // Handle that: do not send the password and isAdmin attributes to the client for security reasons, as these attributes should not be edited on the client by mistake.
    // I also removed the __v attribute of the response because of aesthetic reasons.
    // const { __v, password, isAdmin, ...otherDetails } = user._doc
    const { __v, password, ...otherDetails } = user._doc
    // The response contains:
    // 1. Define the Cookie:
    //  - Parameter 1: define the name of the Cookie as access_token.
    //  - Parameter 2: create the Cookie, which will contain the id and isAdmin of the user who is logging in.
    //  - Parameter 3: indicate that this Cookie will only be accessed through the http protocol, making it more secure.
    // 2. Define the status of the response, as positive.
    // 3. Return all the user attributes, leaving the id and isAdmin out of the response, for security reasons.
    // OJO. I made some last-minute changes to the response that are not the regular way of working with "...otherDetails". I mean "details: {...other details}".
    // return res.cookie(process.env.TOKEN_NAME, await createToken({ id: user._id, username: user.username, isAdmin: user.isAdmin }), { httpOnly: true }).status(200).json({ details: { ...otherDetails }, isAdmin })
    return res.cookie(process.env.TOKEN_NAME, await createToken({ id: user._id, username: user.username, isAdmin: user.isAdmin }), { httpOnly: true }).status(200).json({ ...otherDetails })
  } catch (err) {
    next(err)
  }
}

// Logout the user.
export const logout = (req, res, next) => {
  try {
    // Clear the Token value and remove the expiration date.
    res.cookie(process.env.TOKEN_NAME, '', { expires: new Date(0) })
    return res.status(200).json({ message: 'User is logout!' })
  } catch (err) {
    next(err)
  }
}

// Update a User.
export const updateUser = async (req, res, next) => {
  // Checking the request body is not empty.
  if (Object.keys(req.body).length === 0) return next(createError(404, 'You must input some data!'))
  try {
    // Obtaining the id parameter.
    const id = req.params.id
    // The second parameter: { $set: req.body } is to update the request information with the information about the User in the database, when there is an attribute that matches.
    // The third parameter: { new: true } is to save, in the updatedUser variable, the updated object instead of the previous object.
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    // Checking that the user was found.
    if (updatedUser == null) return next(createError(404, `A User with id: ${id}, was not found to update!`))
    // Handle that: do not send the password and isAdmin attributes to the client for security reasons, as these attributes should not be edited on the client by mistake.
    // I also removed the __v attribute of the response because of aesthetic reasons.
    const { __v, password, isAdmin, ...otherDetails } = updatedUser._doc
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the user attributes, leaving the id and isAdmin out of the response, for security reasons.
    return res.status(200).json({ ...otherDetails })
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Delete a User.
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const deletedUser = await User.findByIdAndDelete(id)
    // Way to personalize the errors.
    if (deletedUser == null) return next(createError(404, `A User with id: ${id}, was not found to remove!`))
    return res.status(200).json({ message: `The User, with id: ${id}, has been deleted.` })
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Get a User.
export const getUser = async (req, res, next) => {
  try {
    // Obtaining the id parameter.
    const id = req.params.id
    // Finding the user by id.
    const gotUser = await User.findById(id)
    // Way to personalize the errors.
    if (gotUser == null) return next(createError(404, `A User with id: ${id} is not found!`))
    // Handle that: do not send the password and isAdmin attributes to the client for security reasons, as these attributes should not be edited on the client by mistake.
    // I also removed the __v attribute of the response because of aesthetic reasons.
    const { __v, password, isAdmin, ...otherDetails } = gotUser._doc
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the user attributes, leaving the id and isAdmin out of the response, for security reasons.
    return res.status(200).json({ ...otherDetails })
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Get all Users.
export const getAllUsers = async (req, res, next) => {
  try {
    // Finding all the users.
    const gotAllUsers = await User.find()
    // Handle that: do not send the password and isAdmin attributes to the client for security reasons, as these attributes should not be edited on the client by mistake.
    // I also removed the __v attribute of the response because of aesthetic reasons.
    const sanitizedUsers = gotAllUsers.map(user => {
      const { __v, password, ...otherDetails } = user._doc
      return otherDetails
    })
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the user attributes, leaving the id and isAdmin out of the response, for security reasons.
    return res.status(200).json(sanitizedUsers)
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    // Checking the id.
    if (!req.params.id) return next(createError(403, 'You need to provide the user id!'))
    // Looking for the user by id.
    const user = await User.findById({ _id: req.params.id })
    // Checking that the username was found.
    if (!user) return next(createError(404, 'User not found for this id!'))
    // Checking if the user is Admin.
    if (!user.isAdmin) return next(createError(404, `User ${user.username} is not Admin!`))
    // Handle that: do not send the password and isAdmin attributes to the client for security reasons, as these attributes should not be edited on the client by mistake.
    // I also removed the __v attribute of the response because of aesthetic reasons.
    const { password, createdAt, updatedAt, __v, ...otherDetails } = user._doc
    // Returning.
    return res.status(200).json({ ...otherDetails })
  } catch (err) {
    next(err)
  }
}
