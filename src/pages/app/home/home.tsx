import CreatePost from "../../../components/post/CreatePost";
import type { Post } from "../../../lib/definitions";
import { useEffect, useState } from "react";
import { getFollowedPosts } from "../../../lib/actions";
import PostItem from "../../../components/post/PostComponent";

export default function Home() {
    const [postList, setPostList] = useState<Post[]>([]);

    const loadAllPosts = async () => {
        try {
            const allPosts = await getFollowedPosts();
            setPostList(allPosts);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadAllPosts();
    }, []);

    const handlePostDeleted = (postId: number) => {
        setPostList(prevPosts => prevPosts.filter(post => post.id !== postId));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <CreatePost onPostCreated={loadAllPosts} />
            <div className="space-y-2">
                {postList.length > 0 ? (
                    postList.map((post) => (
                        <PostItem key={post.id} postData={post} allowDelete={false} onPostDeleted={handlePostDeleted} />
                    ))
                ) : (
                    <div className="flex justify-center mt-10">
                        <p className="text-xl text-grey-700 ">No visible posts. Follow some accounts.</p>
                    </div>
                )}
            </div>
        </div>
    );
}