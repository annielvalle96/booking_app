// Importing the Hotel model.
import Hotel from '../models/hotel.model.js'
// importing the Room model.
import Room from '../models/room.model.js'
// Importing the function that personalizes the errors.
import { createError } from '../useful/error.js'

// Create a Hotel.
export const createHotel = async (req, res, next) => {
  // Checking the request body is not empty.
  // if (Object.keys(req.body).length === 0) return next(createError(404, 'You must input some data!'))
  // Obtaining the request body.
  const newHotel = new Hotel(req.body)
  try {
    const savedHotel = await newHotel.save()
    // I removed the __v attribute of the response because of aesthetic reasons.
    const { __v, ...otherDetails } = savedHotel._doc
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the hotel attributes, leaving __v out of the response, for security reasons.
    return res.status(200).json({ ...otherDetails })
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Update a Hotel.
export const updateHotel = async (req, res, next) => {
  // Checking the request body is not empty.
  // if (Object.keys(req.body).length === 0) return next(createError(404, 'You must input some data!'))
  try {
    // Obtaining the id parameter.
    const id = req.params.id
    // The second parameter: { $set: req.body } is to update the request information with the information about the Hotel in the database, when there is an attribute that matches.
    // The third parameter: { new: true } is to save, in the updatedHotel variable, the updated object instead of the previous object.
    const updatedHotel = await Hotel.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    // Checking that the hotel was found.
    if (updatedHotel == null) return next(createError(404, `A Hotel with id: ${id}, was not found to update!`))
    // I removed the __v attribute of the response because of aesthetic reasons.
    const { __v, ...otherDetails } = updatedHotel._doc
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the hotel attributes, leaving __v out of the response, for security reasons.
    return res.status(200).json({ ...otherDetails })
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Delete a Hotel.
export const deleteHotel = async (req, res, next) => {
  try {
    const id = req.params.id
    const deletedHotel = await Hotel.findByIdAndDelete(id)
    // Way to personalize the errors.
    if (deletedHotel == null) return next(createError(404, `A Hotel with id: ${id}, was not found to remove!`))
    return res.status(200).json({ message: `The Hotel, with id: ${id}, has been deleted.` })
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Get a Hotel.
export const getHotel = async (req, res, next) => {
  try {
    const id = req.params.id
    const gotHotel = await Hotel.findById(id)
    // Way to personalize the errors.
    if (gotHotel == null) return next(createError(404, `A Hotel with id: ${id} is not found!`))
    // I removed the __v attribute of the response because of aesthetic reasons.
    const { __v, ...otherDetails } = gotHotel._doc
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the hotel attributes, leaving __v out of the response, for security reasons.
    return res.status(200).json({ ...otherDetails })
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Get all Hotels.
export const getAllHotels = async (req, res, next) => {
  const { min, max, limit } = req.query
  try {
    // Query that returns all hotels that meet the conditions of:
    // whether featured or not, with the cheapest price between the minimum and maximum range, not including the extremes and limits of elements of the query.
    // const gotAllHotels = await Hotel.find({ featured: featured || true, cheapestPrice: { $gt: min || 1, $lt: max || 1000 } }).limit(limit || 1000)
    const gotAllHotels = await Hotel.find({ cheapestPrice: { $gt: min || 1, $lt: max || 1000 } }).limit(limit || 1000)
    // I removed the __v attribute of the response because of aesthetic reasons.
    const sanitizedHotels = gotAllHotels.map(hotel => {
      const { __v, ...otherDetails } = hotel._doc
      return otherDetails
    })
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the hotel attributes, leaving the id and isAdmin out of the response, for security reasons.
    return res.status(200).json(sanitizedHotels)
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Count the number of hotels for each city.
export const countByCity = async (req, res, next) => {
  // Obtaining an array of all cities converted to lowercase.
  const cities = req.query.cities.split(',').map(city => city.toLowerCase())
  try {
    // Iterating through each city in the array of cities and counting occurrences in the database.
    const list = await Promise.all(cities.map(city => {
      // Regular expression in MongoDB to perform a case-insensitive text search.
      const cityCaseInsensitive = { $regex: new RegExp('^' + city + '$', 'i') }
      // This way is not fetching any property, it just shows the count, making the operation faster.
      return Hotel.countDocuments({ city: cityCaseInsensitive })
    }))
    return res.status(200).json(list)
  } catch (err) {
    next(err)
  }
}

// Count the number of hotels for each type.
export const countByType = async (req, res, next) => {
  // Defining the types of hotels.
  const types = ['hotel', 'apartment', 'resort', 'villa', 'cabin']
  try {
    // Iterating through each type in the array of types and counting occurrences in the database.
    const list = await Promise.all(types.map(type => {
      // Regular expression in MongoDB to perform a case-insensitive text search.
      const typeCaseInsensitive = { $regex: new RegExp('^' + type + '$', 'i') }
      // This way is not fetching any property, it just shows the count, making the operation faster.
      // return Hotel.countDocuments({ type: typeCaseInsensitive })
      return Hotel.countDocuments({ type: typeCaseInsensitive })
    }))
    const formattedResult = types.map((type, index) => ({
      type,
      count: list[index]
    }))
    return res.status(200).json(formattedResult)
  } catch (err) {
    next(err)
  }
}

// Get the cities of the hotels.
export const getCities = async (req, res, next) => {
  try {
    // Find all hotels in the database.
    const hotels = await Hotel.find()
    // Mapping all hotels to get an array of the cities.
    const cities = hotels.map(hotel => hotel.city)
    // Filter the unique cities.
    const uniqueCities = Array.from(new Set(cities))
    // Return the unique cities.
    return res.status(200).json(uniqueCities)
  } catch (err) {
    next(err)
  }
}

// Count the number of hotels for each city.
export const CitiesAndCountHotels = async (req, res, next) => {
  try {
    // Find all hotels in the database.
    const hotels = await Hotel.find()
    // Mapping all hotels to get an array of the cities.
    const cities = hotels.map(hotel => hotel.city)
    // Filter the unique cities.
    const uniqueCities = Array.from(new Set(cities))
    try {
      // Iterating through each city in the array of cities and counting occurrences in the database.
      const list = await Promise.all(uniqueCities.map(city => {
        // Regular expression in MongoDB to perform a case-insensitive text search.
        const cityCaseInsensitive = { $regex: new RegExp('^' + city + '$', 'i') }
        // This way is not fetching any property, it just shows the count, making the operation faster.
        return Hotel.countDocuments({ city: cityCaseInsensitive })
      }))
      // Forming an array of cities and the count of hotels for each city.
      const formattedResult = uniqueCities.map((city, index) => ({
        city,
        count: list[index]
      }))
      return res.status(200).json(formattedResult)
    } catch (err) {
      next(err)
    }
  } catch (err) {
    next(err)
  }
}

// Get hotels by city, with a price range.
export const getHotelsByCity = async (req, res, next) => {
  // Getting the queries.
  let { city, min, max } = req.query
  // We convert the city to lowercase so that the search is case insensitive.
  city = city.toLowerCase()
  try {
    // We getting all hotels.
    // const gotAllHotels = await Hotel.find()
    const gotAllHotels = await Hotel.find({ cheapestPrice: { $gt: min || 0, $lt: max || 1000 } })
    // We are looking for hotels by city.
    const hotels = gotAllHotels.filter(hotel => hotel.city.toLowerCase() === city)
    // I removed the __v attribute of the response because of aesthetic reasons.
    const sanitizedHotels = hotels.map(hotel => {
      const { __v, ...otherDetails } = hotel._doc
      return otherDetails
    })
    // The response contains:
    // 1. Define the status of the response, as positive.
    // 2. Return all the hotel attributes, leaving the id and isAdmin out of the response, for security reasons.
    return res.status(200).json(sanitizedHotels)
  } catch (err) {
    // return res.status(500).json({ message: err.message })
    next(err)
  }
}

// Get hotel rooms.
export const getHotelRooms = async (req, res, next) => {
  // Getting the id of the hotel.
  const { id } = req.params
  try {
    // Getting to the hotel by id.
    const hotel = await Hotel.findById(id)
    // Getting the rooms of the hotel.
    const roomList = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room)
      })
    )
    res.status(200).json(roomList)
  } catch (err) {
    next(err)
  }
}
