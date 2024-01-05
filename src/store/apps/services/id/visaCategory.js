import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const toQueryString = params => {
  const query = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
  return query
}

// ** Fetch Users
export const fetchData = createAsyncThunk('appVisaCategory/fetchData', async (params, thunkAPI) => {
  const currentState = thunkAPI.getState()
  // update and merge with new create data
  if (params.newData && params.newData.length !== 0) {
    return {
      data: [...params.newData, ...currentState.visaCategory.data],
      total: currentState.visaCategory.total + params.newData.length
    }
  }
   // update and merge updating data
  if (params.updateData) {
    const updatedData = currentState.visaCategory.data.map(item => {
      const updateItem = params.updateData.find(updateItem => updateItem._id === item._id)

      // If updateItem exists, merge it with the existing item
      return updateItem ? { ...item, ...updateItem } : item
    })
    return { data: updatedData }
  }

  const queryString = toQueryString(params)
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/visa-category?${queryString}`)
  console.log('visaCategory', response)
  return response.data
})

export const appVisaCategorySlice = createSlice({
  name: 'appVisaCategory',
  initialState: {
    data: [],
    total: 0,
    isLoading: false,
    isError: false
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.pending, state => {
      state.isLoading = true
      state.isError = false
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.total = action.payload.total
      state.isLoading = false
      state.isError = false
    })
    builder.addCase(fetchData.rejected, state => {
      state.isLoading = false
      state.isError = true
    })
  }
})

export default appVisaCategorySlice.reducer
