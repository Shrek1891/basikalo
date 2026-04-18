import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const messagesApiSlice = createApi({
    reducerPath: "messages",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (userId) => `messages/${userId}`,
        }),
        sendMessage: builder.mutation({
            query: ({message, selectedUser}) => ({
                url: `messages/send/${selectedUser._id}`,
                method: "POST",
                body: message,
                credentials: "include",
            }),
        }),
        getUsers: builder.query({
            query: () => "messages/users",
        }),
    }),
});

export const {useGetMessagesQuery, useSendMessageMutation, useGetUsersQuery} = messagesApiSlice;