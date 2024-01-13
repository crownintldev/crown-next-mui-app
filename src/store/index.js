// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import { createFetchDataThunk } from './apps/sliceGenerator'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/role&permissions'
import passport from './apps/booking/passport'

// import visaBooking from './apps/booking/visaBooking'
// import visaService from './apps/services/visaService'
import account from './apps/account'
import createApp from './apps/createApp'

// import myInvoice from './apps/myInvoice'

import visaCategory from './apps/services/id/visaCategory'
import generate from './generate'
import { generateReducer } from './apps/sliceActionReducer'

// Usage example
export const fetchVisaCategory = createFetchDataThunk('visaCategory', 'visa-category')

export const fetchVisaDestination = createFetchDataThunk('visaDestination', 'visa-destination')

export const fetchVisaDuration = createFetchDataThunk('visaDuration', 'visa-duration')

export const fetchVisaType = createFetchDataThunk('visaType', 'visa-type')

export const fetchVisaService = createFetchDataThunk('visaService', 'visa-service')

export const fetchAgent = createFetchDataThunk('agent', 'agent')

export const fetchClient = createFetchDataThunk('client', 'client')

export const fetchCompany = createFetchDataThunk('company', 'company')

export const fetchVisaBooking = createFetchDataThunk('visaBooking', 'visa-booking')

export const fetchSupplier = createFetchDataThunk('supplier', 'supplier')

export const fetchSupplierCategory = createFetchDataThunk('supplierCategory', 'supplier-category')

export const fetchSupplierVisaService = createFetchDataThunk(
  'supplierVisaService',
  'supplier-visa-service'
)

export const fetchExpenseCategory = createFetchDataThunk('expenseCategory', 'expense-category')

export const fetchExpenseType = createFetchDataThunk('expenseType', 'expense-type')

export const fetchExpense = createFetchDataThunk('expense', 'expense')

export const fetchInvoice = createFetchDataThunk('invoice', 'invoice')

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    passport,
    account,
    createApp,
    visaBooking: generate('visaBooking', fetchVisaBooking),
    visaService: generate('visaService', fetchVisaService),
    visaCategory: generate('visaCategory', fetchVisaCategory),
    visaDestination: generate('visaDestination', fetchVisaDestination),
    visaDuration: generate('visaDuration', fetchVisaDuration),
    visaType: generate('visaType', fetchVisaType),
    agent: generate('agent', fetchAgent),
    company: generate('company', fetchCompany),
    client: generate('client', fetchClient),
    supplier: generate('supplier', fetchSupplier),
    supplierCategory: generate('supplierCategory', fetchSupplierCategory),
    supplierVisaService: generate('supplierVisaService', fetchSupplierVisaService),
    expense: generate('expense', fetchExpense),
    expenseCategory: generate('expenseCategory', fetchExpenseCategory),
    expenseType: generate('expenseType', fetchExpenseType),

    // invoice: generate('invoice', fetchInvoice),
    myInvoice: generateReducer('myInvoice').reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
