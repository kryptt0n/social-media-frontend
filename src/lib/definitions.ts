export type User = {
    id: number,
    username: string,
    password: string,
    profilePicture: Blob,
    bio: string,
    createdAt: string,
    roles: string;
}

export type Post = {
    id: number,
    content: string,
    image: Blob,
    user: {
        username: string,
        profilePicture: Blob,
        bio: string,
        isFollowed: boolean,
    },
    createdAt: string,
    likedByCurrentUser: boolean,
    totalLikes: number,
}

export type Comment = {
    id: number,
    content: string,
    user: User,
    post: Post,
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

