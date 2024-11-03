import { useState } from "react";
import { Accounts, type Posts } from "../../../lib/definitions";
import { Button, Image } from "react-bootstrap";

export function UserProfile() {
    const [postList, setPostList] = useState<Posts | null>(null);
    const [user, setUser] = useState<Accounts | null>(null);

    return (
        <>
            <div>
                <Image src={user?.profile} roundedCircle />
                <p>{user?.username}</p>
                <p>Joined {user?.create_time}</p>
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