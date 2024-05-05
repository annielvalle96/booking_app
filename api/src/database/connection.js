// Importing `mongoose` to connect the server to the MongoDB Database.
import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    console.log('>>> MongoDB database is connected...')
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
