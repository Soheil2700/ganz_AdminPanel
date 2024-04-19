import useSWR from 'swr';
import api from '../interceptor';

function fetcher() {
   return api.get('api/auth/authorize').then((res) => res.data);
}

export default function useAuthUser() {
   return useSWR('authorize', fetcher, {
      revalidateIfStale: false,
      revalidateOnMount: true,
      revalidateOnFocus: false,
   });
}
