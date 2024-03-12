import axios from 'axios';
import axiosInstance from 'src/utils/axiosInstance';

export const getInvoiceNumber = async () => {
  return await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API}/invoice/counter`
  );
};
