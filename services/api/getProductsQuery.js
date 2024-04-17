import api from "../interceptor";
import useSWR from "swr";

function fetcher() {
  return api
    .get("api/product/panel")
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export function useProductsQuery() {
  return useSWR("products", fetcher );
}

async function getProduct(id){
  try {
    // if(!id || (typeof id !== "number")) return {}
    const res = await api.get("admin/api/product/detail/" + id);
    return res.data;
  } catch (error) {
    return {}
  }
}

export function useProductDetailsQuery(id){
  return useSWR(["product-detail",id], () => getProduct(id))
}