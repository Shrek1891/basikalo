import {createSlice} from "@reduxjs/toolkit";
import setSelectedUserAction from "./chatAction";
import type {Socket} from "socket.io-client";
import type {User} from "../../../types/types.ts";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        selectedUser: null as User | null,
        messages: [] as string[],
        users: [],
        socket: null as Socket | null,
    },
    reducers: {
        setSelectedUser: setSelectedUserAction,
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
        addSocketToChat: (state, action) => {
            state.socket = action.payload
        },
        unsubscribeFromMessages: (state, _) => {
            state.socket?.off("newMessage");
        },
    },
});

export const {setSelectedUser, addMessage, setUsers, addSocketToChat, unsubscribeFromMessages} = chatSlice.actions;
export default chatSlice.reducer;