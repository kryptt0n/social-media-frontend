import axiosInstance from "./axiosInstance";
import type {Post, Comment, Profile, User, DashboardStats} from "./definitions";
import {
    CommentProp, FollowProp,
    ForgotPasswordProp,
    LikeProp,
    LoginProp,
    PostProp,
    ResetPasswordProp,
    UserProp, ValidateProp
} from "./propinterfaces";
import {getCookie} from 'typescript-cookie';


// Auth
export async function register(userForm: UserProp): Promise<void> {
    try {
        await axiosInstance.post(`/users/register`,
            userForm,
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

export async function login(formData: LoginProp): Promise<string> {
    try {
        const response = await axiosInstance.post(`/identity/token`,
            formData,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                },
            },
        );
        return response.data.key;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function validate(formData: ValidateProp): Promise<String> {
    try {
        const response = await axiosInstance.post(`/identity/validate`,
            formData,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            },
        );
        return response.data.key;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getUserProfile(username: string): Promise<Profile> {
    try {
        const response = await axiosInstance.get(`/users/profile/${username}`,
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
export interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

export async function getUserPosts(username: string, page: number = 0, size: number = 10): Promise<PaginatedResponse<Post>> {
    try {
        const response = await axiosInstance.get(`/posts/user/${username}`,
            {
                params: {page, size},
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

export async function searchPosts(keyword: string = '', page: number = 0, size: number = 10): Promise<PaginatedResponse<Post>> {
    try {
        const response = await axiosInstance.get(`/posts/search`, {
            params: {keyword, page, size},
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

// todo
export async function getFollowedPosts(username: string): Promise<Post[]> {
    try {
        const response = await axiosInstance.get(`/posts/followed/${username}`,
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
        await axiosInstance.post(`/posts/create`,
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
        await axiosInstance.delete(`/posts/${postId}`,
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
        const response = await axiosInstance.get(`/posts/comment/post/${postId}`,
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
        await axiosInstance.post(`/posts/comment`,
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
        await axiosInstance.delete(`/posts/comment/${commentId}`,
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
        const response = await axiosInstance.get(`/likes/post/${postId}`,
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
        await axiosInstance.post(`/posts/like`,
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
        await axiosInstance.delete(`/posts/unlike`,
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
export async function isFollowed(currentUsername: string, username: string): Promise<boolean> {
    try {
        const response = await axiosInstance.get(`/users/is-followed`, {
            params: {
                currentUsername,
                username,
            },
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('token')}`,
            },
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function followUser(formData: FollowProp): Promise<void> {
    try {
        await axiosInstance.post(`/users/follow`,
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

export async function unfollowUser(formData: FollowProp): Promise<void> {
    try {
        await axiosInstance.post(`/users/unfollow`,
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

export async function getFollowers(username: string): Promise<Profile[]> {
    try {
        const response = await axiosInstance.get(`/users/followers/${username}`,
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

export async function getFollowed(username: string): Promise<Profile[]> {
    try {
        const response = await axiosInstance.get(`/users/followed/${username}`,
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

export async function getAllUsers(): Promise<User[]> {
    try {
        const response = await axiosInstance.get(`/admin/users`, {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getAllReportedPost(): Promise<Post[]> {
    try {
        const response = await axiosInstance.get(`/admin/posts/reported`, {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getStats(): Promise<DashboardStats> {
    try {
        console.log("token auth", getCookie('token'))
        const response = await axiosInstance.get(`/admin/stats`, {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getCookie('token')}`,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function reportPost(postId: number): Promise<void> {
    try {
        await axiosInstance.post(`/posts/report/${postId}`,
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


// profile management
export async function deactivateUser(username: string): Promise<void> {
    try {
        await axiosInstance.post(`/users/deactivate/${username}`,
            {},
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            }
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function recoverUser(username: string): Promise<string> {
    try {
        const response = await axiosInstance.post(`/recovery/${username}`,
            {},
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            }
        );
        console.log(response);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function setPublic(): Promise<void> {
    try {
        await axiosInstance.post(`/set-public`,
            {},
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            }
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function setPrivate(): Promise<void> {
    try {
        await axiosInstance.post(`/set-private`,
            {},
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            }
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteUser(): Promise<void> {
    try {
        await axiosInstance.post(`/delete-user`,
            {},
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            }
        );
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateUser(username: string, formData: FormData): Promise<void> {
    try {
        await axiosInstance.patch(`/update-profile/${username}`,
            formData,
            {
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${getCookie('token')}`,
                },
            }
        );

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function sendForgotPassword(formData: ForgotPasswordProp): Promise<void> {
    try {
        await axiosInstance.post(`/identity/forgot-password`,
            formData
        );

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function resetPassword(resetToken: string, formData: ResetPasswordProp): Promise<void> {
    try {
        await axiosInstance.post(`/identity/reset`,
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${resetToken}`,
                },
            }
        );

    } catch (error: any) {
        throw new Error(error.message);
    }
}