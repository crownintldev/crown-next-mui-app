import axios from 'axios'
import { getCookie } from 'src/action/auth-action'
const accessToken = getCookie('jwt')

export const getDataAction = (api, params) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API}/${api}`, params ? { params } : {},{
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}
