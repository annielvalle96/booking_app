// Importing axios.
import axios from 'axios'

// Creating an axios instance to make some configurations to axios.
const axiosInstance = axios.create({
  // Base domain of the api through which it will always make queries.
  baseURL: 'http://localhost:8800/api/v1',
  // Allows you to set cookies in the app that makes the requests.
  withCredentials: true
})

export default axiosInstance
