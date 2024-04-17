import api from "../interceptor";
import useSWR from "swr";

function fetcher() {
    return api.get("/admin/api/user")
        .then(res => res.data.data) 
        .catch(err => [])
}

export function useUsersQuery(){
    return useSWR("users",fetcher)
}