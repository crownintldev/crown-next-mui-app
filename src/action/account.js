import axios from 'axios'

export const filterInvoiceAccount = data => {
  return axios.post(`${process.env.NEXT_PUBLIC_API}/accounts/filter`, data)
}
