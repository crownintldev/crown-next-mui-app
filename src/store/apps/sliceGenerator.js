// sliceGenerator.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const toQueryString = params => {
  const query = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

  return query
}

// ** Fetch Users
export const createFetchDataThunk = (name, api) => {
  return createAsyncThunk(`${name}/fetchData`, async (params, thunkAPI) => {
    const currentState = thunkAPI.getState()

    // update and merge with new create data
    if (params.newData && params.newData.length !== 0) {
      return {
        data: [...params.newData, ...currentState[name].data],
        total: currentState[name].total + params.newData.length
      }
    }

    // update and merge updating data
    if (params.updateData) {
      const updatedData = currentState[name].data.map(item => {
        const updateItem = params.updateData.find(updateItem => updateItem._id === item._id)

        // If updateItem exists, merge it with the existing item
        return updateItem ? { ...item, ...updateItem } : item
      })

      return { data: updatedData }
    }

    const queryString = toQueryString(params)
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/${api}?${queryString}`)

    // console.log(api, response);
    return response.data
  })
}

// const generateReducers = (customReducers = {}) => {
//   const defaultReducers = {
//     setInitialData: (state, action) => {
//       state.initialData = action.payload;
//     },
//     // Add more default reducers as needed
//   };

//   return { ...defaultReducers, ...customReducers };
// };

const generateSlice = ({ name, fetchData }) => {
  // const reducers = generateReducers(customReducers);

  const slice = createSlice({
    name,
    initialState: {
      data: [],
      initialData: [],
      total: 0,
      isLoading: false,
      isError: false
    },

    // reducers,
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

  return slice.reducer //// Return only the reducer part of the slice
  // return slice; //// Return the entire slice object, if reducers defined
}

// export const  {setInitialData}  = generateSlice.actions;
export default generateSlice
