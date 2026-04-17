import {useGetMessagesQuery, useSendMessageMutation} from "../features/api/massagesApiSlice";
import {RiMailSendFill} from "react-icons/ri";
import {useRef, useState} from "react";
import {IoLogoXing} from "react-icons/io";
import {BiSolidImageAdd} from "react-icons/bi";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store";
import toast from "react-hot-toast";
import * as React from "react";
import Loader from "./loader.tsx";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [sendMessage, {isLoading: isSendingMessage}] = useSendMessageMutation();
    const [sendImg, setSendImg] = useState(new FormData());
    const selectedUser = useSelector(
        (state: RootState) => state.chat.selectedUser,
    );
    const {
        refetch,
    } = useGetMessagesQuery(selectedUser?._id);
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file?.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }
        const formData = new FormData();
        formData.set("sendImg", file);
        setSendImg(formData);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string | null);
        };
        reader.readAsDataURL(file);
    };
    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };
    const handleSendMessage = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
        sendImg.set("textMessage", text.trim());
        await sendMessage({
            message: sendImg,
            selectedUser: selectedUser,
        });
        setText("");
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        sendImg.delete("sendImg");
        refetch();
    };
    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
                            flex items-center justify-center cursor-pointer"
                            type="button"
                        >
                            <IoLogoXing className="size-3"/>
                        </button>
                    </div>
                </div>
            )}
            {isSendingMessage && <Loader/>}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <BiSolidImageAdd size={20}/>
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle"
                    disabled={!text.trim() && !imagePreview}
                >
                    <RiMailSendFill/>
                </button>
            </form>
        </div>
    );
};
export default MessageInput;
