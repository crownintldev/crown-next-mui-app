import React, { useState } from 'react'
import { Button } from '@mui/material'
import toast from 'react-hot-toast'
import FormDrawer from 'src/common/drawer/FormDrawer'
import EditVisaBookingForm from '../visaBooking/EditVisaBookingForm'
import { fetchVisaBooking } from 'src/store'
import axios from 'axios'
import { axiosErrorMessage } from 'src/utils/helperfunction'
import axiosInstance from 'src/utils/axiosInstance'

const PassportSubmitButton = ({
  dispatch,
  watch,
  toggle,
  setFiles,
  reset,
  removeSelection,
  editId
}) => {
  const [response, setResponse] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const toggleDrawer = () => setDrawerOpen(!drawerOpen)
  let data = watch()

  const onSubmit = async () => {
    let formData = new FormData()
    try {
      Object.keys(data).forEach((key) => {
        if (key !== 'files') {
          formData.append(key, data[key])
        }
      })
      data?.files?.forEach((file) => {
        formData.append('files', file)
      })
      if (data.deletedFiles.length > 0) {
        data.deletedFiles.forEach((fileId) => {
          formData.append('deletedFiles', fileId)
        })
      }
      let res
      if (!editId) {
        res = await axiosInstance.post(
          `${process.env.NEXT_PUBLIC_API}/passport/create`,
          formData
        )
        dispatch(
          fetchVisaBooking({
            newData: res.data.data
          })
        )
        toast.success('Insert Successfully', { position: 'top-center' })
      } else {
        res = await axiosInstance.put(
          `${process.env.NEXT_PUBLIC_API}/passport/update/${editId}`,
          formData
        )
        toast.success('Update Successfully', { position: 'top-center' })
        dispatch(
          fetchVisaBooking({
            updateData: res.data.data
          })
        )
      }
      // console.log('backend', res)
      setResponse(res.data.data)

      toggle()
      setFiles([])

      reset()
      if (removeSelection) {
        removeSelection()
      }

      setDrawerOpen(true)
      formData = new FormData()
    } catch (err) {
      toast.error(axiosErrorMessage(err), { position: 'top-center' })
      formData = new FormData()
    }
  }

  return (
    <div>
      <Button variant='contained' sx={{ mr: 3 }} onClick={onSubmit}>
        Submit
      </Button>
      <FormDrawer
        open={drawerOpen}
        toggle={toggleDrawer}
        drawerTitle={'Add Visa'}
        Form={EditVisaBookingForm}
        // fetchApi={fetchApi}
        formName={'Add Visa'}
        _id={response ? [response[0]._id] : undefined}
      />
    </div>
  )
}

export default PassportSubmitButton
