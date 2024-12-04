import CreatePost from "../../../components/post/CreatePost";
import type { Post } from "../../../lib/definitions";
import { useEffect, useState } from "react";
import { getFollowedPosts } from "../../../lib/actions";
import PostItem from "../../../components/post/PostComponent";

export default function Home() {
    const [postList, setPostList] = useState<Post[]>([]);

    useEffect(() => {
        const loadAllPosts = async () => {
            try {
                const allPosts = await getFollowedPosts();
                setPostList(allPosts);
            } catch (error) {
                console.error(error);
            }
        }

        loadAllPosts();
    }, []);

    return (
        <>
            <CreatePost />
            {postList.length > 0 ? (
                postList.map((post) => (
                    <PostItem postData={post} />
                ))
            ) : (
                <div className="flex justify-center mt-10">
                    <p className="text-xl text-grey-700 ">No visible posts. Follow some accounts.</p>
                </div>
            )}
        </>
    );
}