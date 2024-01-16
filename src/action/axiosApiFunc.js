import axios from 'axios'

export const getDataAction = (api, params) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API}/${api}`, params ? { params } : {})
}
