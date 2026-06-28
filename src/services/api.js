import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

API.interceptors.request.use((config) => {
  const user = localStorage.getItem('emergency_user')
  if (user) {
    const { token } = JSON.parse(user)
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)
export const getProfile = () => API.get('/auth/profile')
export const createRequest = (data) => API.post('/requests', data)
export const getMyRequests = () => API.get('/requests/my')
export const getDepartmentRequests = () => API.get('/requests/department')
export const updateRequestStatus = (id, status) => API.put(`/requests/${id}/status`, { status })