import axios from 'axios'
import toast from 'react-hot-toast'
import { axiosErrorMessage, capitalizeSplitDash } from 'src/utils/helperfunction'

export const createApi = async ({
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
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/${api}/create`, data)

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
      toggle()
      reset()
      toast.success(message ? message : `${capitalizeSplitDash(api)} Create Successfully`, {
        position: 'top-center'
      })
    }
  } catch (err) {
    console.error(axiosErrorMessage(err))
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
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API}/${api}/update/${_id}`, data)
    console.log(response)
    if (response.data.data) {
      dispatch(
        fetchData({
          updateData: response.data.data
        })
      )
      toggle()
      reset()
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
