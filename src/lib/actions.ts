import axios from "axios";
import type { User, Post, Comment, Follow, Like, Notification } from "./definitions";
import { CommentProp, PostProp, UserProp } from "./propinterfaces";

const headers = {
    "Accept": "*/*",
    "Content-Type": "application/json",
    "Authorization": `Basic ${btoa(`${localStorage.getItem("curUn")}:${localStorage.getItem("curPw")}`)}`,
};
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


// Posts
export async function getUserPosts(username: string): Promise<Post[]> {
    try {
        const response = await axios.get(`${domain}/posts/user/${username}`,
            {
                headers: headers,
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
                headers: headers,
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
                headers: headers,
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
                headers: headers,
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
                headers: headers,
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
                headers: headers,
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
                headers: headers,
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
                headers: headers,
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
                headers: headers,
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
                headers: headers,
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createLike(formData: Like): Promise<void> {
    try {
        await axios.post(`${domain}/likes`,
            formData,
            {
                headers: headers,
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteLike(formData: Like): Promise<void> {
    try {
        await axios.delete(`${domain}/likes`,
            {
                headers: headers,
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
            {
                headers: headers,
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
                headers: headers,
            },
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getFollowers(username: string): Promise<User[]> {
    try {
        const response = await axios.get(`${domain}/follows/followers/${username}`,
            {
                headers: headers,
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getFollowed(username: string): Promise<User[]> {
    try {
        const response = await axios.get(`${domain}/follows/followed/${username}`,
            {
                headers: headers,
            },
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

