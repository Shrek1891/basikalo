type ThemeState = {
    theme: string;
}

export const setThemeAction = (state: ThemeState, action: { payload: string }) => {
    localStorage.setItem("theme", action.payload);
    state.theme = action.payload;
}



        

