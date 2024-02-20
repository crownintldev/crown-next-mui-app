import axios from 'axios';
import axiosInstance from 'src/utils/axiosInstance';

export const findVisaId = async (data) => {
  // console.log(data)
  return await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_API}/visa-service/find`,
    data
  );
};
