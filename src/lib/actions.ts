import axios from "axios";
import type { Post, Comment, Profile } from "./definitions";
import { CommentProp, LikeProp, LoginProp, PostProp, UserProp } from "./propinterfaces";
import { getCookie, setCookie } from 'typescript-cookie'

export const domain = 'http://localhost:8080';

// Auth
export async function register(formData: UserProp): Promise<void> {
    try {
        await axios.post(`${domain}/register`,
            formData,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                },
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function login(formData: LoginProp): Promise<any> {
    try {
        const response = await axios.post(`${domain}/login`,
            formData,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getUser(username: string): Promise<Profile> {
    try {
        const response = await axios.get(`${domain}/users/${username}`,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}


// Posts
export async function getUserPosts(username: string): Promise<Post[]> {
    try {
        const response = await axios.get(`${domain}/posts/user/${username}`,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getAllPosts(): Promise<Post[]> {
    try {
        const response = await axios.get(`${domain}/posts`,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getFollowedPosts(): Promise<Post[]> {
    try {
        const response = await axios.get(`${domain}/posts/followed`,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createPost(formData: PostProp): Promise<void> {
    try {
        await axios.post(`${domain}/posts`,
            formData,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updatePost(postId: number, formData: Post): Promise<void> {
    try {
        await axios.put(`${domain}/posts/${postId}`,
            formData,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deletePost(postId: number): Promise<void> {
    try {
        await axios.delete(`${domain}/posts/${postId}`,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

// Comment
export async function getCommentsForPost(postId: number): Promise<Comment[]> {
    try {
        const response = await axios.get(`${domain}/comments/post/${postId}`,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createComment(formData: CommentProp): Promise<void> {
    try {
        await axios.post(`${domain}/comments`,
            formData,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteComment(commentId: number): Promise<void> {
    try {
        await axios.delete(`${domain}/comments/${commentId}`,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

// Like
export async function getLikeCount(postId: number): Promise<number> {
    try {
        const response = await axios.get(`${domain}/likes/post/${postId}`,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createLike(formData: LikeProp): Promise<void> {
    try {
        await axios.post(`${domain}/likes`,
            formData,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteLike(formData: LikeProp): Promise<void> {
    try {
        await axios.delete(`${domain}/likes`,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
                data: formData,
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

// Follow
export async function followUser(username: string): Promise<void> {
    try {
        await axios.post(`${domain}/follows/${username}`,
            {},
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function unfollowUser(username: string): Promise<void> {
    try {
        await axios.delete(`${domain}/follows/${username}`,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getFollowers(username: string | null): Promise<Profile[]> {
    try {
        const response = await axios.get(`${domain}/follows/followers/${username}`,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getFollowed(username: string | null): Promise<Profile[]> {
    try {
        const response = await axios.get(`${domain}/follows/followed/${username}`,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function followSelf(username: string): Promise<void> {
    try {
        await axios.post(`${domain}/follows/${username}`,
            {},
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

