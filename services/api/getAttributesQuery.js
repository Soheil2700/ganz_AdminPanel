import api from "../interceptor";
import useSWR from "swr";

function fetcher() {
  return api
    .get("/admin/api/attribute")
    .then((res) => res.data.attributes)
    .catch((err) => []);
}

export function useAttributesQuery() {
  return useSWR("attributes", fetcher);
}

// attributes of one category

function getAttributeOfCategory(categoryName) {
  return api
    .get(`/api/category/${categoryName}/attributes`)
    .then((res) => res.data.data)
    .catch((err) => []);
}

export function useCategoriysAttributesQuery(categoryName) {
  return useSWR(["cat-att", categoryName], () =>
    getAttributeOfCategory(categoryName)
  );
}
