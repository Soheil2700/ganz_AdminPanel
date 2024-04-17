import api from "../interceptor";
import useSWR from "swr";

function fetcher(approve) {
    return api.get("/admin/api/comment" + (approve ? `?isApproved=${approve}` : ""))
        .then(res => res.data.comments) 
        .catch(err => [])
}

export function useCommentsQuery(approve){
    return useSWR(["comments", approve],() => fetcher(approve))
}