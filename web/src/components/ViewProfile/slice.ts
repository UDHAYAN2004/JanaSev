import { emptySplitApi } from "../../pages/api/apiSlice";

export const ProfileApi= emptySplitApi.injectEndpoints({
    endpoints:(builder)=>({
        updateProfile:builder.mutation<void,FormData>({
            query:(data)=>({
                url:"/users/update-profile",
                method:"PUT",
                body:data
            })
        })
    })
})
export const {useUpdateProfileMutation}=ProfileApi