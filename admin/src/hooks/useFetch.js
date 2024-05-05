import { useEffect, useState } from 'react'
import axiosInstance from '../useful/axios-instance.js'

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(url)
      setData(res.data)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  const reFetchData = async () => {
    setLoading(true)
    try {
      const res = await axiosInstance.get(url)
      setData(res.data)
    } catch (err) {
      setError(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return { data, loading, error, reFetchData }
}

export default useFetch
