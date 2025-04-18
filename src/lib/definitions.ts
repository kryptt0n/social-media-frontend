export type User = {
    id: number,
    username: string,
    password: string,
    imageUrl: String | null,
    bio: string | null,
    createdAt: string,
    roles: string;
    isActive: boolean,
    isPublic: boolean,
}

export type Profile = {
    username: string,
    imageUrl: string | null,
    bio: string,
    followerCount: number,
    followingCount: number,
    isActive: boolean,
    isPublic: boolean,
}

export type Post = {
    postId: number,
    username: string,
    content: string | null,
    imageUrl: string | null,
    avatarUrl: string | null,
    likeCount: number,
    likeByCurrentUser: boolean,
    createdAt: string,
    comments: Comment[],
}

export type Comment = {
    id: number,
    content: string,
    username: string,
    avatarUrl: string | null,
    postId: number,
    createdAt: string,
}

export type Follow = {
    id: number;
    follower: User,
    followed: User,
    followedAt: string,
}

export type Like = {
    id: number,
    user: User,
    post: Post,
    createdAt: string,
}

export type Notification = {
    id: number,
    user: User,
    type: NotificationType,
    content: string,
    read: boolean,
    createdAt: string,
}

export type NotificationType = 'LIKE' | 'COMMENT' | 'FOLLOW';

export type DashboardStats = {
    totalUsers: number;
    totalPosts: number;
    reportedPosts: number;
    dailyPosts: { date: string; count: number }[];
    accountTypes: { public: number; private: number };
}