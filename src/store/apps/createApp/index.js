// ** Redux Imports
import { Dispatch } from 'redux'

// import { API } from '../../../../config'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// console.log(API)
// ** Axios Imports
import axios from 'axios'

let token = null

// if (
//   auth &&
//   auth.user &&
//   auth.user.role === 'admin' &&
//   auth.user.status === 'active' &&
//   auth.user.dbAccess === 'allowed'
// ) {
//   token = auth.user.token
// }

// ** Fetch Visa Booking
export const fetchData = createAsyncThunk('createAppSlice/fetchData', async params => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/accounts?${params}`)
  
return response.data
})

// ** Add Passport
export const addCardDetails = createAsyncThunk(
  'createApp/addcarddetails',
  async ({ data, token }, { dispatch }) => {
    const headers = {
      Authorization: `${token}`
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/user/createApp`, data, {
      headers
    })

    // dispatch(
    //   fetchData({
    //     limit: 20,
    //     page: 1
    //   })
    // )

    return response.data
  }
)

// export const editPassport = createAsyncThunk(
//   'appPassports/editPassport',
//   async (data: FormData, { dispatch }: Redux) => {
//     const response = await axios.put(`${process.env.NEXT_PUBLIC_API}/passport/update`, data)
//     dispatch(
//       fetchData({
//         limit: 20,
//         page: 1
//       })
//     )

//     return response.data
//   }
// )

// ** Delete User
// export const deleteUser = createAsyncThunk(
//   'appUsers/deleteUser',
//   async (id: number | string, { getState, dispatch }: Redux) => {
//     const response = await axios.delete('/apps/users/delete', {
//       data: id
//     })
//     dispatch(fetchData(getState().user.params))

//     return response.data
//   }
// )

export const createAppSlice = createSlice({
  name: 'createApp',
  initialState: {
    data: [],
    total: 1
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total

      // state.params = action.payload.params
      // state.allData = action.payload.allData
    })
  }
})

export default createAppSlice.reducer
