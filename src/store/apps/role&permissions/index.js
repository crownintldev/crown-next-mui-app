// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { renderAddRecord } from 'src/store/commonFn/commonFunctions'
import { axiosErrorToast, axiosSuccessToast } from 'src/utils/helperfunction'

export const addPermission = createAsyncThunk(
  'appPermissions/addPermission',
  async ({ values, token, recordName }, { dispatch, getState }) => {
    dispatch(setSpinner(true))
    dispatch(setSuccess(false)) // Reset success before making the request

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/permission/addPermission`,
        values,
        { headers: { Authorization: token } }
      )
      console.log('===response', response)
      dispatch(setSpinner(false))
      if (recordName && response.data) {
        if (response.data.status === 'SUCCESS') {
          dispatch(setSuccess(true)) // Set success to true on successful response
          
return { [recordName]: response.data, recordName: recordName }
        }
      }
    } catch (error) {
      dispatch(setSpinner(false))
      dispatch(setSuccess(false)) // Set success to false on error
      dispatch(setMessage(error.response.data.message)) // Set success to false on error
      throw error
    }
  }
)

export const addUserRole = createAsyncThunk(
  'appPermissions/addUserRole',
  async ({ values, token, recordName }, { dispatch }) => {
    let authToken = null
    dispatch(setSpinner(true))
    dispatch(setSuccess(false)) // Reset success before making the request
    if (token) {
      authToken = token
    }
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/role/addRole`, values, {
        headers: { Authorization: authToken }
      })
      console.log('===response', response)
      dispatch(setSpinner(false))
      if (recordName && response.data) {
        if (response.data.status === 'SUCCESS') {
          dispatch(setSuccess(true)) // Set success to true on successful response
          
return { [recordName]: response.data, recordName: recordName }
        }
      }
    } catch (error) {
      dispatch(setSpinner(false))
      dispatch(setSuccess(false)) // Set success to false on error
      dispatch(setMessage(error.response.data.message)) // Set success to false on error
      throw error
    }
  }
)

// ** Fetch Invoices
export const fetchData = createAsyncThunk('appPermissions/fetchData', async ({ query, token }) => {
  let authorization
  let params
  if (query) {
    params = `${JSON.stringify(query)}`
  }
  if (token) {
    authorization = `${token}`
  }
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/permission/getPermission?${params}`,
      {
        headers: {
          Authorization: authorization
        }
      }
    )
    
return response.data
  } catch (error) {
    throw error
  }
})

export const fetchUserRoles = createAsyncThunk(
  'appPermissions/fetchUserRoles',
  async ({ data, token, recordName }, { dispatch }) => {
    let authorization
    let params

    if (data) {
      params = `/${JSON.stringify(data)}`
    }

    if (token) {
      authorization = `${token}`
    }
    try {
      dispatch(setSpinner(true)) // Ensure spinner is turned off in case of an error

      const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/role/getRole${params}`, {
        headers: {
          Authorization: authorization
        }
      })

      dispatch(setSpinner(false))
      if (recordName && response.data) {
        if (response.data.status === 'SUCCESS') {
          return { [recordName]: response.data, recordName: recordName }
        }
      }
    } catch (error) {
      dispatch(setSpinner(false)) // Ensure spinner is turned off in case of an error
      dispatch(setMessage(error.response.data.message))
      throw error
    }
  }
)

export const fetchModules = createAsyncThunk(
  'appPermissions/fetchModules',
  async ({ data, token, recordName }, { dispatch }) => {
    let authorization
    let params

    if (data) {
      params = `/${JSON.stringify(data)}`
    }

    if (token) {
      authorization = `${token}`
    }
    try {
      dispatch(setSpinner(true)) // Ensure spinner is turned off in case of an error

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/module/getModuleList${params}`,
        {
          headers: {
            Authorization: authorization
          }
        }
      )

      dispatch(setSpinner(false))
      if (recordName && response.data) {
        if (response.data.status === 'SUCCESS') {
          return { [recordName]: response.data, recordName: recordName }
        }
      }
    } catch (error) {
      dispatch(setSpinner(false)) // Ensure spinner is turned off in case of an error
      dispatch(setMessage(error.response.data.message))
      throw error
    }
  }
)

export const fetchUserPermissions = createAsyncThunk(
  'appPermissions/fetchUserPermissions',
  async ({ limit, page, token, recordName }, { dispatch }) => {
    let authorization
    let params

    const query = {
      limit: limit,
      pageNumber: page
    }
    if (query) {
      params = `/${JSON.stringify(query)}`
    }

    if (token) {
      authorization = `${token}`
    }
    try {
      dispatch(setSpinner(true)) // Ensure spinner is turned off in case of an error

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/permission/getPermission${params}`,
        {
          headers: {
            Authorization: authorization
          }
        }
      )

      dispatch(setSpinner(false))
      if (recordName && response.data) {
        if (response.data.status === 'SUCCESS') {
          return { [recordName]: response.data, recordName: recordName }
        }
      }
    } catch (error) {
      dispatch(setSpinner(false)) // Ensure spinner is turned off in case of an error
      dispatch(setMessage(error.response.data.message))
      throw error
    }
  }
)

