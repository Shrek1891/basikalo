import {Navigate, Route, Routes} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import {useCheckAuthQuery} from "./features/api/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "./features/user/userSlice";
import type {RootState} from "./store/store";
import {useEffect} from "react";
import Loader from "./components/loader.tsx";
import AboutPage from "./pages/AboutPage.tsx";


function App() {
    const {data: authUser, isLoading: authLoading} = useCheckAuthQuery(undefined);
    const theme = useSelector((state: RootState) => state.theme);
    useEffect(() => {
        document.documentElement.dataset.theme = theme.theme;
    }, [theme]);
    const dispatch = useDispatch();
    const authUserFromStore = useSelector(
        (state: RootState) => state.user.authUser,
    );
    useEffect(() => {
        dispatch(setUser(authUser ?? null));
    }, [authUser, dispatch]);
    if (authLoading) {
        return (
            <Loader/>
        );
    }
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route
                    path="/"
                    element={
                        authUserFromStore ? (
                            <HomePage/>
                        ) : (
                            <Navigate to="/signup"/>
                        )
                    }
                />
                <Route
                    path="/signup"
                    element={
                        !authUser || !authUserFromStore ? (
                            <SignupPage type="register"/>
                        ) : (
                            <Navigate to="/"/>
                        )
                    }
                />
                <Route path="/settings" element={<SettingsPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route
                    path="/profile"
                    element={
                        authUserFromStore ? (
                            <ProfilePage/>
                        ) : (
                            <Navigate to="/signup"/>
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
