import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store";
import { Video } from "@/types";

export const videoApi = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      console.log("Token from Redux:", token); // <- this line
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Video", "Comments"],

  endpoints: (builder) => ({
    getVideo: builder.query<Video, string>({
      query: (id) => `videos/${id}`,
      providesTags: (_result, _error, id) => [
        { type: "Video" as const, id },
        { type: "Comments" as const, id },
      ],
      transformResponse: (response: { data: Video }) => response.data,
    }),
    
    getAllVideos:builder.query<Video[],string>({
      query : ()=>'/videos',
      transformResponse:(response:{data:Video[]}) =>response.data,
    }),
    getLikedVideos:builder.query<Video[],string>({
      query:()=>'/videos/liked',
      transformResponse:(response:{data:Video[]})=>response.data,
    }),
    searchVideos:builder.query<Video[],string>({
      query : (searchTerm)=>`/videos/search?q=${searchTerm}`,
      transformResponse:(response:{data:Video[]}) =>response.data,
    }),

    // 2) Post a new comment
    postComment: builder.mutation<Comment, { videoId: string; text: string }>({
      query: ({ videoId, text }) => ({
        url: `videos/${videoId}/comments`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: (_result, _error, { videoId }) => [
        { type: "Comments" as const, id: videoId },
      ],
    }),

    postVideo:builder.mutation<Video,FormData>({
      query:(formData)=> ({
        url: `/videos`,
        method:"POST",
        body:formData
      }),
      transformResponse:(response:{data:Video})=>response.data
    }),
    // 3) Toggle like/unlike
    toggleLike: builder.mutation<{ liked: boolean }, string>({
      query: (videoId) => ({
        url: `videos/${videoId}/like`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, videoId) => [
        { type: "Video" as const, id: videoId },
      ],
    }),

  }),
});

export const {
  useGetLikedVideosQuery,
  useSearchVideosQuery,
  useGetVideoQuery,
  usePostCommentMutation,
  useToggleLikeMutation,
  useGetAllVideosQuery,
  usePostVideoMutation
} = videoApi;
