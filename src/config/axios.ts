import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.VITE_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
