// import { createSlice } from '@reduxjs/toolkit'

// export const invoiceSlice = createSlice({
//   name: 'myInvoice',
//   initialState: {
//     data: [],
//   },
//   reducers: {
//     setInvoice: (state, action) => {
//       state.data = action.payload
//     }
//   },

// })

// export const { setInvoice } = invoiceSlice.actions
// export default invoiceSlice.reducer

// reusable
import { createSlice } from '@reduxjs/toolkit'

export const generateReducer = name => {
  const slice = createSlice({
    name,
    initialState: { data: [] },
    reducers: {
      setData: (state, action) => {
        state.data = action.payload
      }
    }
  })

  // Return both the reducer and the actions
  return { reducer: slice.reducer, actions: slice.actions }
}

export const getReducer = name => {
  const myInvoiceSlice = generateReducer(name)
  const { setData } = myInvoiceSlice.actions

  return setData
}
//how to use
// const setAccessToken = getReducer('sameuseSelectorValue')
// reducer
// accessToken:generateReducer('sameuseSelectorValue').reducer,
