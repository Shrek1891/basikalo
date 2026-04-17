type UserState = {
    authUser: User | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    onlineUsers: string[];
}

type User = {
    _id: string;
    fullName: string;
    email: string;
    profilePic: string;
}


export const setUserAction = (state: UserState, action: { payload: User | null }  ) => {
    state.authUser = action.payload;
}

export const setIsSigningUpAction = (state: UserState, action: { payload: boolean }) => {
    state.isSigningUp = action.payload;
}

export const setIsLoggingInAction = (state: UserState, action: { payload: boolean }) => {
    state.isLoggingIn = action.payload;
}

export const setIsUpdatingProfileAction = (state: UserState, action: { payload: boolean }) => {
    state.isUpdatingProfile = action.payload;
}


