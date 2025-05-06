import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
type AuthResponse = {
    token:string;
    user:{
        id:number,
        name:string;
        email:string;
    }
}
type LoginPayload = {
    email:string;
    password:string;
}
interface RegisterPayload extends LoginPayload {
    name:string;
}


export const authApi = createApi({
    reducerPath:'authApi',

    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    endpoints:(b) =>({
        login:b.mutation<AuthResponse,LoginPayload>({
            query:(creds)=>({url:"/login",method:"POST",body:creds}),
        }),
        
        register:b.mutation<AuthResponse,RegisterPayload>({
            query:(creds)=>({url:"/register",method:"POST",body:creds}),
        }),
        
    }),

})
export const {useLoginMutation,useRegisterMutation} = authApi;