import type { User, Post } from "./definitions";

export interface LoginProp {
    username: string,
    password: string,
}

export interface UserProp {
    user: {
        username: string | null,
        password: string | null,
        bio: string | null,
    },
    file: File | null,
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
