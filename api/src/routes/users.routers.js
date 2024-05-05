// Importing Express.
import express from 'express'
// Importing the controller functions.
import { create, deleteUser, getAllUsers, getUser, isAdmin, login, logout, register, updateUser } from '../controllers/user.controllers.js'
// Importing the authentication middlewares.
import { isAdminUser, isEmail, isUsername, verifyToken, verifyUser } from '../middlewares/checker.middleware.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { loginSchema, registerSchema } from '../schemas/user.schema.js'

// Initializing the routes.
const router = express.Router()

// Verifying the Token.
router.get('/check_authentication', verifyToken, (req, res) => { res.status(200).send('Hello user, you are logged in!') })
// Checking the user.
router.get('/user/verify/:id/:username', verifyToken, verifyUser, (req, res) => { res.status(200).send('Hello user, you are logged in and you can delete your account!') })
// Checking the user is admin.
router.get('/user/isAdmin/:id/:username', verifyToken, verifyUser, isAdminUser, (req, res) => { res.status(200).send('The user is Admin!') })
// Checking the user is admin.
router.get('/user/isAdmin/:id', isAdmin)
// Update a User.
router.put('/user/update/:id', verifyToken, isAdminUser, validateSchema(registerSchema), updateUser)
// Delete a User.
router.delete('/user/delete/:id', verifyToken, isAdminUser, deleteUser)
// Get a User.
router.get('/user/get/:id', getUser)
// Get all Users.
router.get('/user/get', getAllUsers)
// Register a User.
router.post('/user/register', isUsername, isEmail, validateSchema(registerSchema), register)
// Create a User.
router.post('/user/create', verifyToken, isAdminUser, isUsername, isEmail, validateSchema(registerSchema), create)
// Login a User.
router.post('/user/login', validateSchema(loginSchema), login)
// Logout a User.
router.post('/user/logout', logout)
// Checking if the email exists.
router.get('/user/isEmail', isEmail)
// Checking if the username exists.
router.get('/user/isUsername', isUsername)

export default router
