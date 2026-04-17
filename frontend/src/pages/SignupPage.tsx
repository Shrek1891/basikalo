import {useState, type ChangeEvent, type SubmitEvent} from "react";
import {useLoginMutation, useSignUpMutation} from "../features/api/apiSlice";
import {toast, Toaster} from "react-hot-toast";
import {FaUserSecret} from "react-icons/fa";
import {SiMinutemailer} from "react-icons/si";
import {TbEye, TbEyeOff, TbLockPassword} from "react-icons/tb";
import {useDispatch} from "react-redux";
import {setUser} from "../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {useGetUsersQuery} from "../features/api/massagesApiSlice";

const SignupPage = ({type}: { type: "register" | "login" }) => {
    const {refetch} = useGetUsersQuery(undefined);
    const dispatch = useDispatch();
    const [state, setState] = useState(type);
    const [showPassword, setShowPassword] = useState(false);
    const [signUp, {isLoading}] = useSignUpMutation();
    const [login, {isLoading: isLoginLoading}] = useLoginMutation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const validateForm = () => {
        if (!formData.fullName.trim() && state === "register")
            return toast.error("Full name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.\S+/.test(formData.email))
            return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (formData.password.length < 6)
            return toast.error("Password must be at least 6 characters");
        return true;
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };
    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm() && state === "register") {
            try {
                const result = await signUp(formData);
                if ("error" in result && result.error) {
                    const errorMessage =
                        typeof result.error === "object" &&
                        result.error &&
                        "data" in result.error &&
                        typeof result.error.data === "object" &&
                        result.error.data &&
                        "message" in result.error.data
                            ? (result.error.data as { message: string }).message
                            : "Error signing up";
                    toast.error(errorMessage);
                    return;
                }
                toast.success("Signup successful");
                setFormData({fullName: "", email: "", password: ""});
                dispatch(setUser(result.data));
                refetch();
                navigate("/");
            } catch (err) {
                console.error("Error signing up:", err);
                toast.error("Error signing up");
            }
        }
        if (state === "login") {
            try {
                const result = await login(formData);
                if ("error" in result && result.error) {
                    const errorMessage =
                        typeof result.error === "object" &&
                        result.error &&
                        "data" in result.error &&
                        typeof result.error.data === "object" &&
                        result.error.data &&
                        "message" in result.error.data
                            ? (result.error.data as { message: string }).message
                            : "Error logging in";
                    toast.error(errorMessage);
                    return;
                }
                toast.success("Login successful");
                dispatch(setUser(result.data));
                refetch();
                navigate("/");
            } catch (err) {
                console.error("Error logging in:", err);
                toast.error("Error logging in");
            }
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <div className="flex items-center justify-center h-screen">
            {isLoading ||
                (isLoginLoading && (
                    <div className="flex gap-2 items-center justify-center h-screen absolute inset-0 bg-black/50 z-10">
                        <span className="size-3 animate-ping rounded-full bg-indigo-600"></span>
                        <span className="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.2s]"></span>
                        <span className="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.4s]"></span>
                    </div>
                ))}
            <Toaster position="top-center" toastOptions={{duration: 3000}}/>
            <form
                onSubmit={handleSubmit}
                className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8"
            >
                <h1 className="text-3xl mt-10 font-medium">
                    {state === "login" ? "Login" : "Sign up"}
                </h1>
                <p className="text-sm mt-2">Please sign in to continue</p>
                {state !== "login" && (
                    <div
                        className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
                        <FaUserSecret/>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Name"
                            className="w-full bg-transparent  border-none outline-none "
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <div
                    className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
                    <SiMinutemailer/>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full bg-transparent  border-none outline-none "
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div
                    className=" flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden p-6 gap-2 transition-all ">
                    <TbLockPassword/>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full bg-transparent  border-none outline-none"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {showPassword ? (
                        <TbEye
                            className="cursor-pointer"
                            onClick={togglePasswordVisibility}
                        />
                    ) : (
                        <TbEyeOff
                            className="cursor-pointer"
                            onClick={togglePasswordVisibility}
                        />
                    )}
                </div>
                <button
                    disabled={isLoading}
                    type="submit"
                    className="mt-4 mb-2 w-full h-11 rounded-full  bg-indigo-600 hover:bg-indigo-500 transition "
                >
                    {state === "login" ? "Login" : "Sign up"}
                </button>
                <p
                    onClick={() =>
                        setState((prev) => (prev === "login" ? "register" : "login"))
                    }
                    className=" text-sm mt-3 mb-11 cursor-pointer"
                >
                    {state === "login"
                        ? "Don't have an account?"
                        : "Already have an account?"}
                    <span className="text-indigo-400 hover:underline ml-1">
            click here
          </span>
                </p>
            </form>
            {/* Soft Backdrop*/}
            <div className="fixed inset-0 -z-1 pointer-events-none">
                <div
                    className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-indigo-800/35 to-transparent rounded-full blur-3xl"/>
                <div
                    className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-indigo-700/35 to-transparent rounded-full blur-2xl"/>
            </div>
        </div>
    );
};

export default SignupPage;
