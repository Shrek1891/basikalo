export type User = {
    _id: string;
    fullName: string;
    email: string;
    profilePic: string;
}

export type Message = {
    _id: string;
    senderId: string;
    receiverId: string;
    text: string;
    image: string;
    createdAt: string;
}