export const fetchPermissionsWithId = createAsyncThunk(
  'appPermissions/fetchPermissionsWithId',
  async ({ data, token, recordName }, { dispatch }) => {
    console.log('==event ', data, token, recordName)
    let authorization
    let params
    if (data) {
      params = `/${JSON.stringify(data)}`
    }
    if (token) {
      authorization = `${token}`
    }
    try {
      dispatch(setSpinner(true)) // Ensure spinner is turned off in case of an error

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/permission/getPermissionDetailsWithId${params}`,
        {
          headers: {
            Authorization: authorization
          }
        }
      )

      dispatch(setSpinner(false))
      if (recordName && response.data) {
        if (response.data.status === 'SUCCESS') {
          return { [recordName]: response.data, recordName: recordName }
        }
      }
    } catch (error) {
      dispatch(setSpinner(false)) // Ensure spinner is turned off in case of an error
      dispatch(setMessage(error.response.data.message))
      throw error
    }
  }
)

export const appPermissionsSlice = createSlice({
  name: 'appPermissions',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    spinner: false,
    success: false,
    error: false,
    message: ''
  },
  reducers: {
    setSpinner: (state, action) => {
      state.spinner = action.payload
    },
    setMessage: (state, action) => {
      state.message = action.payload
    },
    setSuccess: (state, action) => {
      state.success = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const recordName = action.payload?.recordName
        if (recordName) {
          state[recordName] = action.payload[recordName].Record
        }
      })
      .addCase(addPermission.pending, state => {
        state.spinner = true // Turn on spinner when the request starts
        state.message = '' // Turn on spinner when the request starts
      })
      .addCase(addPermission.fulfilled, (state, action) => {
        const recordName = action.payload.recordName
        if (recordName) {
          const record = renderAddRecord(
            state[recordName],
            action.payload[recordName].Record.tableData[0]
          )
          console.log('====rec record', record)
          state[recordName] = record
          axiosSuccessToast(action.payload[recordName])
        }
      })
      .addCase(addPermission.rejected, state => {
        state.spinner = false
        state.success = false

        // axiosErrorToast(state.message)
      })
      .addCase(fetchUserPermissions.fulfilled, (state, action) => {
        const recordName = action.payload.recordName
        if (recordName) {
          state[recordName] = action.payload[recordName].Record
          axiosSuccessToast(action.payload[recordName])
        }
      })
      .addCase(fetchUserPermissions.rejected, (state, action) => {
        state.spinner = false
      })
      .addCase(fetchPermissionsWithId.fulfilled, (state, action) => {
        const recordName = action.payload.recordName
        if (recordName) {
          state[recordName] = action.payload[recordName].Record
          axiosSuccessToast(action.payload[recordName])
        }
      })
      .addCase(fetchPermissionsWithId.rejected, (state, action) => {
        state.spinner = false
      })
      .addCase(addUserRole.pending, state => {
        state.spinner = true // Turn on spinner when the request starts
        state.message = '' // Turn on spinner when the request starts
      })
      .addCase(addUserRole.fulfilled, (state, action) => {
        const recName = action.payload.recordName
        if (recName) {
          const record = renderAddRecord(
            state[action.payload.recordName],
            action.payload[recName].Record
          )
          state[recName] = record
          axiosSuccessToast(action.payload[recName])
        }
      })
      .addCase(addUserRole.rejected, state => {
        state.spinner = false
        state.success = false

        // axiosErrorToast(state.message)
      })
      .addCase(fetchUserRoles.fulfilled, (state, action) => {
        const recordName = action.payload.recordName
        if (recordName) {
          state[recordName] = action.payload[recordName].Record.tableData
          axiosSuccessToast(action.payload[recordName])
        }
      })
      .addCase(fetchUserRoles.rejected, (state, action) => {
        state.spinner = false
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        const recordName = action.payload.recordName
        if (recordName) {
          state[recordName] = action.payload[recordName].Record
          axiosSuccessToast(action.payload[recordName])
        }
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.spinner = false
      })
  }
})

export const { setSpinner, setMessage, setSuccess } = appPermissionsSlice.actions

export default appPermissionsSlice.reducer
