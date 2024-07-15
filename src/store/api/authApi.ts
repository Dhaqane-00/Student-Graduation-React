import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/auth' }), // Ensure this matches your Flask backend
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (formData) => {
        const form = new FormData();
        Object.keys(formData).forEach(key => {
          form.append(key, formData[key]);
        });
        return {
          url: '/signup',
          method: 'POST',
          body: form,
        };
      },
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    // updateUser: builder.mutation({
    //   query: ({ userId, formData }) => {
    //     const form = new FormData();
    //     Object.keys(formData).forEach(key => {
    //       form.append(key, formData[key]);
    //     });
    //     return {
    //       url: `/update/${userId}`,
    //       method: 'PUT',
    //       body: formData,
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       }
    //     };
    //   },
    // }),
    updateUser: builder.mutation({
      query: ({ userId, formData }) => ({
        url: `/update/${userId}`,
        method: 'PUT',
        body: formData,
        headers: {
          // Let the browser set the `Content-Type` header automatically for FormData
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: '/forgot-password',
        method: 'POST',
        body: { email },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: '/reset-password',
        method: 'POST',
        body: { token, password },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    getUserByID : builder.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'GET',
      }),
    })
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useUpdateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserByIDQuery
} = authApi;
export default authApi.reducer;
