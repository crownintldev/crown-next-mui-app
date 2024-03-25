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
export const fetchAdditionalSupplierAccount = createFetchDataThunk(
  'additionalSupplierAccount',
  'additional-supplier-account'
);

export const fetchBusinesssetting = createFetchDataThunk(
  'businessSetting',
  'business-setting'
);

export const fetchHotelBooking = createFetchDataThunk('hotelBooking', 'hotel-booking');
export const fetchHotelBookingCategory = createFetchDataThunk(
  'hotelBookingCategory',
  'hotel-booking-category'
);
export const fetchHotelBookingDestination = createFetchDataThunk(
  'hotelBookingDestination',
  'hotel-booking-destination'
);
export const fetchHotelBookingRoomType = createFetchDataThunk(
  'hotelBookingRoomType',
  'hotel-booking-room-type'
);

export const fetchInsurance = createFetchDataThunk('insurance', 'insurance');
export const fetchInsuranceType = createFetchDataThunk('insurance-type', 'insuranceType');
export const fetchInsuranceCategory = createFetchDataThunk(
  'insuranceCategory',
  'insurance-category',
);
export const fetchInsuranceDuration = createFetchDataThunk(
  'insuranceDuration',
  'insurance-duration',
);
export const fetchInsuranceCompany = createFetchDataThunk(
  'insuranceCompany',
  'insurance-company',
);
export const fetchPaymentMethod = createFetchDataThunk('paymentMethod', 'payment-method');
export const fetchSubsidiary = createFetchDataThunk('subsidiary', 'subsidiary');
export const fetchSubsidiaryType = createFetchDataThunk(
  'subsidiaryType',
  'subsidiary-type',
);
export const fetchAccoutPaymentHistory = createFetchDataThunk(
  'accoutPaymentHistory',
  'account-payment-history'
);
export const fetchSupplierAccoutPaymentHistory = createFetchDataThunk(
  'supplierAccoutPaymentHistory',
  'supplier-account-payment-history'
);
export const fetchAdditionalSupplierAccoutPaymentHistory = createFetchDataThunk(
  'additionalSupplierAccoutPaymentHistory',
  'additional-supplier-account-payment-history'
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
  whitelist: ['token', 'loginUser', 'myInvoice']
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
  additionalSupplierAccount: generate(
    'additionalSupplierAccount',
    fetchAdditionalSupplierAccount
  ),
  subsidiary: generate('subsidiary', fetchSubsidiary),
  subsidiaryType: generate('subsidiaryType', fetchSubsidiaryType),
  paymentMethod: generate('paymentMethod', fetchPaymentMethod),
  accoutPaymentHistory: generate('accoutPaymentHistory', fetchAccoutPaymentHistory),
  supplierAccoutPaymentHistory: generate(
    'supplierAccoutPaymentHistory',
    fetchSupplierAccoutPaymentHistory
  ),
  additionalSupplierAccoutPaymentHistory: generate(
    'additionalSupplierAccoutPaymentHistory',
    fetchAdditionalSupplierAccoutPaymentHistory
  ),
  myInvoice: generateReducer('myInvoice').reducer,
  hotelBooking: generate('hotelBooking', fetchHotelBooking),
  hotelBookingCategory: generate('hotelBookingCategory', fetchHotelBookingCategory),
  hotelBookingDestination: generate('hotelBookingCategory', fetchHotelBookingDestination),
  hotelBookingRoomType: generate('hotelBookingCategory', fetchHotelBookingRoomType),
  insurance: generate('insurance', fetchInsurance),
  insuranceCategory: generate('insurance', fetchInsuranceCategory),
  insuranceDuration: generate('insurance', fetchInsuranceDuration),
  insuranceType: generate('insurance', fetchInsuranceType),
  insuranceCompany: generate('insurance', fetchInsuranceCompany),
  // auth
  token: generateReducer('token').reducer,
  user: generate('user', fetchUser),
  loginUser: generateReducer('loginUser').reducer,
  role: generate('role', fetchRole),
  branch: generate('branch', fetchBranch),
  businessSetting: generate('businessSetting', fetchBusinesssetting),

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
