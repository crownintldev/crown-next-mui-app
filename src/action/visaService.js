import axios from 'axios'

export const findVisaId = data => {
  return axios.post(`${process.env.NEXT_PUBLIC_API}/visa-service/find`, data)
}
