import type { User, Post } from "./definitions";

export interface LoginProp {
    username: string,
    password: string,
}

export interface UserProp {
    username: string,
    password: string,
    email: string,
    bio: string,
    base64Image: string,
    isPublic: boolean,
}

export interface PostProp {
    post: Blob;
    file: File | null;
}

export interface CommentProp {
    content: string | null,
    post: { id: number },
}

export interface LikeProp {
    post: { id: number },
}

export interface ForgotPasswordProp {
    email: string,
}

export interface ResetPasswordProp {
    newPassword: string,
}