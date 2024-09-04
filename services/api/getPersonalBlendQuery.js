import api from '../interceptor';
import useSWR from 'swr';

function fetcher(page = 1) {
   return api
      .get(`api/product?bulk_cargo=true&page=${page}&sortBy=CREATION_DATE&size=12`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
}

export function usePersonalBlendQuery(page = 1) {
   return useSWR('personalBlend', () => fetcher(page));
}

async function getProduct(id) {
   try {
      // if(!id || (typeof id !== "number")) return {}
      const res = await api.get('admin/api/product/detail/' + id);
      return res.data;
   } catch (error) {
      return {};
   }
}

export function useProductDetailsQuery(id) {
   return useSWR(['product-detail', id], () => getProduct(id));
}
