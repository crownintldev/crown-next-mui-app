import axios from 'axios'
import { reduxToken } from 'src/action/auth-action'
const accessToken = reduxToken();

export const findVisaId = data => {
  return axios.post(`${process.env.NEXT_PUBLIC_API}/visa-service/find`, data,{
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}
