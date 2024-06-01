import api from '../interceptor';
import useSWR from 'swr';

function fetcher() {
   return api
      .get('api/attribute')
      .then((res) => res.data.attributes)
      .catch((err) => []);
}

export function useAttributesQuery() {
   return useSWR('attributes', fetcher);
}

// attributes of one category

function getAttributeOfCategory(categoryId) {
   return api
      .get(`api/attribute/${categoryId}`)
      .then((res) => res.data.attributes)
      .catch((err) => []);
}

export function useCategoriysAttributesQuery(categoryId) {
   return useSWR(['cat-att', categoryId], () => getAttributeOfCategory(categoryId));
}
