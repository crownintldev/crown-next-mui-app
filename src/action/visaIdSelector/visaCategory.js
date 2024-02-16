import axiosInstance from 'src/utils/axiosInstance'

// export const addVisaCategory = (name) => {
//     return axios.post(`${API}/visa-category/create`,
//         { name })

// }
// export const listVisaCategory = (data) => {
//     return axios.post(`${API}/visa-category`,
//         data)
// }
export const listVisaCategory = async () => {
  return axiosInstance.get(`${process.env.NEXT_PUBLIC_API}/visa-category`,{
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}

// export const countVisaCategory = async () => {
//     return axios.get(`${API}/visa-category/count`)
// }
// export const deleteVisaCategory = (ids) => {
//     return axios.post(`${API}/visa-category/remove`, { ids })
// }
// export const updateVisaCategory = (id, data) => {
//     return axios.put(`${API}/visa-category/update/${id}`, data)
// }
