import { emptySplitApi } from "../api/apiSlice";

const ViewSchemesApi= emptySplitApi.injectEndpoints({
    endpoints:(builder)=>({
        GetSchemeById:builder.query<any,string>({
            query:(id:string)=>({
                url:`/schemes/get-scheme/${id}`,
                method:"GET",
            })
        })
    })
})
export const {useGetSchemeByIdQuery}=ViewSchemesApi;