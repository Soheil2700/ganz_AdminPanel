import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SToastContainer = () => {
   return (
      <ToastContainer
         position="top-right"
         autoClose={4000}
         hideProgressBar={false}
         newestOnTop
         closeOnClick
         rtl
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
      />
   );
};
export const notifyInfo = (text) => {
   toast.info(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
   });
};
export const notifySuccess = (text) =>
   toast.success(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
   });
export const notifyWarning = (text) =>
   toast.warning(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
   });
export const notifyError = (text) =>
   toast.error(text, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
   });
