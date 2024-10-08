import api from '../interceptor';
import useSWR from 'swr';

function fetcher(page) {
   return api
      .get(`api/product?page=${page}&sortBy=CREATION_DATE&size=12`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
}

export function useProductsQuery(page = 1) {
   return useSWR('products', () => fetcher(page));
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
