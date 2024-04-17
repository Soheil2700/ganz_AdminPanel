import api from "../interceptor";
import useSWR from "swr";

function fetcher() {
  return api
    .get("api/category")
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export function useCategoriesQuery() {
  return useSWR("category", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
}
