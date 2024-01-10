import axios from 'axios'

export const agentList = async () => {
  return axios.get(`${process.env.NEXT_PUBLIC_API}/agents`)
}
