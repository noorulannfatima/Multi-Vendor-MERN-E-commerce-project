import axios from 'axios'

// Central axios instance. `withCredentials` is required so the httpOnly auth
// cookie set by the backend is sent on every request.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
})

export default api
