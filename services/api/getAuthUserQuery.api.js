import useSWR from 'swr';
import api from '../interceptor';

function fetcher() {
   return api.get('auth/get-user').then((res) => res.data);
}

export default function useAuthUser() {
   return useSWR('get-user', fetcher, {
      revalidateIfStale: false,
      revalidateOnMount: true,
      revalidateOnFocus: false,
   });
}
