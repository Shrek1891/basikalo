import ChatHeader from "./ChatHeader";
import {useGetMessagesQuery} from "../features/api/massagesApiSlice";
import type {RootState} from "../store/store";
import {useDispatch, useSelector} from "react-redux";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import {useRef, useEffect} from "react";
import toast, {Toaster} from "react-hot-toast";
import MessageInput from "./MessageInput";
import {formatMessageTime} from "../lib/utils";
import {addMessage, unsubscribeFromMessages} from "../features/chat/chatSlice.ts";
import type {Message, User} from "../../types/types.ts";


const ChatContainer = () => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const authUser = useSelector(
        (state: RootState) => state.user.authUser,
    );
    const messageEndRef = useRef<HTMLDivElement>(null);
    const selectedUser: User | null = useSelector(
        (state: RootState) => state.chat.selectedUser,
    );
    const dispatch = useDispatch();


    const {
        data: messages,
        isLoading: isMessagesLoading,
        isError,
        refetch,

    } = useGetMessagesQuery(selectedUser?._id);
    const socket = useSelector(
        (state: RootState) => state.chat.socket,
    )
    console.log(socket)
    useEffect(() => {
        socket?.on("newMessage", (message: Message) => {
            toast.success(`${selectedUser?.fullName} sent you a message`, {duration: 3000});
            if (message.senderId !== authUser?._id) {
                dispatch(addMessage(message));
                const audio = new Audio("music/message.mp3");
                audio.play();
                bottomRef.current?.scrollIntoView({behavior: 'smooth'});
                refetch()
            }
        });
        return () => {
            dispatch(unsubscribeFromMessages(undefined));
        };
    }, [dispatch, selectedUser?._id, socket]);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);
    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader/>
                <MessageSkeleton/>
                <MessageInput/>
            </div>
        );
    }
    if (isError) {
        toast.error("Failed to load messages. Please try again.");
    }
    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <Toaster position="top-right"/>
            <ChatHeader/>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message: Message) => (
                    <div
                        key={message._id}
                        className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
                        ref={messageEndRef}
                    >
                        <div className=" chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                    src={
                                        message.senderId === authUser?._id
                                            ? authUser?.profilePic || "/avatar.png"
                                            : selectedUser?.profilePic || "/avatar.png"
                                    }
                                    alt="profile pic"
                                />
                            </div>
                        </div>
                        <div className="chat-header mb-1">
                            <time className="text-xs opacity-50 ml-1">
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef}/>
            </div>
            <MessageInput/>
        </div>
    );
};

export default ChatContainer;
