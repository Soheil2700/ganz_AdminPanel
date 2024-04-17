import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { notifySuccess, notifyError } from '@/components/shared/notify/SNotify';

const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
   withCredentials: true,
   timeout: 50_000,
});

const AxiosInterceptor = ({ children }) => {
   const router = useRouter();

   useEffect(() => {
      const resInterceptor = (response) => {
         if (response.data.withMessage) notifySuccess(response.data.message);
         return response;
      };

      const errInterceptor = (error) => {
         if (error?.response?.data?.withMessage) notifyError(error.response.data.message);
         if (error.response && error.response.status === 401) {
            router.push('/login');
         }

         return Promise.reject(error);
      };

      const interceptor = api.interceptors.response.use(resInterceptor, errInterceptor);

      return () => {
         api.interceptors.response.eject(interceptor);
      };
   }, []);

   return children;
};

export default api;
export { AxiosInterceptor };
