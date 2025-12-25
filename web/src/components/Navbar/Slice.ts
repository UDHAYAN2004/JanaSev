import {emptySplitApi} from "../../pages/api/apiSlice";

export const LogoutApi= emptySplitApi.injectEndpoints({
    endpoints: (builder:any)=>({
        logout: builder.mutation({
            data:()=>({
                url:"/auth/logout",
                method:"POST",
            })
        })
    })
})