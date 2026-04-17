import {configureStore} from '@reduxjs/toolkit'
import userReducer from "../features/user/userSlice.ts"
import {apiSlice} from '../features/api/apiSlice.ts'
import themeReducer from '../features/themes/themeSlice.ts'
import {messagesApiSlice} from '../features/api/massagesApiSlice.ts'
import chatSlice from '../features/chat/chatSlice.ts'

const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
        chat: chatSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [messagesApiSlice.reducerPath]: messagesApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware, messagesApiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
