export interface LoginProp {
    username: string,
    password: string,
}

export interface ValidateProp {
    token: string,
    username: string,
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
    username: string,
    content: string,
    base64Image: string,
}

export interface CommentProp {
    username: string,
    content: string,
    postId: number,
}

export interface LikeProp {
    username: string,
    postId: number,
}

export interface FollowProp {
    followerName: string,
    followedName: string,
}
export interface ForgotPasswordProp {
    email: string,
}

export interface ResetPasswordProp {
    newPassword: string,
}