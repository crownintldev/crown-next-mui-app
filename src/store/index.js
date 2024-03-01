// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit';
import { createFetchDataThunk } from './apps/sliceGenerator';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// ** Reducers
import chat from 'src/store/apps/chat';
import user from 'src/store/apps/user';
import email from 'src/store/apps/email';
// import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar';
import permissions from 'src/store/apps/permissions';
import passport from './apps/booking/passport';

// import visaBooking from './apps/booking/visaBooking'
// import visaService from './apps/services/visaService'
import account from './apps/account';
import createApp from './apps/createApp';

// import myInvoice from './apps/myInvoice'

import visaCategory from './apps/services/id/visaCategory';
import generate from './generate';
import { generateReducer } from './apps/sliceActionReducer';

// Usage example
export const fetchVisaCategory = createFetchDataThunk('visaCategory', 'visa-category');

export const fetchVisaDestination = createFetchDataThunk(
  'visaDestination',
  'visa-destination'
);

export const fetchVisaDuration = createFetchDataThunk('visaDuration', 'visa-duration');

export const fetchVisaType = createFetchDataThunk('visaType', 'visa-type');

export const fetchVisaService = createFetchDataThunk('visaService', 'visa-service');

export const fetchAgent = createFetchDataThunk('agent', 'agent');

export const fetchClient = createFetchDataThunk('client', 'client');

export const fetchCompany = createFetchDataThunk('company', 'company');

export const fetchVisaBooking = createFetchDataThunk('visaBooking', 'visa-booking');

export const fetchSupplier = createFetchDataThunk('supplier', 'supplier');

export const fetchSupplierCategory = createFetchDataThunk(
  'supplierCategory',
  'supplier-category'
);

export const fetchSupplierVisaService = createFetchDataThunk(
  'supplierVisaService',
  'supplier-visa-service'
);

export const fetchExpenseCategory = createFetchDataThunk(
  'expenseCategory',
  'expense-category'
);

export const fetchExpenseType = createFetchDataThunk('expenseType', 'expense-type');

export const fetchExpense = createFetchDataThunk('expense', 'expense');

export const fetchInvoice = createFetchDataThunk('invoice', 'invoice');
export const fetchTicketBooking = createFetchDataThunk('ticketBooking', 'ticket-booking');
export const fetchSupplierAccount = createFetchDataThunk(
  'supplierAccount',
  'supplier-account'
);
export const fetchPaymentHead = createFetchDataThunk('paymentHead', 'payment-head');
export const fetchPaymentHeadType = createFetchDataThunk(
  'paymentHeadType',
  'payment-head-type'
);

//Auth App
export const fetchUser = createFetchDataThunk(
  'user',
  'user',
  process.env.NEXT_PUBLIC_AUTH
);
export const fetchRole = createFetchDataThunk(
  'role',
  'role',
  process.env.NEXT_PUBLIC_AUTH
);
export const fetchBranch = createFetchDataThunk(
  'branch',
  'branch',
  process.env.NEXT_PUBLIC_AUTH
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['token', 'loginUser']
};
const rootReducer = combineReducers({
  user,
  chat,
  email,
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
  invoice: generate('invoice', fetchInvoice),
  ticketBooking: generate('ticketBooking', fetchTicketBooking),
  supplierAccount: generate('supplierAccount', fetchSupplierAccount),
  paymentHead: generate('paymentHead', fetchPaymentHead),
  paymentHeadType: generate('paymentHeadType', fetchPaymentHeadType),
  myInvoice: generateReducer('myInvoice').reducer,
  // auth
  token: generateReducer('token').reducer,
  user: generate('user', fetchUser),
  loginUser: generateReducer('loginUser').reducer,
  role: generate('role', fetchRole),
  branch: generate('branch', fetchBranch)
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store);
