import axios from 'axios'
import { getCookie } from 'src/action/auth-action'
const accessToken = getCookie('jwt')

export const findVisaId = data => {
  return axios.post(`${process.env.NEXT_PUBLIC_API}/visa-service/find`, data,{
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}
