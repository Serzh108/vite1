import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IPost {
  id: string;
  title: string;
  views: number;
}

type PostsResponse = IPost[]

export const postsApi = createApi({
  reducerPath: 'postsApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostsResponse, void>({
      query: () => 'posts',
      providesTags: (result) => result
        ? [...result.map(({ id }) => ({ type: 'Posts' as const, id })),
        { type: 'Posts', id: 'LIST' },
        ]
        : [{
          type: 'Posts', id: 'LIST'
        }],
    }),
    addPost: builder.mutation<IPost, Partial<IPost>>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }]
    })
  }),
});

export const { useGetAllPostsQuery, useAddPostMutation } = postsApi;