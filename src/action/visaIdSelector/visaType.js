import axiosInstance from 'src/utils/axiosInstance'
// export const addVisaType = (name) => {
//     return axios.post(`${API}/visa-type/create`,
//     {name})
// }

export const listVisaType = async () => {
  return axiosInstance.get(`${process.env.NEXT_PUBLIC_API}/visa-type`,{
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

// export const listVisaType = async () => {
//     const data = await fetch(`${API}/visa-type`,
//     { cache: 'no-store' }
//     )
//     const res = await data.json()
//     return res;
// }

// export const countVisaType = async () => {
//     return axios.get(`${API}/visa-type/count`)
// }
// export const deleteVisaType = (ids) => {
//     return axios.post(`${API}/visa-type/remove`, { ids })
// }
// export const updateVisaType = (id, data) => {
//     return axios.put(`${API}/visa-type/update/${id}`, data)
// }
