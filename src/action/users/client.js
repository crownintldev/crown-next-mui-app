import axios from 'axios'

export const clientList = async () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API}/clients`,{withCredentials: true,})
}
