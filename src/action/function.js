import axios from 'axios';
import toast from 'react-hot-toast';
import { axiosErrorMessage, capitalizeSplitDash } from 'src/utils/helperfunction';
import axiosInstance from 'src/utils/axiosInstance';
import { AccountApi } from 'config';
import { getCookie } from './auth-action';
import { reduxToken } from './auth-action';

const accessToken = reduxToken();
export const createApi = async ({
  api,
  apidomain,
  completeApi,
  data,
  dispatch,
  fetchData,
  fetchList,
  toggle,
  reset,
  message,
  removeSelection,
  optional
}) => {
  const baseURL = apidomain || AccountApi;
  let myapi = completeApi ? completeApi : `${api}/create`;
  try {
    const response = await axios.post(`${baseURL}/${myapi}`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    // console.log(response.data.data)
    if (removeSelection) {
      removeSelection();
    }
    if (response.data.data) {
      const fetchApi = fetchData
        ? fetchData({ newData: response.data.data })
        : fetchList({});
      dispatch(fetchApi);
      if (toggle) {
        toggle();
      }
      if (reset) {
        reset();
      }
      if (optional) {
        optional();
      }
      toast.success(
        message
          ? message
          : api
          ? `${capitalizeSplitDash(api)} Create Successfully`
          : 'Create Successfully',
        {
          position: 'top-center'
        }
      );
    }
  } catch (err) {
    toast.error(axiosErrorMessage(err), { position: 'top-center' });
  }
};

export const updateApi = async ({
  _id,
  api,
  apidomain,
  data,
  dispatch,
  fetchData,
  fetchList,
  toggle,
  reset,
  message,
  removeSelection
}) => {
  const baseURL = apidomain || AccountApi;

  try {
    const response = await axiosInstance.put(`${baseURL}/${api}/update/${_id}`, data);

    if (response.data.data) {
      const fetchApi = fetchData
        ? fetchData({ updateData: response.data.data })
        : fetchList({});
      dispatch(fetchApi);
      if (toggle) {
        toggle();
      }
      if (reset) {
        reset();
      }
      toast.success(
        message ? message : `${capitalizeSplitDash(api)} Update Successfully`,
        {
          position: 'top-center'
        }
      );
      if (removeSelection) {
        removeSelection();
      }
    }
  } catch (err) {
    console.error(axiosErrorMessage(err));
    toast.error(axiosErrorMessage(err), { position: 'top-center' });
  }
};

export const updateManyApi = async ({
  api,
  completeApi,
  apidomain,
  data,
  dispatch,
  fetchData,
  toggle,
  reset,
  message,
  removeSelection,
  optional
}) => {
  const baseURL = apidomain || AccountApi;
  let myapi = completeApi ? completeApi : `${api}/update`;
  try {
    const response = await axios.put(`${baseURL}/${myapi}`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (response) {
      dispatch(fetchData({ updateData: response.data.data }));
      if (toggle) {
        toggle();
      }
      if (reset) {
        reset();
      }
      if (removeSelection) {
        removeSelection();
      }
      if (optional) {
        optional();
      }
    }

    // console.log(response)
    toast.success('Update Successfully', { position: 'top-center' });
  } catch (err) {
    toast.error(axiosErrorMessage(err), { position: 'top-center' });
  }
};

export const createManyApi = async ({
  api,
  completeApi,
  apidomain,
  data,
  dispatch,
  fetchData,
  toggle,
  reset,
  message,
  removeSelection,
  optional
}) => {
  const baseURL = apidomain || AccountApi;
  let myapi = completeApi ? completeApi : `${api}/create`;
  try {
    const response = await axios.post(`${baseURL}/${myapi}`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (response) {
      dispatch(fetchData({ limit: 20 }));
      // dispatch(fetchData({  newData: response.data.data}))
      if (toggle) {
        toggle();
      }
      if (reset) {
        reset();
      }
      if (removeSelection) {
        removeSelection();
      }
      if (optional) {
        optional();
      }
    }

    // console.log(response)
    toast.success('Update Successfully', { position: 'top-center' });
  } catch (err) {
    toast.error(axiosErrorMessage(err), { position: 'top-center' });
  }
};

export const handleDeleteApi = async ({
  api,
  ids,
  completeApi,
  apidomain,
  dispatch,
  fetchData,
  toggle,
  reset,
  message,
  removeSelection
}) => {
  const baseURL = apidomain || AccountApi;

  // Confirmation dialog
  const confirmDeletion = window.confirm('Are you sure you want to delete this item?');

  if (confirmDeletion) {
    try {
      const response = await axiosInstance.post(`${baseURL}/${api}/remove`, { ids });
      dispatch(fetchData({}));
      toast.success(
        message ? message : `${capitalizeSplitDash(api)} Deleted Successfully`,
        {
          position: 'top-center'
        }
      );
    } catch (err) {
      console.error(axiosErrorMessage(err));
      toast.error(axiosErrorMessage(err), { position: 'top-center' });
    }
  } else {
    // Optionally handle the cancellation
    console.log('Deletion cancelled.');
  }
};
