import axios from 'axios'
import toast from 'react-hot-toast'
import { axiosErrorMessage, capitalizeSplitDash } from 'src/utils/helperfunction'
import { AccountApi } from 'config'
import { accessToken } from './auth-action'

export const createApi = async ({
  api,
  apidomain,
  data,
  dispatch,
  fetchData,
  toggle,
  reset,
  message,
  removeSelection
}) => {
  const baseURL = apidomain || AccountApi
  try {
    const response = await axios.post(`${baseURL}/${api}/create`, data, {
      withCredentials: true,
      headers: {
        Authorization: accessToken
      }
    })

    // console.log(response.data.data)
    if (removeSelection) {
      removeSelection()
    }
    if (response.data.data) {
      dispatch(
        fetchData({
          newData: response.data.data
        })
      )
      if (toggle) {
        toggle()
      }
      if (reset) {
        reset()
      }
      toast.success(message ? message : `${capitalizeSplitDash(api)} Create Successfully`, {
        position: 'top-center'
      })
    }
  } catch (err) {
    toast.error(axiosErrorMessage(err), { position: 'top-center' })
  }
}

export const updateApi = async ({
  _id,
  api,
  data,
  dispatch,
  fetchData,
  toggle,
  reset,
  message,
  removeSelection
}) => {
  try {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API}/${api}/update/${_id}`, data, {
      withCredentials: true,
      headers: {
        Authorization: accessToken
      }
    })
    if (response.data.data) {
      dispatch(
        fetchData({
          updateData: response.data.data
        })
      )
      if (toggle) {
        toggle()
      }
      if (reset) {
        reset()
      }
      toast.success(message ? message : `${capitalizeSplitDash(api)} Update Successfully`, {
        position: 'top-center'
      })
      if (removeSelection) {
        removeSelection()
      }
    }
  } catch (err) {
    console.error(axiosErrorMessage(err))
    toast.error(axiosErrorMessage(err), { position: 'top-center' })
  }
}

export const updateManyApi = async ({
  api,
  completeApi,
  apidomain,
  data,
  dispatch,
  fetchData,
  toggle,
  reset,
  message,
  removeSelection
}) => {
  const baseURL = apidomain || AccountApi
  let myapi = completeApi ? completeApi : `${api}/data`
  try {
    const response = await axios.put(`${baseURL}/${myapi}`, data, {
      withCredentials: true,
      headers: {
        Authorization: accessToken
      }
    })
    if (response) {
      dispatch(fetchData({ updateData: response.data.data }))
      if (toggle) {
        toggle()
      }
      if (reset) {
        reset()
      }
      if (removeSelection) {
        removeSelection()
      }
    }

    // console.log(response)
    toast.success('Update Successfully', { position: 'top-center' })
  } catch (err) {
    toast.error(axiosErrorMessage(err), { position: 'top-center' })
  }
}
