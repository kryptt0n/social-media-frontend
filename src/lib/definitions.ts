export type Accounts = {
    id: number,
    username: string,
    password: string,
    dob: string,
    profile: string,
    create_time: string,
}

export type Comments = {
    id: number,
    post_id: number,
    text: string,
    user_id: number,
    create_time: string,
}

export type Followers = {
    id: number,
    user_id: number,
    follower_id: number,
    create_time: string,
}

export type Likes = {
    id: number,
    post_id: number,
    user_id: number,
    create_time: string,
}

export type Messages = {
    id: number,
    user_id: number,
    message: string,
    create_time: string,
}

export type Posts = {
    id: number,
    text: string,
    image: string,
    create_time: string,
    draft: boolean,
    user_id: number,
}