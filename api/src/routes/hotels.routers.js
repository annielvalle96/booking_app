// Importing Express.
import express from 'express'
// Importing the controller functions.
import { CitiesAndCountHotels, countByCity, countByType, createHotel, deleteHotel, getAllHotels, getCities, getHotel, getHotelRooms, getHotelsByCity, updateHotel } from '../controllers/hotel.controllers.js'
// Importing the authentication middlewares.
import { isAdminUser, verifyToken } from '../middlewares/checker.middleware.js'
import { hotelSchema } from '../schemas/hotel.schema.js'
import { validateSchema } from '../middlewares/validator.middleware.js'

// Initializing the routes.
const router = express.Router()

// Create a Hotel.
router.post('/hotel/create', verifyToken, isAdminUser, validateSchema(hotelSchema), createHotel)
// Update a Hotel.
router.put('/hotel/update/:id', verifyToken, isAdminUser, validateSchema(hotelSchema), updateHotel)
// Delete a Hotel.
router.delete('/hotel/delete/:id', verifyToken, isAdminUser, deleteHotel)
// Get a Hotel.
router.get('/hotel/get/:id', getHotel)
// Get all Hotels.
router.get('/hotel/get', getAllHotels)
// Count the number of hotels for each city.
router.get('/hotel/countByCity', countByCity)
// Count the number of hotels for each type.
router.get('/hotel/countByType', countByType)
// Get the cities of the hotels.
router.get('/hotel/cities', getCities)
// Getting cities and the count of hotels for each city in an array.
router.get('/hotel/CitiesAndCountHotels', CitiesAndCountHotels)
// Get hotels by city.
router.get('/hotel/getHotelsByCity', getHotelsByCity)
// Get hotel rooms.
router.get('/hotel/rooms/:id', getHotelRooms)

export default router
