// Importing Express.
import express from 'express'
// Importing the controller functions.
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailability } from '../controllers/room.controllers.js'
// Importing the authentication middlewares.
import { isAdminUser, verifyToken } from '../middlewares/checker.middleware.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { roomSchema } from '../schemas/room.schema.js'

// Initializing the routes.
const router = express.Router()

// Create a Room.
router.post('/room/create/:hotelId', verifyToken, isAdminUser, validateSchema(roomSchema), createRoom)
// Update a Room.
router.put('/room/update/:id', verifyToken, isAdminUser, validateSchema(roomSchema), updateRoom)
// Delete a Room.
router.delete('/room/delete/:roomId', verifyToken, isAdminUser, deleteRoom)
// Get a Room.
router.get('/room/get/:id', getRoom)
// Get all Rooms.
router.get('/room/get', getAllRooms)
// Update room availability.
router.put('/room/availability/:id', updateRoomAvailability)

export default router
