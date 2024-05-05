// Importing the Room model.
import Room from '../models/room.model.js'
// Importing the function that personalizes the errors.
import { createError } from '../useful/error.js'
// Importing the Hotel model.
import Hotel from '../models/hotel.model.js'

// Create a Room.
export const createRoom = async (req, res, next) => {
  // Checking the request body is not empty.
  // if (Object.keys(req.body).length === 0) return next(createError(404, 'You must input some data!'))
  // We need the Hotel ID because every Room will be associated with a Hotel.
  const hotelId = req.params.hotelId
  // Obtaining the request body.
  const newRoom = new Room(req.body)
  try {
    // Saving the Room in the database.
    const savedRoom = await newRoom.save()
    try {
      // Push the ID of the room that is being created, in the Rooms attribute of your corresponding Hotel.
      await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
    } catch (err) {
      next(err)
    }
    // I removed the __v attribute of the response because of aesthetic reasons.
    const { __v, ...otherDetails } = savedRoom._doc
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the Room attributes, leaving __v out of the response, for security reasons.
    return res.status(200).json({ ...otherDetails })
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Update a Room.
export const updateRoom = async (req, res, next) => {
  // Checking the request body is not empty.
  if (Object.keys(req.body).length === 0) return next(createError(404, 'You must input some data!'))
  try {
    // Obtaining the id parameter.
    const id = req.params.id
    // The second parameter: { $set: req.body } is to update the request information with the information about the Room in the database, when there is an attribute that matches.
    // The third parameter: { new: true } is to save, in the updatedRoom variable, the updated object instead of the previous object.
    const updatedRoom = await Room.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    // Checking that the Room was found.
    if (updatedRoom == null) return next(createError(404, `A Room with id: ${id}, was not found to update!`))
    // I removed the __v attribute of the response because of aesthetic reasons.
    const { __v, ...otherDetails } = updatedRoom._doc
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the Room attributes, leaving __v out of the response, for security reasons.
    return res.status(200).json({ ...otherDetails })
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Delete a Room.
export const deleteRoom = async (req, res, next) => {
  // Obtaining the ID of the Room to delete.
  const roomId = req.params.roomId
  try {
    // Deleting the Room by its ID.
    const deletedRoom = await Room.findByIdAndDelete(roomId)
    // Looking for a hotel, which has this Room.
    const hotel = await Hotel.findOne({ rooms: roomId })

    let deletedIdRoomInHotel = null
    try {
      // Pull the ID of the room that is being deleted, in the rooms attribute of your corresponding Hotel.
      deletedIdRoomInHotel = await Hotel.findByIdAndUpdate(hotel._id, { $pull: { rooms: req.params.roomId } })
    } catch (err) {
      next(err)
    }
    // Checking, the Room was deleted.
    if (deletedRoom == null) return next(createError(404, `A Room with id: ${roomId}, was not found to remove!`))
    // Checking, the Room was deleted from its Hotel corresponding.
    if (deletedIdRoomInHotel == null) return next(createError(404, `The Room, with id: ${roomId}, in its Hotel corresponding, was not found to be removed!`))
    return res.status(200).json({ message: `The Room, with id: ${roomId}, has been deleted.` })
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Get a Room.
export const getRoom = async (req, res, next) => {
  try {
    const id = req.params.id
    const gotRoom = await Room.findById(id)
    // Way to personalize the errors.
    if (gotRoom == null) return next(createError(404, `A Room with id: ${id} is not found!`))
    // I removed the __v attribute of the response because of aesthetic reasons.
    const { __v, ...otherDetails } = gotRoom._doc
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the Room attributes, leaving __v out of the response, for security reasons.
    return res.status(200).json({ ...otherDetails })
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Get all Rooms.
export const getAllRooms = async (req, res, next) => {
  try {
    const gotAllRooms = await Room.find()
    // I removed the __v attribute of the response because of aesthetic reasons.
    const sanitizedRooms = gotAllRooms.map(room => {
      const { __v, ...otherDetails } = room._doc
      return otherDetails
    })
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the Room attributes, leaving the id and isAdmin out of the response, for security reasons.
    return res.status(200).json(sanitizedRooms)
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Update a Room.
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates
        }
      }
    )
    res.status(200).json('Room status has been updated!')
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}
