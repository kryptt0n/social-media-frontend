import { useState } from "react";
import type { User, Post } from "../../../lib/definitions";
import { Button, Image } from "react-bootstrap";

export default function UserProfile() {
    const [postList, setPostList] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);

    return (
        <>
            <div>
                <p>{user?.username}</p>
                <p>Joined {user?.createdAt}</p>
                <Button variant="primary">Follow</Button>
                <Button variant="primary" href="/profile-edit">Edit Profile</Button>
            </div>
            {postList ? (
                <div>
                </div>
            ) : (
                <div className="flex justify-center mt-10">
                    <p className="text-xl text-grey-700 ">This account doesn't have any post.</p>
                </div>
            )}
        </>
    );
}