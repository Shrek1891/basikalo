import {createSlice} from "@reduxjs/toolkit";
import {setIsLoggingInAction, setIsSigningUpAction, setIsUpdatingProfileAction, setUserAction} from "./userAction";
import type {Socket} from "socket.io-client";

type UserState = {
    _id: string;
    fullName: string;
    email: string;
    profilePic: string;
}
export const userSlice = createSlice(
    {
        name: "user",
        initialState: {
            authUser: null as UserState | null,
            isSigningUp: false,
            isLoggingIn: false,
            isUpdatingProfile: false,
            onlineUsers: [] as string[],
            socket: null as Socket | null,
        },
        reducers: {
            setUser: setUserAction,
            setIsSigningUp: setIsSigningUpAction,
            setIsLoggingIn: setIsLoggingInAction,
            setIsUpdatingProfile: setIsUpdatingProfileAction,
            addOnlineUser: (state, action) => {
                state.onlineUsers = [...new Set([...state.onlineUsers, ...action.payload])];
            },
            setSocket: (state, action) => {
                state.socket = action.payload;
            },
            removeOnlineUser: (state, action) => {
                state.onlineUsers = state.onlineUsers.filter((user) => user !== action.payload);
            },
        },
    },
)

export const {
    setUser,
    addOnlineUser,
    setSocket,
    removeOnlineUser
} = userSlice.actions;
export default userSlice.reducer;