import {Link} from "react-router-dom";
import {HiLogout} from "react-icons/hi";
import {LuMessagesSquare, LuUserRound} from "react-icons/lu";
import {SlSettings} from "react-icons/sl";
import {useLogoutMutation} from "../features/api/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store";
import {setUser} from "../features/user/userSlice";
import toast from "react-hot-toast";
import {SiAboutdotme} from "react-icons/si";

const Navbar = () => {
    const [logoutApiCall, {isLoading}] = useLogoutMutation();
    const dispatch = useDispatch();
    const authUser = useSelector((state: RootState) => state.user.authUser);
    const logout = async () => {
        try {
            await logoutApiCall(undefined);
            dispatch(setUser(null));
            toast.success("Logged out successfully");
        } catch {
            toast.error("Error logging out");
        }
    };
    return (
        <header
            className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40
    backdrop-blur-lg bg-base-100/80 "
        >
            {isLoading && (
                <div className="flex gap-2 items-center justify-center h-screen absolute inset-0 bg-black/50 z-10">
                    <span className="size-3 animate-ping rounded-full bg-indigo-600"></span>
                    <span className="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.2s]"></span>
                    <span className="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.4s]"></span>
                </div>
            )}
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
                        >
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                <LuMessagesSquare/>
                            </div>
                            <h1 className="text-lg font-bold">Basikalo</h1>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            to={"/settings"}
                            className={`
                            btn btn-sm gap-2 transition-colors
                        `}
                        >
                            <SlSettings/>
                            <span className="hidden sm:inline">Settings</span>
                        </Link>
                        <Link
                            to={"/about"}
                            className={`
                            btn btn-sm gap-2 transition-colors
                        `}
                        >
                            <SiAboutdotme className="size-5"/>
                            <span className="hidden sm:inline">About</span>
                        </Link>
                        {authUser && (
                            <>
                                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                                    <LuUserRound/>
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>
                                <button
                                    className="flex gap-2 items-center cursor-pointer"
                                    onClick={logout}
                                >
                                    <HiLogout/>
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Navbar;
