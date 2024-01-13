import toast from 'react-hot-toast'
import { axiosErrorMessage } from 'src/utils/helperfunction'

export const fetchActionData = async (apiFunc, setState, toastify) => {
  try {
    const res = await apiFunc()
    setState(res.data.data)
    if (toastify) {
      toast.success(res.data.message)
    }
  } catch (err) {
    console.log('===========', err)

    if (toastify) {
      toast.error(axiosErrorMessage(err))
    }

    // setState([]); // Reset state in case of error
  }
}
