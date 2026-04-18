import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import io from "socket.io-client";
import type {Dispatch} from '@reduxjs/toolkit';
import {addOnlineUser, setSocket} from "../user/userSlice.ts";
import {addSocketToChat} from "../chat/chatSlice.ts";
import type {RootState} from "../../store/store.ts";

export type User = {
    _id: string;
    fullName: string;
    email: string;
    profilePic: string;
}

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

const handleCacheEntryAdded = async (
    _arg: unknown,
    {cacheDataLoaded, cacheEntryRemoved: _cacheEntryRemoved, dispatch: _dispatch}: {
        cacheDataLoaded: Promise<{ data: User }>;
        cacheEntryRemoved: Promise<void>;
        dispatch: Dispatch
    }
) => {
    try {
        await cacheDataLoaded;
        const {data} = await cacheDataLoaded;
        if (data._id) {
            const socket = io(BASE_URL, {
                query: {userId: data._id},
            });
            _dispatch(setSocket(socket));
            _dispatch(addSocketToChat(socket));
            socket.connect();
            socket.on("getOnlineUsers", (userId) => {
                _dispatch(addOnlineUser(userId.toString().split(",")));
            });
        }
    } catch (e) {
        console.error(e);
    }
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api",
        credentials: "include",
    }),
    endpoints: (builder) => ({
        checkAuth: builder.query<User, void>({
            query: () => "/auth/check",
            onCacheEntryAdded: handleCacheEntryAdded,
        }),
        signUp: builder.mutation({
            query: (data) => ({
                url: "/auth/signup",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            onCacheEntryAdded: handleCacheEntryAdded,

        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
                credentials: "include",
            }),
            onCacheEntryAdded: handleCacheEntryAdded,
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                credentials: "include",
            }),
            async onCacheEntryAdded(_arg, {cacheDataLoaded, getState}) {
                await cacheDataLoaded;
                const state = getState() as RootState;
                const socket = state.user.socket;
                const user = state.user.authUser;
                if (socket && user) {
                    if (socket.connected) {
                        socket.disconnect();
                    }
                }
            },
        }),
        updateProfile: builder.mutation({
            query: (formData) => ({
                url: "/auth/update-profile",
                method: "PUT",
                body: formData,
                credentials: "include",
            }),
        }),
    }),
});

export const {
    useCheckAuthQuery,
    useSignUpMutation,
    useLoginMutation,
    useLogoutMutation,
    useUpdateProfileMutation,

} = apiSlice;
