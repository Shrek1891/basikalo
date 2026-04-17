import {CiCamera} from "react-icons/ci";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../store/store";
import {useUpdateProfileMutation} from "../features/api/apiSlice";
import toast, {Toaster} from "react-hot-toast";
import {setUser} from "../features/user/userSlice";
import * as React from "react";

const ProfilePage = () => {
    const authUserFromStore = useSelector(
        (state: RootState) => state.user.authUser,
    );
    const dispatch = useDispatch();
    const [updateProfile, {isLoading: isUpdatingProfile}] =
        useUpdateProfileMutation();
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("profilePic", file);
            try {
                const result = await updateProfile(formData);
                dispatch(setUser(result.data));
                toast.success("Profile updated successfully!");
            } catch (error) {
                toast.error("Failed to update profile. Please try again.");
                console.error("Error updating profile:", error);
            }
        }
    };
    return (
        <section className="flex justify-center items-center min-h-screen backdrop-blur-lg p-4">
            <Toaster/>
            {isUpdatingProfile && (
                <div className="flex gap-2 items-center justify-center h-screen absolute inset-0 bg-black/50 z-10">
                    <span className="size-3 animate-ping rounded-full bg-indigo-600"></span>
                    <span className="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.2s]"></span>
                    <span className="size-3 animate-ping rounded-full bg-indigo-600 [animation-delay:0.4s]"></span>
                </div>
            )}
            <div
                className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 ease-in-out p-8 relative overflow-hidden border border-white/20">
                <div
                    className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div
                    className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div
                    className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-blue-400/10 rounded-3xl"></div>
                <div className="flex justify-center -mt-20 mb-6 relative z-10 mt-5">
                    <div className="relative group">
                        <div
                            className="absolute inset-0  bg-linear-to-br from-purple-400 to-pink-500 rounded-full blur-md group-hover:blur-lg transition-all duration-500"></div>
                        <img
                            className="w-40 h-40 object-cover rounded-full border-4 border-white/80 shadow-xl hover:scale-105 transform transition-all duration-400 relative z-10"
                            src={
                                authUserFromStore?.profilePic ||
                                "https://avatars.githubusercontent.com/u/124576166?v=4"
                            }
                            alt="Profile Image"
                        />
                    </div>
                </div>
                <div className="mt-8 text-center relative z-10 mt-2 mb-6 relative">
                    <label
                        htmlFor="avatar-upload"
                        className={`
                  absolute bottom-7 right-35 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
                    >
                        <CiCamera className="w-5 h-5 text-base-200"/>
                        <input
                            type="file"
                            id="avatar-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUpdatingProfile}
                        />
                    </label>
                </div>
                <div className="text-center mb-6 relative z-10">
                    <h2 className="text-3xl font-bold  mb-2 tracking-tight">
            <span className="relative inline-block">
              {authUserFromStore?.fullName || "John Doe"}
                <span
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </span>
                    </h2>
                    <p className="text-lg font-medium  tracking-wider">
                        {authUserFromStore?.email || ""}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ProfilePage;
