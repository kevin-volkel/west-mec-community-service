import axios from 'axios'
import { baseURL } from './auth'
import Cookies from 'js-cookie'

const serviceAxios = axios.create({
  baseURL: `${baseURL}/api/v1/service`,
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`
  }
})

export const createService = async (
  title,
  hours,
  description,
  picURL,
  setError
) => {
  try {
    const res = await serviceAxios.post('/', {title, hours, description, proof: picURL})
  } catch (err) {
    console.error(err)
    setError(err)
  }
}

export const getServices = async (
  userId
) => {
  try {
    const res = await serviceAxios.get('/')
    return res.data.services.filter( (service) => service.user === userId)
  } catch (err) {
    console.error(err)
  }
}