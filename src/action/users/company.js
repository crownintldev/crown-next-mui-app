import axios from 'axios'

export const companyList = async () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API}/company`,{withCredentials: true,})
}
