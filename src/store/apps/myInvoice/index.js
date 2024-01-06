import { createSlice } from '@reduxjs/toolkit'



export const invoiceSlice = createSlice({
  name: 'myInvoice',
  initialState: {
    data: [],
  },
  reducers: {
    setInvoice: (state, action) => {
      state.data = action.payload
    }
  },

})

export const { setInvoice } = invoiceSlice.actions
export default invoiceSlice.reducer

