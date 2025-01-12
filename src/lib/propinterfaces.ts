import type { User, Post } from "./definitions";

export interface LoginProp {
    username: string,
    password: string,
}

export interface UserProp {
    username: string | null,
    password: string | null,
    profilePicture: Uint8Array | number[] | null,
    bio: string | null,
}

export interface PostProp {
    content: string | null,
    image: Uint8Array | number[] | null,
}

export interface CommentProp {
    content: string | null,
    post: { id: number },
}

export interface LikeProp {
    post: { id: number },
}
