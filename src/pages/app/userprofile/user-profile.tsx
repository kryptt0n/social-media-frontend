import { useState, useEffect } from "react";
import type { User, Post } from "../../../lib/definitions";
import { Button, Image } from "react-bootstrap";
import { getUserPosts } from "../../../lib/actions";
import PostItem from "../../../components/post/PostComponent";

export default function UserProfile() {
    const [postList, setPostList] = useState<Post[]>([]);
    const [user, setUser] = useState(
        {
            "username": "test4",
            "profilePicture": null,
            "bio": "I'm new user",
            "isFollowed": false
        }
    );

    useEffect(() => {
        const loadAllPosts = async () => {
            try {
                const allPosts = await getUserPosts(user.username);
                setPostList(allPosts);
            } catch (error) {
                console.error(error);
            }
        }

        loadAllPosts();
    }, []);

    return (
        <>
            <div>
                <p>{user.username}</p>
                <p>{user.bio}</p>
                <Button variant="primary">Follow</Button>
            </div>
            <div>
                {postList.length > 0 ? (
                    postList.map((post) => (
                        <PostItem postData={post} />
                    ))
                ) : (
                    <div className="flex justify-center mt-10">
                        <p className="text-xl text-grey-700 ">This account doesn't have any post.</p>
                    </div>
                )}
            </div>
        </>
    );
}